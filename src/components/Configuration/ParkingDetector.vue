<template style="overflow-y: auto">
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="人脸识别算法" active @click="handleTransform('1')">
        <div>
          <i-form
            ref="formFace"
            :model="formFace"
            :rules="ruleValidate"
            :label-width="150"
          >
            <!-- 启用 -->
            <Form-item label="启用" prop="start">
              <i-switch
                size="large"
                v-model="formFace.start"
                @on-change="startChange"
              >
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
            </Form-item>
            <!-- 输入框 -->
            <Form-item label="人脸识别最小像素" prop="minPX">
              <i-input
                :disabled="isDisabled"
                v-model="formFace.minPX"
                placeholder="请输入"
                style="width: 200px"
              ></i-input>
            </Form-item>
            <!-- 人脸追踪框架 -->
            <Form-item label="人脸追踪框架" prop="trace">
              <i-select
                :disabled="isDisabled"
                v-model="formFace.trace"
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
                v-model="formFace.alert"
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
                v-model="formFace.dimValue"
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
                v-model="formFace.dimModel"
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
                v-model="formFace.identifyValue"
                placeholder="请输入"
                style="width: 200px"
              ></i-input>
            </Form-item>
            <!-- 华丽的分割线 -->
            <div
              style="
                width: 100%;
                height: 1px;
                margin-bottom: 24px;
                background: #dcdee2;
              "
            ></div>
            <!-- 覆盖或追加 -->
            <div>
              <Form-item label="人脸库" prop="cover">
                <i-select style="width: 200px" v-model="formFace.cover">
                  <i-option
                    v-for="(item, i) in coverOrAddList"
                    v-bind:key="i"
                    :value="item"
                    >{{ item }}</i-option
                  >
                </i-select>
                <!-- <i-button block type="primary" @click="handleSubmit('formFace')"
                  >提交</i-button
                > -->
              </Form-item>
              <!-- <b-form-group
                label="图片上传:"
                label-for="file-default"
                label-cols-sm="2"
              > -->

              <Form-item label="图片上传" prop="faceImage">
                <b-form-file id="file-small" size="sm" @change="getImageFiles">
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
          <div class="explain">
            <span>注意事项：</span>
            <ol style="margin-left: 20px">
              <li>人脸库导入支持图片格式为JPG，PNG</li>
              <li>单张最大不超过：100k</li>
              <li>图片文件名格式为姓名</li>
            </ol>
          </div>
        </div>
        <!-- <b-button
          style="width: 100%"
          variant="primary"
          @click="handleSubmit('formFace')"
          >提交</b-button
        > -->
      </b-tab>
      <b-tab title="车辆识别算法" @click="handleTransform('2')">
        <i-form
          ref="formCar"
          :model="formCar"
          :rules="ruleValidateCar"
          :label-width="150"
        >
          <Form-item label="启用" prop="startCar">
            <i-switch
              size="large"
              v-model="formCar.startCar"
              @on-change="startCarChange"
            >
              <span slot="open">启用</span>
              <span slot="close">禁用</span>
            </i-switch>
          </Form-item>
        </i-form>
      </b-tab>
      <b-tab title="电瓶车识别算法" @click="handleTransform('3')">
        <i-form
          ref="formEletromobile"
          :model="formEletromobile"
          :rules="ruleValidateElectromobile"
          :label-width="150"
        >
          <Form-item label="启用" prop="startEletromobile">
            <i-switch
              size="large"
              v-model="formEletromobile.startEletromobile"
              @on-change="startElectromobileChange"
            >
              <span slot="open">启用</span>
              <span slot="close">禁用</span>
            </i-switch>
          </Form-item>
        </i-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
// import Status from "./Status";
// import CheckpointEditor from "./CheckpointEditor";
import http from "@/config/http";
    import config from "@/config/config";
