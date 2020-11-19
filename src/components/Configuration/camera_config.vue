<template>
  <div class="rightNav">
    <!-- <ul class="tab-nav">
            <h3 style="height:20px;margin:5px 0 5px 10px;">设备管理树</h3>
            <div class="aline"></div>
            <div style="margin: 5px;display: flex;width: auto;justify-content: center;background-color: #6aabf8">所有设备
            </div>
        </ul> -->
    <div class="test3">
      <Tabs value="name1">
        <TabPane
          style="width: 500px; height: 100vh; overflow: scroll;padding-right:40px;"
          label="人脸识别"
          name="name1"
        >
          <b-tab title="人脸识别算法" active @click="handleTransform('1')">
            <div>
              <i-form
                ref="formFaceCfg"
                :model="formFaceCfg"
                :rules="ruleValidateCfg"
                :label-width="150"
              >
                <!-- 输入框 -->
                <Form-item label="人脸识别最小像素" prop="minPX">
                  <i-input
                    :disabled="isDisabled"
                    v-model="formFaceCfg.minPX"
                    placeholder="请输入"
                    style="width: 200px"
                  ></i-input>
                </Form-item>
                <!-- 人脸追踪框架 -->
                <Form-item label="人脸追踪框架" prop="trace">
                  <i-select
                    :disabled="isDisabled"
                    v-model="formFaceCfg.trace"
                    style="width: 200px"
                  >
                    <i-option
                      v-for="(item, i) in traceSelectList"
                      v-bind:key="i"
                      :value="item"
                      >{{ item }}</i-option
                    >
                  </i-select>
                </Form-item>
                <!-- 人脸报警 -->
                <Form-item label="人脸报警" prop="alert">
                  <i-select
                    :disabled="isDisabled"
                    style="width: 200px"
                    v-model="formFaceCfg.alert"
                  >
                    <i-option
                      v-for="(item, i) in alertList"
                      v-bind:key="i"
                      :value="item"
                      >{{ item }}</i-option
                    >
                  </i-select>
                </Form-item>
                <!-- 抓拍模糊阈值 -->
                <Form-item label="抓拍模糊阈值" prop="dimValue">
                  <i-select
                    :disabled="isDisabled"
                    v-model="formFaceCfg.dimValue"
                    style="width: 200px"
                  >
                    <i-option
                      v-for="(item, i) in dimValueList"
                      v-bind:key="i"
                      :value="item"
                      >{{ item }}</i-option
                    >
                  </i-select>
                </Form-item>
                <!-- 抓拍模式 -->
                <Form-item label="抓拍模式" prop="dimModel">
                  <i-select
                    :disabled="isDisabled"
                    v-model="formFaceCfg.dimModel"
                    style="width: 200px"
                  >
                    <i-option
                      v-for="(item, i) in photographModelList"
                      v-bind:key="i"
                      :value="item"
                      >{{ item }}</i-option
                    >
                  </i-select>
                </Form-item>
                <!-- 人脸对比识别阈值 -->
                <Form-item label="人脸对比识别阈值" prop="identifyValue">
                  <i-input
                    :disabled="isDisabled"
                    v-model="formFaceCfg.identifyValue"
                    placeholder="请输入"
                    style="width: 200px"
                  ></i-input>
                </Form-item>

                <div style="height: 50px; position: relative">
                  <b-button
                    style="position: absolute; right: 0"
                    variant="primary"
                    @click="handleSubmitCfg('formFace')"
                    >提交</b-button
                  >
                </div>
                <!-- 华丽的分割线 -->
                <div
                  style="
                    width: 100%;
                    height: 1px;
                    margin-bottom: 24px;
                    background: #dcdee2;
                  "
                ></div>
              </i-form>

              <i-form
                ref="formFace"
                :model="formFace"
                :rules="ruleValidate"
                :label-width="150"
              >
                <!-- 覆盖或追加 -->
                <div>
                  <Form-item label="编号" prop="number">
                    <i-input
                      :disabled="isDisabled"
                      v-model="formFace.number"
                      placeholder="请输入"
                      style="width: 200px"
                    ></i-input>
                  </Form-item>
                  <Form-item label="姓名" prop="name">
                    <i-input
                      :disabled="isDisabled"
                      v-model="formFace.name"
                      placeholder="请输入"
                      style="width: 200px"
                    ></i-input>
                  </Form-item>
                  <!-- <b-form-group
                label="图片上传:"
                label-for="file-default"
                label-cols-sm="2"
              > -->

                  <Form-item label="图片上传" prop="faceImage">
                    <b-form-file
                      id="file-small"
                      size="sm"
                      @change="getImageFiles"
                    >
                    </b-form-file>
                  </Form-item>
                  <!-- </b-form-group> -->
                  <div>
                    <b-button
                      variant="primary"
                      style="margin: 24px 0"
                      @click="showImage"
                      v-show="btnIsShow"
                      >{{ imageFrameState }}图片</b-button
                    >
                  </div>
                  <!-- <span class="imageNames">{{ imageNames }}</span> -->
                  <img class="imageFrame" :src="src" v-show="isShow" alt="" />

                  <div class="explain">
                    <span>注意事项：</span>
                    <ol style="margin-left: 20px">
                      <li>人脸库导入支持图片格式为JPG</li>
                      <li>单张最大不超过：100k</li>
                      <li>图片文件名格式为"编号-姓名"</li>
                    </ol>
                    <div style="position: relative; background: red">
                      <b-button
                        style="position: absolute; right: 0; top: 0"
                        variant="primary"
                        @click="handleSubmit('face')"
                        >提交</b-button
                      >
                    </div>
                  </div>
                </div>
                <!-- ======华丽的分割线======= -->
                <!-- <div
                  style="
                    width: 100%;
                    height: 1px;
                    margin-top: 24px;
                    margin-bottom: 24px;
                    background: #dcdee2;
                  "
                ></div> -->
              </i-form>
            </div>
          </b-tab>
        </TabPane>
        <TabPane label="车辆识别" name="name2">车辆识别</TabPane>
        <TabPane label="电瓶车识别" name="name3">电瓶车识别</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
    import config from "@/config/config";
    import http from "@/config/http"
