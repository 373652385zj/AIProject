<template>
  <b-card fluid>
    <template v-slot:header>
      识别结果
      <!--            <b-button class="float-right" size="sm" variant="outline-secondary" v-b-modal.live>实时画面</b-button>-->
      <b-modal id="live" title="实时画面" size="lg" ok-only ok-title="返回">
        <b-img :src="host + '/camera/live'" fluid-grow />
      </b-modal>
    </template>
    <!-- 基于mjpeg流的识别结果图像 -->
    <img
      :src="host + getFaceBoxLiveUrl + '?url=' + url"
      id="detectSource"
      crossorigin="Anonymous"
      :width="DWidth"
      :height="DHeight"
    />
    <!-- UI设计时占位用的猫猫图 -->
    <!--         <img src="../../assets/720x480.png" id="detectSource" style="display: none;" />-->
    <!-- 主画布 -->
    <!--                <b-overlay :show="preparing">-->
    <!--                    <canvas id="detectCanvas"></canvas>-->
    <!--                </b-overlay>-->
    <!-- 编辑模式的控制表单 -->
    <div v-if="editable">
      <!-- 编辑模式选择器 -->
      <b-form-radio-group id="editModeSelector" v-model="editMode" class="mb-3">
        <b-form-radio value="immediate">即时编号模式</b-form-radio>
        <b-form-radio value="continuals">连续编号模式</b-form-radio>
      </b-form-radio-group>
      <!-- 即时编号模式：每创建一个点，输入框就获得焦点 -->
      <b-form inline v-if="editMode == 'immediate'" class="mb-3">
        <label for="immediate-input">输入编号</label>
        <b-form-input
          id="immediate-input"
          ref="immediate-input"
          v-model="immediate.name"
          :state="immediate.state"
          @keyup="rename"
        />
      </b-form>
      <!-- 连续编号模式：输入初始值，按顺序递增 -->
      <b-form inline v-if="editMode == 'continuals'" class="mb-3">
        <label for="continuals-input">下一个编号</label>
        <b-form-input
          id="continuals-input"
          v-model="continuals.next"
          :state="continuals.state"
        />
      </b-form>
    </div>
    <!-- 切换编辑模式的按钮 -->
    <b-button
      block
      class="mt-3"
      variant="outline-secondary"
      @click="editable = !editable"
    >
      {{ editable ? "完成" : "编辑" }}
    </b-button>
  </b-card>
</template>

<script>
import axios from "axios";
import { v4 as uuid } from "uuid";
import PubSub from "pubsub-js";
import config from "@/config/config";
import http from "@/config/http";

class ParkingSpace {
  constructor(x, y, id, name, ctx) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.ctx = ctx;
    this.name = name;
    this.radius = 5;
    this.available = true;
    this.highlight = false;
    this.availableCounter = 0;
  }

  isHover(mouseX, mouseY) {
    // 水平距离或垂直距离大于半径，则一定不可能悬停
    if (
      Math.abs(this.x - mouseX) > this.radius ||
      Math.abs(this.y - mouseY) > this.radius
    ) {
      return false;
    }
    let distance = Math.sqrt(
      (this.x - mouseX) * (this.x - mouseX) +
        (this.y - mouseY) * (this.y - mouseY)
    );
    if (distance > this.radius) {
      return false;
    }
    return true;
  }

  refreshAvailability(detections) {
    let available = true;
    let stateChanged = false;
    for (let e of detections) {
      let left = e[0];
      let top = e[1];
      let right = left + e[2];
      let bottom = top + e[3];
      if (this.y > top && this.y < bottom && this.x > left && this.x < right) {
        available = false;
        break;
      }
    }
    //模型容易把有车识别成没车，但不容易把没车识别成有车，所以连续识别三次没车才改变状态
    if (available) {
      this.availableCounter++;
      if (this.availableCounter == 3) {
        this.available = true;
        this.availableCounter = 0;
        stateChanged = true;
      }
    } else {
      if (this.available) stateChanged = true;
      this.available = false;
      this.availableCounter = 0;
    }
    return stateChanged;
  }

  refreshExterior(mouseX, mouseY) {
    this.ctx.beginPath();
    let isHover = this.isHover(mouseX, mouseY);
    let resizeFactor = this.highlight || isHover ? 1.5 : 1;
    this.ctx.arc(
      this.x,
      this.y,
      this.radius * resizeFactor,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = (() => {
      if (this.highlight) return "#ffa500";
      if (this.available) return "#00ff00";
      return "#ff0000";
    })();
    this.ctx.fill();
    if (isHover) {
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = this.available ? "#003300" : "#330000";
      this.ctx.stroke();
    }
  }
}

