<template>
  <b-card id="parkingListContainer" body-class="overflow-auto maxh">
    <template v-slot:header>
      电瓶车识别结果
      <b-progress :max="batteryCarResult.length" show-value class="mt-3">
                <b-progress-bar :value="batteryCarResult.length" variant="success"/>
                <!-- <b-progress-bar :value="batteryCarResult.storage.length - batteryCarResult.available"
                                variant="danger"/> -->
            </b-progress>
    </template>
    <b-table-simple small hover class="resultTable">
      <b-tbody class="batteryCarAlert">
        <b-tr
          class="batteryCarImg"
          v-for="(goal, i) in batteryCarResult"
          v-bind:key="i"
          variant="danger"
        >
          <b-td >{{goal.date}}</b-td>
          <b-td >{{goal.info}}</b-td>
          

        </b-tr>
        <!-- <b-tr
                        v-for="space in parkingSpaceStorage.storage"
                        :key="space.id"
                        :variant="space.available ? 'success' : 'danger'"
                        @click="showRenameBox(space.id, space.name)"
                        @mouseenter="highlight(space.id)"
                        @mouseleave="highlight('')"
                >
                    <b-td>{{ space.name }}</b-td>
                    <b-td>{{ space.available ? "空闲" : "占用" }}</b-td>
                </b-tr> -->
      </b-tbody>
    </b-table-simple>
    <b-modal
      id="parking-rename"
      title="车位重命名"
      size="lg"
      cancel-title="取消"
      ok-title="确定"
      @ok="renameComplete"
      @cancel="resetForm"
      @close="resetForm"
      body-class="justify-content-center"
    >
      <label for="editID">车位号</label>
      <b-form-input id="editID" v-model="editing.name" type="text" />
    </b-modal>
  </b-card>
</template>

<script>
import PubSub from "pubsub-js";
import batteryCarImg1 from "../../assets/img/1.jpeg";
import batteryCarImg2 from "../../assets/img/2.jpeg";
import batteryCarImg3 from "../../assets/img/3.jpeg";

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
      // showImg: batteryCarImg1,
      batteryCarResult: [
        {
          date: "2020-11-09 15:13:12",
          info: "电瓶车闯入"
        },{
          date: "2020-11-09 15:13:12",
          info: "电瓶车闯入"
        },{
          date: "2020-11-09 15:13:12",
          info: "电瓶车闯入"
        }
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

<style scoped>
.maxh {
  max-height: 75vh;
}
.resultTable {
  position: relative;
  /* padding-top: 204px; */
}
.batteryCarAlert {
  width: 300px;
}
.showImg {
  width: 100%;
  padding: 2px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  z-index: 999;
}
.showImg img {
  height: 100%;
  display: block;
  margin: 0 auto;
}
.batteryCarImg {
  width: 100px;
  padding: 6px;
  border: 1px solid rgba(0, 0, 0, 0);
}
.batteryCarImg img {
  width: 100%;
}
</style>