export default {
  name: "parking-detector",
  components: {
    // Status,
    // CheckpointEditor,
  },
  mixins: [http],
  data() {
    return {
      formFace: {
        start: true,
        minPX: "",
        trace: "",
        alert: "",
        dimValue: "",
        dimModel: "",
        identifyValue: "",
        cover: "",
        faceFiles: {},
      },
      formCar: {
        startCar: false,
      },
      formEletromobile: {
        startEletromobile: false,
      },
      isDisabled: false,
      ruleValidate: {
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
        cover: [
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
      ruleValidateCar: {},
      ruleValidatexxx: {},
      file: null,
      traceSelectList: ["开", "关"],
      alertList: ["开", "关"],
      dimValueList: ["5", "10", "15", "20", "25", "30", "60"],
      photographModelList: ["普通抓拍", "人脸库抓拍", "非人脸库抓拍"],
      coverOrAddList: ["覆盖", "追加"],
      model1: "",
      src: "",
      //   imageNames: "",
      isShow: false,
      imageFrameState: "预览",
      btnIsShow: false,
      indexForm: 0,
      host: config.axios.baseURL,
    };
  },
  created() {
    var _this = this;
    // setTimeout(function() {

    // _this.ruleValidate.minPX[0].required = false;
    // },1000)
  },
  methods: {
    updateFormState() {
      var arithmetic = this.$store.state.arithmetic[this.indexForm];

      // if(arithmetic == 0) { // 三个值都不选
      //   this.formFace.start = false
      //   this.formCar.startCar = false
      //   this.formEletromobile.startEletromobile = false
      // }else
      if (arithmetic == "face") {
        // 人脸
        this.formFace.start = true;
        this.formCar.startCar = false;
        this.formEletromobile.startEletromobile = false;
      } else if (arithmetic == "car") {
        // 汽车
        this.formFace.start = false;
        this.formCar.startCar = true;
        this.formEletromobile.startEletromobile = false;
      } else if (arithmetic == "batteryCar") {
        // 电瓶车
        this.formFace.start = false;
        this.formCar.startCar = false;
        this.formEletromobile.startEletromobile = true;
      }
    },
    setIndexForm(index) {
      this.indexForm = index;
    },
    handleTransform(ids) {
      this.$store.state.tabState = ids;
    },
    handleSubmit(choose) {
      var _this = this;
      if (choose == "face") {
        this.$refs["formFace"].validate((valid) => {
          if (valid && this.formFace.faceFiles.name) {
            this.$Message.success("算法选择：人脸识别算法");
            this.updateData(this.indexForm, "face");
            this.$store.state.isSubmitSuccess = true;
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
    updateData(id, mode) {
      let url = `${this.host}/camera/update/algorithmMode`;
      let data = {
        id: id+1, 
        mode
      }
      console.log(url,id, mode)
      this.$curl.post(url, data)
      .then((resp) => {
        if (resp.status !== 200) {
          console.error("cannot post point data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleAdd() {
      this.formDynamic.items.push({
        value: "",
      });
    },
    handleRemove(item) {
      this.formDynamic.items.$remove(item);
    },
    startChange(status) {
      this.$store.state.arithmetic[this.indexForm] = "face";
      this.isDisabled = !status;
      if (status) {
        this.formCar.startCar = !status;
        this.formEletromobile.startEletromobile = !status;
      }
    },
    startCarChange(status) {
      this.$store.state.arithmetic[this.indexForm] = "car";

      if (status) {
        // this.openRule(!status);
        this.formFace.start = !status;
        this.formEletromobile.startEletromobile = !status;
        this.isDisabled = true; // 禁止编辑
      }
    },
    startElectromobileChange(status) {
      this.$store.state.arithmetic[this.indexForm] = "batteryCar";

      if (status) {
        // this.openRule(!status);
        this.formFace.start = !status;
        this.formCar.startCar = !status;
        this.isDisabled = true; // 禁止编辑
      }
    },
    openRule(state) {
      // 用于控制一些编辑项是否允许编辑
      console.log(this.ruleValidate);
      this.ruleValidate.minPX[0].required = state;
      this.ruleValidate.trace[0].required = state;
      this.ruleValidate.alert[0].required = state;
      this.ruleValidate.dimValue[0].required = state;
      this.ruleValidate.dimModel[0].required = state;
      this.ruleValidate.identifyValue[0].required = state;
    },
    getImageFiles(e) {
      e = e || window.event;
      if (e.target.files.length === 1) {
        console.log("图片添加成功");
        // console.log(this.ruleValidate.faceImage.required);
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
    showImage() {
      this.imageFrameState = this.isShow ? "预览" : "收起";
      this.isShow = this.isShow ? false : true;
    },
  },
};
</script>

<style>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "上传";
}
.imageFrame {
  width: 100%;
}
.explain {
  margin-top: 24px;
}
.imageNames {
  margin-left: 10px;
  font-size: 14px;
}
</style>
