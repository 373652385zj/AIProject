<template>
  <Layout>
    <Sider style="background-color: white; border-right: 1px solid #dcdee2">
      <!-- @on-current-change="liveChange" -->
      <Table
        highlight-row
        
        :columns="tableHead"
        :data="deviceData"
        border
      >
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
      </Table>
    </Sider>
    <Layout style="display: flex">
      <Header class="liveTitle" style="background-color: white"
        ><font style="font-size: large">实时画面</font></Header
      >
      <div
        style="
          height: 100%;
          width: 100%;
          text-align: center;
          border-radius: 5px;
        "
      >
        <!--                <OBJECT classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921" id="vlc" codebase="" width="600"-->
        <!--                        height="480" events="True">-->
        <!--                    <param name="MRL" value=""/>-->
        <!--                    <param name="Src" value=""/>-->
        <!--                    <param name="AutoLoop" value="False"/>-->
        <!--                    <param name="AutoPlay" value="False"/>-->
        <!--                    <param name="Time" value="True"/>-->
        <!--                    <param name="ShowDisplay" value="True"/>-->
        <!--                    <param name="Controls" value="False">-->
        <!--                    <EMBED pluginspage="http://www.videolan.org" type="application/x-vlc-plugin"-->
        <!--                           version="VideoLAN.VLCPlugin.2" width="600" height="480" text="Waiting for video"-->
        <!--                           name="vlc"></EMBED>-->
        <!--                </OBJECT>-->
        <!--  width="720px" height="480px"  -->
        <img
          id="livePicture"
          class="livePicture"
          style="border-radius: 5px"
          :width="LPWidth"
          :height="LPHeight"
          :src="liveUrl"
        />
      </div>
    </Layout>
    <Sider style="background-color: #ffffff; border-left: 1px solid #dcdee2"
      >侧边栏</Sider
    >
  </Layout>
</template>

<script>
import http from "@/config/http";
import { axios } from "@/config/config";
import $ from "jquery";

export default {
  name: "live",
  data() {
    return {
      split1: 0.5,
      tableHead: [
        {
          title: "设备",
          key: "name",
          sortable: true,
          align: "center",
        },
      ],
      deviceData: [],
      liveUrl: "",
      rtspUrl: "",
      LPWidth: "720px",
      LPHeight: "480px",
    };
  },
  methods: {
    // liveChange(currentRow, oldCurrentRow) {
    //     let vlc = document.getElementById("vlc");
    //     if (oldCurrentRow != null) {
    //         vlc.playlist.stop();
    //     }
    //     vlc.playlist.playItem(currentRow.index);
    // }
    liveChange(currentRow, oldCurrentRow) {
      let url = this.stopRTSPUrl;
      let data = { url: this.rtspUrl };
      this.$curl.post(url, data).then(
        (res) => {
          if (res.code === 200) {
            console.log("success");
          } else {
            console.log(res.msg);
          }
        },
        (err) => {
          console.log("fail");
        }
      );

      this.liveUrl = axios.baseURL + "/camera/live?url=" + "rtsp://";
      this.rtspUrl = "rtsp://";
      if (currentRow.auth) {
        this.liveUrl += currentRow.username + ":" + currentRow.password + "@";
        this.rtspUrl += currentRow.username + ":" + currentRow.password + "@";
      }
      this.liveUrl += currentRow.url;
      this.rtspUrl += currentRow.url;
    },
  },
  created() {
    /*
                let url = this.selectAllRTSPUrl;
                this.$curl.post(url).then(res => {
                    if (res.code === 200) {
                        this.deviceData = res.data;
                        let vlc = document.getElementById("vlc");
                        this.deviceData.forEach(item => {
                            let rtspUrl = 'rtsp://';
                            if (this.isAuth) {
                                rtspUrl += item.username + ":" + item.password + "@";
                            }
                            rtspUrl += item.url;
                            let options = [":aspect-ratio=4:3", "--rtsp-tcp"];
                            let id = vlc.playlist.add(rtspUrl, "fancy name", options);
                        });
                        for (let i = 0; i < this.deviceData.length; i++) {
                            this.deviceData[i].index = i;
                        }
                        if (this.deviceData != null) {
                            this.deviceData[0]._highlight = true;
                            vlc.playlist.playItem(0);
                        }
                    } else {
                        this.$Message.warning(res.msg);
                    }
                }, err => {
                    this.$Message(JSON.stringify(err));
                });
            */
    let url = this.selectAllRTSPUrl;
    this.$curl.post(url).then(
      (res) => {
        if (res.code === 200) {
          this.deviceData = res.data;
          if (res.data.length !== 0) {
            this.liveUrl = axios.baseURL + "/camera/live?url=" + "rtsp://";
            this.rtspUrl = "rtsp://";
            if (res.data[0].isAuth) {
              this.liveUrl +=
                res.data[0].username + ":" + res.data[0].password + "@";
              this.rtspUrl +=
                res.data[0].username + ":" + res.data[0].password + "@";
            }
            this.liveUrl += res.data[0].url;
            this.rtspUrl += res.data[0].url;
          }
        } else {
          this.$Message.warning(res.msg);
        }
      },
      (err) => {
        this.$Message(JSON.stringify(err));
      }
    );
  },
  mounted() {
    // 监视窗口变化
    // var _this = this;
    window.onresize = () => {
      // if()
      //   return (() => {
      //     if (document.getElementById("livePicture").width >= "480px") {
      //       console.log("move the windows");
      //       // _this.LPHeight = (_this.LPWidth * 480) / 720 + "px";
      //     }
      //   })();
    };
  },
  destroyed() {
    let url = this.stopRTSPUrl;
    let data = { url: this.rtspUrl };
    this.$curl.post(url, data).then(
      (res) => {
        if (res.code === 200) {
          console.log("success");
        } else {
          console.log(res.msg);
        }
      },
      (err) => {
        console.log("fail");
      }
    );
  },
  mixins: [http],
};
</script>

<style scoped lang="less">
.pad-center {
  margin-top: 20px;
  width: 55%;
  margin-left: 20px;
  margin-right: 20px;
  height: 100%;
  display: inline-block;
  background-color: #eb2f96;
}

.pad-right {
  width: 20%;
  height: 100%;
  display: inline-block;
  background-color: #67c23a;
}
.livePicture {
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

@width: 1000px;
@pro: 480/720;
@media screen and (min-width: 1500px) {
  .livePicture {
    width: @width;
    height: @width * @pro;
  }
}
</style>