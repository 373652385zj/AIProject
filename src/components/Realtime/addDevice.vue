<template>
    <div class="test3">
        <div class="title2">
            <h3>添加设备</h3>
        </div>
        <div class="aline"></div>
        <div style="width: 100%;height: 100%;">
            <div style="display: inline-block;width: 35%;float: left;">
                <Form ref="formInputList" :rules="ruleInputList" :model="formInputList" :label-width="80"
                      style="margin-top:20px;width:100%;">
                    <FormItem label="名称">
                        <Input v-model="formInputList.name" class="Input"></Input>
                    </FormItem>
                    <FormItem label="rtsp地址">
                        <Input v-model="formInputList.url" placeholder="ip:port" class="Input">
                            <span slot="prepend">rtsp://</span>
                        </Input>
                    </FormItem>
                    <!--                    <FormItem label="rtsp验证">-->
                    <!--                        <i-switch v-model="formInputList.auth" @on-change="isAuthChoose"/>-->
                    <!--                    </FormItem>-->
                    <!--                    <FormItem v-show="isAuth" label="账号">-->
                    <!--                        <Input id="u" v-model="formInputList.username" class="Input"></Input>-->
                    <!--                    </FormItem>-->
                    <!--                    <FormItem v-show="isAuth" label="密码">-->
                    <!--                        <Input id="p" v-model="formInputList.password" class="Input"></Input>-->
                    <!--                    </FormItem>-->
                    <FormItem label="描述">
                        <Input v-model="formInputList.content" maxlength="100" show-word-limit type="textarea"
                               placeholder="Enter something..." class="Input"/>
                    </FormItem>
                    <FormItem label="启用">
                        <i-switch size="large"  true-color="#13ce66" false-color="#ff4949" v-model="formInputList.enable">
                            <span slot="open">启用</span>
                            <span slot="close">禁用</span>
                        </i-switch>
                    </FormItem>
                </Form>

            </div>
            <Modal v-model="showVideo" width="630" @on-cancel="stopRTSP" :closable="false" header-hide footer-hide>
                <OBJECT classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921" id="vlc" codebase="" width="600"
                        height="480" events="True">
                    <param name="MRL" value=""/>
                    <param name="Src" value=""/>
                    <param name="AutoLoop" value="False"/>
                    <param name="AutoPlay" value="False"/>
                    <param name="Time" value="True"/>
                    <param name="ShowDisplay" value="True"/>
                    <param name="Controls" value="False">
                    <EMBED pluginspage="http://www.videolan.org" type="application/x-vlc-plugin"
                           version="VideoLAN.VLCPlugin.2" width="600" height="480" text="Waiting for video"
                           name="vlc"></EMBED>
                </OBJECT>
            </Modal>
            <!--            <div class="pad-right">-->
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
            <!--            </div>-->
        </div>
        <div class="my-footer" style="margin-bottom: 30px; text-align: center"><!-- margin-left: 150px -->
            <Button style="margin: 5px 5px 5px 5px;" type="info" @click="testRTSP">测试rtsp</Button>
            <Button style="margin: 5px 5px 5px 5px;" type="primary" @click="saveRTSP">保存</Button>
        </div>

    </div>

</template>

<script>
    import http from '@/config/http';
    import {globalBus} from '@/config/globalBus';

    export default {
        name: "addDevice",
        data() {
            return {
                showVideo: false,
                isAuth: false,
                formInputList: {
                    name: '',
                    url: '',
                    auth: false,
                    username: '',
                    password: '',
                    content: '',
                    enable: true
                },
                ruleInputList: {},

            }
        },
        methods: {
            isAuthChoose(status) {
                this.isAuth = status
            },
            testRTSP() {
                if(this.explorer() !== 'IE') {
                    let ex = this.explorer();
                    this.$Message.error("您所使用的浏览器为:"+ ex  +",暂不支持除IE浏览器外其他浏览器!");
                    return;
                }
                if (this.formInputList.url === '' || this.formInputList.url == null) {
                    this.$Message.error("rtsp地址不能为空");
                    return;
                }
                this.$Message.info("开始rtsp拉流测试,稍等几秒....");
                let vlc = document.getElementById("vlc");
                let rtspUrl = 'rtsp://';
                if (this.isAuth) {
                    rtspUrl += this.formInputList.username + ":" + this.formInputList.password + "@";
                }
                rtspUrl += this.formInputList.url;
                let options = [":aspect-ratio=4:3", "--rtsp-tcp"];
                let id = vlc.playlist.add(rtspUrl, "fancy name", options);
                vlc.playlist.playItem(id);
                this.showVideo = true;
                vlc.playlist.play();
            },
            stopRTSP() {
                let vlc = document.getElementById("vlc");
                vlc.playlist.stop();
                vlc.playlist.clear();
            },
            saveRTSP() {
                let url = this.insertRTSPUrl;
                let data = {
                    name: this.formInputList.name,
                    url: this.formInputList.url,
                    auth: this.formInputList.auth === true ? 1 : 0,
                    username: this.formInputList.username,
                    password: this.formInputList.password,
                    content: this.formInputList.content,
                    enable: this.formInputList.enable === true ? 1 : 0
                };
                this.$curl.post(url, data).then(res => {
                    if (res.code === 200) {
                        this.formInputList = {
                            name: '',
                            url: '',
                            auth: false,
                            username: '',
                            password: '',
                            content: '',
                            enable: true
                        };
                        this.$Message.success("保存成功");
                    } else {
                        this.$Message.warning(res.msg);
                    }
                }, err => {
                    this.$Message.error(err);
                })
            },
            explorer() {
                let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                let isOpera = userAgent.indexOf("Opera") > -1;
                if (isOpera) {//判断是否Opera浏览器
                    return "Opera"
                }
                if (userAgent.indexOf("Firefox") > -1) {//判断是否Firefox浏览器
                    return "Firefox";
                }
                if (userAgent.indexOf("Chrome") > -1){//判断是否Chrome浏览器
                    return "Chrome";
                }
                if (userAgent.indexOf("Safari") > -1) {//判断是否Safari浏览器
                    return "Safari";
                }
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {//判断是否IE浏览器
                    return "IE";
                }
                if (userAgent.indexOf("Trident") > -1) {
                    return "IE";
                }
            }
        },

        created() {
        },
        destroyed() {
            this.stopRTSP();
            this.formInputList = {}
        },
        mixins: [http]

    }
</script>

<style scoped>
    .ivu-input-group .ivu-input {
        width: 100%;
    }

    .ivu-input {
        width: 100%;
    }

    .Input {
        width: 100%;
    }

    .pad-right {
        margin-top: 20px;
        width: 60%;
        margin-left: 20px;
        height: 100%;
        display: inline-block;
    }

    .my-footer {
        width: 100%;
        position: fixed;
        bottom: 0px;
    }
</style>