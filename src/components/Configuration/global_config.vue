<template>
  <div class="rightNav">
    <div class="test3" style="width: 100%">
      <div class="title2">
        <h3>设备管理</h3>
        <div class="aline"></div>
        <div style="padding: 10px 10px 10px 10px; text-align: center">
          <Table width="1000" border :columns="deviceHeader" :data="deviceData">
            <template slot-scope="{ row }" slot="arithmeticMode">
              <span v-if="isRouterAlive">
                {{ row.arithmeticMode }}
              </span>
            </template>
            <template slot-scope="{ row, index }" slot="operation">
              <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="editDeviceConfig(index)"
                >配置
              </Button>
              <Button
                type="primary"
                size="small"
                style="magin: 5px"
                @click="gotoSeeDetect(index)"
                >查看
              </Button>
            </template>
          </Table>
        </div>
        <Modal @on-cancel="cancel" width="750" v-model="showConfig">
          启用：
          <RadioGroup v-model="modalData.activeName">
            <Radio label="face">人脸识别</Radio>
            <Radio label="car">车辆识别</Radio>
          </RadioGroup>
          <!--                    <Tabs v-model="activeName">-->
          <Tabs value="人脸识别">
            <TabPane label="人脸识别" name="人脸识别">
              <!--                            <p style="float: left;width:200px;font-size: 23px">人脸识别</p>-->
              <!--                            <i-switch size="large" v-model="modalData.TestRgbDetect.enable">-->
              <!--                                <span slot="open">ON</span>-->
              <!--                                <span slot="close">OFF</span>-->
              <!--                            </i-switch>-->

              <!--                            <br>-->
              <!--                            <br>-->
              <!--                            <p style="font-size:23px;float: left;width: 200px">关联人脸库</p>-->
              <!--                            <Checkbox v-model="single">全选</Checkbox>-->
              <!--                            <br>-->
              <!--                            <br>-->
              <!--                            <Button type="primary" style="margin-left: 200px;">保存配置</Button>-->
              <!--                            <br>-->
              <!--                            <p style="font-size:23px;float: left;width: 200px">功能演示</p>-->
              <!--                            <br><br><br>-->
              <!--                            <br>-->
              <!--                            <Upload action="//jsonplaceholder.typicode.com/posts/">-->
              <!--                                <Button icon="ios-cloud-upload-outline">上传</Button>-->
              <!--                            </Upload>-->

              <!--                            &lt;!&ndash;                        <p style="font-size:23px;width: 200px">识别结果</p>&ndash;&gt;-->
              <!--                            &lt;!&ndash;                        <Table stripe :columns="columns1" :data="data1"></Table>&ndash;&gt;-->
              <Form :model="modalData.faceDetect" :label-width="80">
                <Button
                  type="primary"
                  style="margin-bottom: 20px"
                  @click="showDetect('face')"
                  >功能演示
                </Button>
                <!--                                <img src="../../assets/720x480.png">-->
                <img width="720px" height="480px" :src="detectUrl.faceUrl" />
              </Form>
            </TabPane>
            <TabPane label="车辆识别" name="车辆识别">
              <Form :model="modalData.carDetect" :label-width="80">
                <Button
                  type="primary"
                  style="margin-bottom: 20px"
                  @click="showDetect('car')"
                  >功能演示
                </Button>
                <!--                                <img src="../../assets/720x480.png">-->
                <img width="720px" height="480px" :src="detectUrl.carUrl" />
              </Form>

              <!--                            <p style="font-size:23px;float: left;width: 200px">功能演示</p>-->
            </TabPane>

            <!--                        <TabPane label="???" name="name3"></TabPane>-->
          </Tabs>
          <div slot="footer">
            <Button type="primary" @click="submit()">保存</Button>
            <Button @click="cancel" style="margin-left: 8px">取消</Button>
          </div>
        </Modal>
        <!-- <Modal fullscreen v-model="showModal"> 全屏 -->
        <Modal @on-ok="ok" v-model="showModal" :loading="loading">
          <ParkingDetector ref="mychild" />
        </Modal>
      </div>
    </div>
  </div>
