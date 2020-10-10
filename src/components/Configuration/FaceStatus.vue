<template>
  <b-card id="parkingListContainer" body-class="overflow-auto maxh">
    <template v-slot:header> 人脸识别 </template>
    <b-media>
      <ul class="identifyGoalList">
        <li
          class="unit"
          v-for="(goal, i) in identifyGoalList"
          v-bind:key="i"
          @click="showFrames(i)"
        >
          <img class="headPortraitImg" :src="goal.img" alt="headPortraitImg" />
          <div class="details">
            <p>人脸编号：{{ goal.id }}</p>
            <p><span>姓</span>名：{{ goal.name }}</p>
            <p>识别时间：{{ goal.identifyDate }}</p>
          </div>
        </li>
        <!-- 
            {
                img: "@/assets/img/reddot_logo.png",
                id: "00000000007",
                name: "XXX",
                identifyDate: "XX.XX.XX XX:XX:XX"
            }
         -->
      </ul>
    </b-media>
  </b-card>
</template>

<script>
import PubSub from "pubsub-js";
import headPortraitImg from "../../assets/img/reddot_logo.png";

class ParkingSpaceStorage {
  //与darknet.vue里面的同名类区别：这个类主要储存位置信息和ID信息，darknet.vue里的主要控制显示
  constructor() {
    this.storage = [];
    this.available = 0;
  }

  add(x, y, id, name) {
    this.storage.push({ x, y, id, name, available: true });
    this.storage.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    this.refreshAvailability();
  }

  remove(id) {
    for (let i in this.storage) {
      if (this.storage[i].id == id) {
        this.storage.splice(i, 1);
        return;
      }
    }
    this.refreshAvailability();
  }

  rename(id, name) {
    for (let i in this.storage) {
      if (this.storage[i].id == id) {
        this.storage[i].name = name;
      }
    }
    this.storage.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  }

  change(id, available) {
    for (let i in this.storage) {
      if (this.storage[i].id == id) {
        this.storage[i].available = available;
      }
    }
    this.refreshAvailability();
  }

  refreshAvailability() {
    let counter = 0;
    this.storage.forEach((e) => {
      if (e.available) counter++;
    });
    this.available = counter;
  }
}

export default {
  name: "status",
  data: function () {
    return {
      parkingSpaceStorage: null,
      height: 0,
      editing: {
        id: "",
        name: "",
      },
      identifyGoalList: [
        {
          img: headPortraitImg,
          id: "00000000007",
          name: "XXX",
          identifyDate: "XX.XX.XX XX:XX:XX",
        },
      ],
    };
  },
  methods: {
    showRenameBox: function (id, name) {
      this.editing.id = id;
      this.editing.name = name;
      this.$bvModal.show("parking-rename");
    },
    renameComplete: function () {
      PubSub.publish("rename", {
        id: this.editing.id,
        name: this.editing.name,
      });
      this.resetForm();
    },
    resetForm: function () {
      this.editing.id = "";
      this.editing.name = "";
    },
    highlight: function (id) {
      PubSub.publish("highlight", id);
    },
    showFrames: function (id) {
      console.log(id);
    },
  },
  created: function () {
    this.parkingSpaceStorage = new ParkingSpaceStorage();
    PubSub.subscribe("create", (msg, point) => {
      this.parkingSpaceStorage.add(point.x, point.y, point.id, point.name);
    });
    PubSub.subscribe("remove", (msg, id) => {
      this.parkingSpaceStorage.remove(id);
    });
    PubSub.subscribe("change", (msg, payload) => {
      this.parkingSpaceStorage.change(payload.id, payload.available);
    });
    PubSub.subscribe("rename", (msg, payload) => {
      this.parkingSpaceStorage.rename(payload.id, payload.name);
    });
    axios
      .post("/user", {
        firstName: "Fred",
        lastName: "Flintstone",
      })
      .then(function (response) {
        console.log(response);
        // this.identifyGoalList = response
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  computed: {
    availableOnly: function () {
      let data = [];
      this.parkingSpaceStorage.storage.forEach((e) => {
        if (e.available) data.push(e);
      });
      return data;
    },
  },
};
</script>

<style scoped lang="less">
.maxh {
  max-height: 75vh;
}
.identifyGoalList {
  list-style: none;
  .unit {
    display: flex;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 0, 0, 0.03);
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.03);
      box-sizing: border-box;
    }
    .headPortraitImg {
      width: 70px;
      height: 70px;
      background: gray;
    }
    .details {
      width: 223px;
      margin-left: 10px;
      p {
        font-size: 14px;
        margin: 0;
        span {
          white-space: pre;
          letter-spacing: 28px;
        }
      }
    }
  }
}
</style>