class ParkingSpaceStorage {
  constructor(ctx, host) {
    this.ctx = ctx;
    this.host = host;
    this.storage = new Map();
  }

  load(data) {
    for (let id in data) {
      this.create(data[id].x, data[id].y, false, id, data[id].name);
    }
  }

  create(x, y, exportNeeded, id = null, name = null) {
    let newID = id == null ? uuid() : id;
    let newName = name == null ? newID.substring(0, 5) : name;
    this.storage.set(
      newID,
      new ParkingSpace(Math.round(x), Math.round(y), newID, newName, this.ctx)
    );
    PubSub.publish("create", {
      x: Math.round(x),
      y: Math.round(y),
      id: newID,
      name: newName,
    });
    if (exportNeeded) this.export();
    return newID;
  }

  remove(element) {
    this.storage.delete(element.id);
    PubSub.publish("remove", element.id);
    this.export();
  }

  forEach(callback) {
    this.storage.forEach(callback);
  }

  refreshExterior(mouseX, mouseY) {
    this.forEach((ps) => {
      ps.refreshExterior(mouseX, mouseY);
    });
  }

  refreshAvailability(detections) {
    this.forEach((ps) => {
      let stateChanged = ps.refreshAvailability(detections);
      if (stateChanged) {
        PubSub.publish("change", { id: ps.id, available: ps.available });
      }
    });
  }

  rename(id, name) {
    let element = this.storage.get(id);
    element.name = name;
    this.storage.set(id, element);
    this.export();
  }

  highlight(id) {
    this.forEach((ps) => {
      if (ps.id == id) {
        ps.highlight = true;
      } else {
        ps.highlight = false;
      }
    });
  }

  isDuplicate(name) {
    let duplicate = false;
    this.forEach((ps) => {
      if (ps.name == name) duplicate = true;
    });
    return duplicate;
  }