</template>


<script>
import http from "@/config/http";
import axios from "axios";
import ParkingDetector from "@/components/Configuration/ParkingDetector";

export default {
  name: "global_config",
  components: { ParkingDetector },
  provide() {
    return {
      reload: this.reload,
    };
  },
  inject: ["reload"],
  methods: {
    reload() {
      console.log("afa");
      var _this = this;
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    handleMessage(onoff) {},
    save(event) {
      console.log(event.target.value);
    },
    editDeviceConfig(index) {
      // this.showConfig = true;
      // setIndexForm
      this.$refs.mychild.setIndexForm(index);
      this.$refs.mychild.updateFormState();
      this.indexForm = index;
      this.rtspUrl = "rtsp://";
      if (this.deviceData[index].auth === 1) {
        this.rtspUrl +=
          this.deviceData[index].username +
          ":" +
          this.deviceData[index].password +
          "@";
      }
      this.rtspUrl += this.deviceData[index].url;
      this.showModal = true;
    },
    getDeviceMessage() {
      let url = this.selectAllRTSPUrl;
      this.$curl.post(url).then(
        (res) => {
          if (res.code === 200) {
            this.deviceData = res.data;
          } else {
            this.$Message.warning(res.msg);
          }
        },
        (err) => {
          this.$Message.error(err);
        }
      );
    },
    messageWarningFn(text) {
      this.$Message.warning(text);
      setTimeout(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 500);
    },
    ok() {
      var _this = this;
      // this.$Message.info("点击了确定");
      // 取出store中的数据进行判断
      console.log(this.indexForm,_this.$store.state.arithmetic[this.indexForm])
      this.$refs.mychild.handleSubmit(
        _this.$store.state.arithmetic[this.indexForm]
      );

      setTimeout(() => {
        if (this.$store.state.isSubmitSuccess) {
          this.loading = false;
          this.$nextTick(() => {
            _this.loading = true;
            _this.showModal = false;

            _this.getLiveData();
            // _this.reload();
          });
        } else {
          this.loading = false;
          this.$nextTick(() => {
            _this.loading = true;
          });
        }
      }, 1000);
    },
    cancel() {
      this.detectUrl = {
        carUrl: "",
        faceUrl: "",
      };
      let url = this.stopRTSPUrl;
      let data = {
        url: "rtsp://" + this.deviceData[this.indexForm].url,
      };
      this.$curl.post(url, data).then(
        (res) => {
          if (res.code === 200) {
            // this.$Message.success(res.msg);
          } else {
            // this.$Message.warning(res.msg);
          }
        },
        (err) => {
          this.$Message.error(err);
        }
      );
      this.showConfig = false;
    },
    submit() {
      this.detectUrl = {
        carUrl: "",
        faceUrl: "",
      };
      this.showConfig = false;
      let url = this.updateRTSPConfigUrl;
      let data = {};
      // alert(JSON.stringify(this.modalData));
      // this.$curl.post(url, data).then(res => {
      //
      // }, err => {
      //
      // })
    },
    showDetect(mode) {
      let url =
        axios.baseURL +
        "/camera/detect_box?url=" +
        "rtsp://" +
        this.deviceData[this.indexForm].url +
        "&mode=" +
        mode;
      this.detectUrl.carUrl = url;
    },
    gotoSeeDetect(index) {
      console.log(index)
      console.log(this.indexForm)
      console.log(this.$store.state.arithmetic)
      if (this.$store.state.arithmetic[index] == "face") {
        this.$router.push({
          path: "/Configuration/FaceDetector",
          name: "",
        });
      } else if (this.$store.state.arithmetic[index] == "car") {
        this.$router.push({
          path: "/Configuration/NewParkingDetector",
          name: "",
        });
      } else if (this.$store.state.arithmetic[index] == "batteryCar") {
        this.$router.push({
          path: "/Configuration/BatteryCarDetector",
          name: "",
        });
      } 
      // else if (this.$store.state.arithmetic[this.indexForm] == 0) {
      //   if (this.$store.state.tabState == 1) {
      //     this.$router.push({
      //       path: "/Configuration/FaceDetector",
      //       name: "",
      //     });
      //   }
      // }
    },
    // gotoSeeDetect(index) {
    //   this.indexForm = index;
    //   this.rtspUrl = "rtsp://";
    //   if (this.deviceData[index].auth === 1) {
    //     this.rtspUrl +=
    //       this.deviceData[index].username +
    //       ":" +
    //       this.deviceData[index].password +
    //       "@";
    //   }
    //   this.rtspUrl += this.deviceData[index].url;
    //   this.$router.push({///NewParkingDetector
    //     path: "/Configuration/CarDetector",
    //     // path: "/NewParkingDetector",
    //     name: "",
    //     params: {
    //       rtspUrl: "123",
    //       name: "",
    //     },
    //   });
    // },
    getLiveData() {
      let url = this.selectAllRTSPUrl;
      var _this = this;
      console.log(this)
      this.$curl.post(url).then(
        (res) => {
          if (res.code === 200) {
            _this.deviceData = res.data;
            console.log(_this.deviceData)
            // 假数据
            // _this.deviceData[0].mode = this.$store.state.arithmetic[0];
            // _this.deviceData[1].mode = this.$store.state.arithmetic[1]; 

            _this.deviceData.forEach((item, index) => {
              item.enable = item.enable === 1 ? "启用" : "禁用";
              // car,face,batteryCar
            _this.$store.state.arithmetic[index] = item.mode
              if (item.mode == "face") {
                item.arithmeticMode = "人脸识别算法";
              } else if (item.mode == "car") {
                item.arithmeticMode = "车辆识别算法";
              } else if (item.mode == "batteryCar") {
                item.arithmeticMode = "电瓶车识别算法";
              }
            });
          } else {
            this.$Message.warning(res);
          }
        },
        (err) => {
          this.$Message.error(err);
        }
      );
    },
  },
  data() {
    return {
      showConfig: false,
      showModal: false,
      rtspUrl: "",
      value11: "",
      loading: true,
      columns1: [
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "性别",
          key: "sex",
        },
        {
          title: "生日",
          key: "birth",
        },
        {
          title: "证件类型",
          key: "document_type",
        },
        {
          title: "证件号",
          key: "certificate_number",
        },
        {
          title: "所在人脸库",
          key: "from",
        },
      ],
      data1: [{}],
      deviceHeader: [
        {
          type: "selection",
          align: "center",
          width: 100,
        },
        {
          title: "名称",
          key: "name",
          width: 150,
          align: "center",
        },
        {
          title: "rtsp地址",
          key: "url",
          width: 350,
          align: "center",
        },
        {
          title: "设备状态",
          key: "enable",
          width: 100,
          align: "center",
        },
        {
          title: "算法模式",
          key: "arithmeticMode",
          width: 130,
          slot: "arithmeticMode",
          align: "center",
        },
        {
          title: "操作",
          slot: "operation",
          align: "center",
        },
      ],
      deviceData: [{}],
      modalData: {
        activeName: "face",
        faceDetect: {},
        carDetect: {},
      },
      indexForm: 0,
      detectUrl: {
        carUrl: "",
        faceUrl: "",
      },
      isRouterAlive: true,
    };
  },
  mixins: [http],
  created() {
    // var _this = this;
    this.getLiveData()
  },
  // mounted() {
  //   var _this = this;
  //   console.log("updated");
  //   _this.requestTableData();
  //   console.log(this.deviceData);
  // },
  destroyed() {
    this.cancel();
  },
};
</script>

<style lang="less">
</style>