export default {
  name: "camera_config",
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
  },
  mixins: [http],
  data() {
    return {
      x: "",
      l: "",
      flag: false,
      inputValue: this.value,
      value8: 25,
      value4: 25,
      value5: 25,
      value6: 25,
      value7: 25,
      value9: 25,
      single: false,
      cityList: [
        {
          value: "after",
          label: "离开后抓拍",
        },
        {
          value: "rmvb",
          label: ".rmvb",
        },
        {
          value: "mpg",
          label: ".mpg",
        },
        {
          value: "mov",
          label: ".mov",
        },
      ],
      model1: "",
      cityList1: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
      ],
      model2: "",
      cityList2: [
        {
          value: "100%",
          label: "100%",
        },
        {
          value: "80%",
          label: "80%",
        },
        {
          value: "60%",
          label: "60%",
        },
        {
          value: "50%",
          label: "50%",
        },
      ],
      model3: "",
      cityList3: [
        {
          value: "1920*1080",
          label: "1920*1080",
        },
        {
          value: "1280*960",
          label: "1280*960",
        },
        {
          value: "960*640",
          label: "960*640",
        },
        {
          value: "640*360",
          label: "640*360",
        },
      ],
      model4: "",

      formFaceCfg: {
        minPX: "",
        trace: "",
        alert: "",
        dimValue: "",
        dimModel: "",
        identifyValue: "",
      },

      formFace: {
        number: "",
        name: "",
        faceFiles: {},
      },
      ruleValidateCfg: {
        minPX: [
          {
            required: true,
            message: "这是必填项",
            trigger: "blur",
          },
        ],
        trace: [
          {
            required: true,
            message: "这是必填项",
            trigger: "change",
          },
        ],
        alert: [
          {
            required: true,
            message: "这是必填项",
            trigger: "change",
          },
        ],
        dimValue: [
          {
            required: true,
            message: "这是必填项",
            trigger: "change",
          },
        ],
        dimModel: [
          {
            required: true,
            message: "这是必填项",
            trigger: "change",
          },
        ],
        identifyValue: [
          {
            required: true,
            message: "这是必填项",
            trigger: "blur",
          },
        ],
      },

      ruleValidate: {
        number: [
          {
            required: true,
            message: "这是必填项",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "这是必填项",
            trigger: "change",
          },
        ],
        faceImage: [
          {
            required: true,
            message: "这是必填项",
            trigger: "change",
          },
        ],
      },

      btnIsShow: false,
      isShow: false,
      host: config.axios.baseURL,
      isDisabled: false,
      imageFrameState: "预览",
      traceSelectList: ["开", "关"],
      alertList: ["开", "关"],
      dimValueList: ["5", "10", "15", "20", "25", "30", "60"],
      photographModelList: ["普通抓拍", "人脸库抓拍", "非人脸库抓拍"],
      coverOrAddList: ["覆盖", "追加"],
    };
  },
  computed: {
    width() {
      return (
        this.inputValue * (this.$refs.bar.offsetWidth / this.max) -
        this.$refs.btn.offsetWidth / 2
      );
    },
    stepWidth() {
      return Math.max(0, this.width);
    },
  },
  mounted() {
    this.$refs.btn.style.left = this.width + "px";
    this.$refs.step.style.width = this.stepWidth + "px";
  },
  methods: {
    handleTransform(ids) {
      this.$store.state.tabState = ids;
    },
    handleSubmitCfg() {
      console.log(this);
      this.$refs["formFaceCfg"].validate((valid) => {
        if (valid) {
          console.log(valid, this.formFaceCfg);
          this.$Message.success("算法选择：人脸识别算法");
          // this.updateData(this.indexForm, "face");
          this.$store.state.isSubmitSuccess = true;
        } else {
          this.$Message.error("表单验证失败!");
          this.$store.state.isSubmitSuccess = false;
        }
      });
    },
    handleSubmit(choose) {
      // /face/insertFace
      var _this = this;
      if (choose == "face") {
        this.$refs["formFace"].validate((valid) => {
          if (valid && this.formFace.faceFiles.name) {
            console.log(valid, this.formFace.faceFiles.name);
            // this.$Message.success("算法选择：人脸识别算法");
            // this.updateData(this.indexForm, "face");
            // this.$store.state.isSubmitSuccess = true;
            ///face/insertFace

            var formdata = new FormData();
            
            formdata.append("userId", this.formFace.number);
            formdata.append("name", this.formFace.name);
            formdata.append("img", this.formFace.faceFiles);
            let url = `${this.host+this.insertFaceUrl}`;
            let data = {
              userId:this.formFace.number,
              name:this.formFace.name,
              Img:formdata,
            }
            console.log(formdata)
            this.$curl.post(url, formdata).then(
              (res) => {
                if (res.code === 200) {
                  this.$Message.success(res.msg);
                } else {
                  this.$Message.warning(res.msg);
                }
              },
              (err) => {
                this.$Message.error(err);
              }
            );
            this.showConfig = false;
          } else {
            this.$Message.error("表单验证失败!");
            this.$store.state.isSubmitSuccess = false;
          }
        });
      } else if (choose == "car") {
        this.$Message.success("算法选择：车辆识别算法");
        this.updateData(this.indexForm, "car");
      } else if (choose == "batteryCar") {
        this.$Message.success("算法选择：电瓶车识别算法");
        this.updateData(this.indexForm, "batteryCar");
      }
    },
    showImage() {
      this.imageFrameState = this.isShow ? "预览" : "收起";
      this.isShow = this.isShow ? false : true;
    },
    getImageFiles(e) {
      e = e || window.event;
      console.log(e.target.files);
      if (e.target.files.length === 1) {
        console.log("图片添加成功");
        console.log(this.ruleValidate.faceImage.required);
        this.ruleValidate.faceImage[0].required = false;
        let files = e.target.files[0];
        console.log(files);
        this.formFace.faceFiles = files;
        let _this = this;
        if (files.size <= 100000) {
          let reader = new FileReader();
          reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
          reader.onloadend = function () {
            _this.src = this.result;
            _this.btnIsShow = true;
          };
          //   this.imageNames = files.name;
          // return files[0].name;
        } else {
          this.btnIsShow = false;
          this.$Message.error("图片不得大于100k");
        }
      } else {
        return `${files.length} files selected`;
      }
    },
    handleMessage(onoff) {
      console.log(onoff);
    },
    save(event) {
      console.log(event.target.value);
    },
    btnclick(e) {
      let x = e.clientX - this.$refs.bar.offsetLeft;
      this.inputValue = Math.round((x / this.$refs.bar.offsetWidth) * 100);
      // var y = e.clientY - this.$refs.bar.offsetTop
    },
    maxW() {
      return this.$refs.bar.offsetWidth - this.$refs.btn.offsetWidth / 2;
    },
    btndown(e) {
      this.x = (e || window.event).clientX;
      this.l = this.$refs.btn.offsetLeft;
      this.flag = true;
      document.addEventListener("mousemove", this.btnmove);
      document.addEventListener("mouseup", this.btnup);
    },
    btnmove(e) {
      let m = Math;
      let thisX = (e || window.event).clientX;
      this.tTo(m, thisX);
      window.getSelection
        ? window.getSelection().removeAllRanges()
        : document.selection.empty();
    },
    btnup() {
      this.flag = false;
      document.removeEventListener("mousemove", this.btnmove);
      document.removeEventListener("mouseup", this.btnup);
    },
    tTo(m, x) {
      let w = m.min(
        this.maxW(),
        m.max(-this.$refs.btn.offsetWidth / 2, this.l + (x - this.x))
      );
      this.inputValue = m.round(m.max(0, w / this.maxW()) * 100);
    },
    btnth(e) {
      this.x = (e || window.event).touches[0].clientX;
      this.l = this.$refs.btn.offsetLeft;
      this.flag = true;
      document.addEventListener("touchmove", this.btnthmove);
      document.addEventListener("touchend", this.btnthup);
    },
    btnthmove(e) {
      let m = Math;
      let thisX = (e || window.event).touches[0].clientX;
      this.tTo(m, thisX);
    },
    btnthup() {
      this.flag = false;
      document.removeEventListener("touchmove", this.btnthmove);
      document.removeEventListener("touchend", this.btnthup);
    },
  },
  watch: {
    inputValue(val) {
      this.$emit("input", val);
      this.$emit("change", val);
      this.$refs.btn.style.left = this.width + "px";
      this.$refs.step.style.width = this.stepWidth + "px";
    },
  },
};
</script>

<style lang="less">
.name1 {
  padding-bottom: 100px;
}
.slider {
  font-size: 12px;
  line-height: 50px;
  position: relative;
  height: 50px;
  width: 200px;
  list-style: none;
}

.slider-thumb {
  background-color: black;
  width: 16px;
  height: 16px;
  position: absolute;
  left: -8px;
  top: -5px;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.5s box-shadow;
}

.slider-thumb.Act {
  box-shadow: 0 0 5px #333;
}
.explain {
  margin-top: 10px;
  height: 300px;
}

.slider-track {
  background: red;
  height: 5px;
  position: relative;
  font-size: 0px;
  cursor: pointer;
}

.slider-fill {
  background-color: blue;
  position: absolute;
  height: 5px;
  width: 0;
  left: 0;
  bottom: 0;
}

.imageFrame {
  width: 100%;
}
.ivu-tabs-content {
  padding-left: 30px;
}
//点击后右箭头的反转效果
</style>