  export() {
    let tempStorage = {};
    this.forEach((ps) => {
      tempStorage[ps.id] = { x: ps.x, y: ps.y, name: ps.name };
    });
    axios
      .post(this.host + this.checkpointsUrl, tempStorage)
      .then((resp) => {
        if (resp.code !== 200) {
          console.error("cannot post point data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default {
  name: "ckeckpoint-editor",
  mixins: [http],
  data: function () {
    return {
      //识别结果画布及其上下文
      detectCanvas: null,
      detectCtx: null,
      //车位（检查点）列表
      parkingSpaceStorage: null,
      //detection = [[x, y, w, h], [x, y, w, h], ...]
      detections: null,
      //鼠标位置
      mouseX: 0,
      mouseY: 0,
      //是否在编辑状态
      editable: false,
      //编辑状态相关
      editMode: "immediate",
      immediate: {
        ID: "",
        name: "",
        state: null,
      },
      continuals: {
        next: "001",
        state: null,
      },
      //是否还在初始化
      preparing: true,
      host: config.axios.baseURL,
      url: config.axios.rtspURL,
      DWidth: "100%",
    };
  },
  methods: {
    rename: function () {
      if (this.parkingSpaceStorage.isDuplicate(this.immediate.name)) {
        this.immediate.state = false;
        return;
      }
      this.immediate.state = null;
      PubSub.publish("rename", {
        id: this.immediate.ID,
        name: this.immediate.name,
      });
    },
    continualsNext: function () {
      let digit = this.continuals.next.length;
      let newNext = `${Number.parseInt(this.continuals.next) + 1}`;
      while (newNext.length < digit) newNext = `0${newNext}`;
      this.continuals.next = newNext;
    },
  },
  created() {
    //创建对识别结果画布及其上下文的引用
    // this.detectCanvas = document.getElementById("detectCanvas");
    // this.detectCanvas.width = 720;
    // this.detectCanvas.height = 480;
    // this.detectCtx = document.getElementById("detectCanvas").getContext("2d");
    //初始化检查点储存
    this.parkingSpaceStorage = new ParkingSpaceStorage(
      this.detectCtx,
      this.host
    );
    //获取服务器端缓存的检查点信息
    // this.$curl.get(this.checkpointsUrl).then((res) => {
    //   if (res.code === 200) {
    //     this.parkingSpaceStorage.load(res.data);
    //   } else {
    //     this.$Message.warning(JSON.stringify(res));
    //   }
    // });
    // //获取识别框
    //  axios
    //     .get(`${this.host}/camera/detect/box`)
    //     .then((resp) => {
    //         if (resp.code == 200) {
    //             this.detections = resp.data;
    //         } else {
    //             this.detections = [];
    //             console.error("cannot fetch detections");
    //         }
    //     })
    //     .catch((err) => {
    //         console.error(`${err}`);
    //     });

    //当图像源宽度不是0（即已加载好）时取消"准备中"遮罩
    let prepareChecker = setInterval(() => {
      if (document.getElementById("detectSource").width != 0) {
        clearInterval(prepareChecker);
        this.preparing = false;
      }
    }, 50);

    //每50毫秒刷新一次画布
    let lastRefreshTimestamp = 0;
    let refreshCanvas = (time) => {
      if (time - lastRefreshTimestamp > 50) {
        lastRefreshTimestamp = time;
        let source = document.getElementById("detectSource");
        try {
          this.detectCtx.drawImage(source, 0, 0);
        } catch (error) {
          /*ignore warning*/
        }
        this.parkingSpaceStorage.refreshExterior(this.mouseX, this.mouseY);
      }
      requestAnimationFrame(refreshCanvas);
    };
    requestAnimationFrame(refreshCanvas);

    //每4秒获取一次识别框并刷新占用情况
    let lastFetchTimestamp = 0;
    // let fetchDetection = async (time) => {
    //     if (time - lastFetchTimestamp > 4000) {
    //         lastFetchTimestamp = time;
    //         await axios
    //             .get(`${this.host}/camera/detect/box`)
    //             .then((resp) => {
    //                 if (resp.code == 200) {
    //                     this.detections = resp.data;
    //                 } else {
    //                     this.detections = [];
    //                     console.error("cannot fetch detections");
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //         this.parkingSpaceStorage.refreshAvailability(this.detections);
    //     }
    //     requestAnimationFrame(fetchDetection);
    // }
    requestAnimationFrame(fetchDetection);

    //取消画布点击右键时弹出右键菜单
    this.detectCanvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    //鼠标抬起时尝试创建新检查点
    this.detectCanvas.addEventListener("mouseup", (event) => {
      if (!this.editable) return;
      if (this.mouseX < 720 && this.mouseY < 480) {
        let newParkingSpace = true;
        if (event.button == 0) {
          //左键单击时
          //如果没有悬停在现有检查点上，则创建一个新的检查点
          this.parkingSpaceStorage.forEach((ps) => {
            if (ps.isHover(this.mouseX, this.mouseY)) {
              newParkingSpace = false;
            }
          });
          if (newParkingSpace) {
            if (this.editMode == "immediate") {
              this.immediate.ID = this.parkingSpaceStorage.create(
                this.mouseX,
                this.mouseY,
                true
              );
              this.$refs["immediate-input"].focus();
            }
            if (this.editMode == "continuals") {
              this.parkingSpaceStorage.create(
                this.mouseX,
                this.mouseY,
                true,
                null,
                this.continuals.next
              );
              this.continualsNext();
            }
          }
        } else if (event.button == 2) {
          //右键单击时
          //如果悬停在现有检查点上，则删除这个检查点
          this.parkingSpaceStorage.forEach((ps) => {
            if (ps.isHover(this.mouseX, this.mouseY)) {
              this.parkingSpaceStorage.remove(ps);
            }
          });
        } else if (event.button == 1) {
          console.log(`(${this.mouseX}, ${this.mouseY})`);
        }
      }
    });

    //鼠标移动时刷新储存的鼠标位置
    this.detectCanvas.addEventListener("mousemove", (event) => {
      if (!this.editable) return;
      let rect = this.detectCanvas.getBoundingClientRect();
      let scale = 720 / rect.width;
      this.mouseX = (event.clientX - rect.left) * scale;
      this.mouseY = (event.clientY - rect.top) * scale;
    });

    this.detectCanvas.addEventListener("mousedown", () => {
      if (this.editMode == "immediate") {
        this.immediate.ID = "";
        this.immediate.name = "";
      }
    });

    //事件处理
    PubSub.subscribe("rename", (msg, payload) => {
      this.parkingSpaceStorage.rename(payload.id, payload.name);
    });
    PubSub.subscribe("highlight", (msg, id) => {
      this.parkingSpaceStorage.highlight(id);
    });

    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (function () {
        return (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();
    }
  },
  mounted() {
      // 设置窗口变化改变视频大小
    var _this = this;
    window.onresize = () => {
      return (() => {
        var w = document.getElementById("detectSource").width;
        var h = document.getElementById("detectSource").height;
        var d = w / 720;
        _this.DHeight = 480 * d;
      })();
    };
  },
  watch: {
    editable(newVal) {
      if (newVal) PubSub.publish("edit-start");
      else PubSub.publish("edit-end");
    },
  },
};
</script>

<style scoped>
#detectCanvas {
  width: 100%;
}
</style>
