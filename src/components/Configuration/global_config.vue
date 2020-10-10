<template>
    <div class="rightNav" >
        <div class="test3" style="width: 100%">
            <div class="title2">
                <h3>设备管理</h3>
                <div class="aline"></div>
                <div style="padding: 10px 10px 10px 10px;text-align: center">
                    <Table width="850" border :columns="deviceHeader" :data="deviceData">
                        <template slot-scope="{row, index}" slot="operation">
                            <Button type="primary" size="small" style="margin-right: 5px"
                                    @click="editDeviceConfig(index)">配置
                            </Button>
                            <Button type="primary" size="small" style="magin:5px"
                                    @click="gotoSeeDetect(index)">查看
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

                                <Button type="primary" style="margin-bottom: 20px" @click="showDetect('face')">功能演示
                                </Button>
                                <!--                                <img src="../../assets/720x480.png">-->
                                <img width="720px" height="480px" :src="detectUrl.faceUrl">
                            </Form>
                        </TabPane>
                        <TabPane label="车辆识别" name="车辆识别">

                            <Form :model="modalData.carDetect" :label-width="80">
                                <Button type="primary" style="margin-bottom: 20px" @click="showDetect('car')">功能演示
                                </Button>
                                <!--                                <img src="../../assets/720x480.png">-->
                                <img width="720px" height="480px" :src="detectUrl.carUrl">
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
                <Modal @on-ok="ok" v-model="showModal">
                    <ParkingDetector />
                </Modal>
            </div>
        </div>
    </div>
</template>


<script>
    import http from '@/config/http';
    import {axios} from "@/config/config";
    import ParkingDetector from "@/components/Configuration/ParkingDetector";

    export default {
        name: "global_config",
        components: {ParkingDetector},
        methods: {
            handleMessage(onoff) {
                console.log(onoff)
            },
            save(event) {
                console.log(event.target.value)
            },
            editDeviceConfig(index) {
                // this.showConfig = true;
                this.indexForm = index;
                this.rtspUrl = "rtsp://"
                if (this.deviceData[index].auth === 1) {
                    this.rtspUrl += this.deviceData[index].username + ":" + this.deviceData[index].password + "@";
                }
                this.rtspUrl += this.deviceData[index].url;
                this.showModal = true;
            },
            getDeviceMessage() {
                let url = this.selectAllRTSPUrl;
                this.$curl.post(url).then(res => {
                    if (res.code === 200) {
                        this.deviceData = res.data;
                    } else {
                        this.$Message.warning(res.msg);
                    }
                }, err => {
                    this.$Message.error(err)
                })
            },
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel() {
                this.detectUrl = {
                    carUrl: '',
                    faceUrl: ''
                };
                let url = this.stopRTSPUrl;
                let data = {
                    url: "rtsp://" + this.deviceData[this.indexForm].url
                };
                this.$curl.post(url, data).then(res => {
                    if (res.code === 200) {
                        // this.$Message.success(res.msg);
                    } else {
                        // this.$Message.warning(res.msg);
                    }
                }, err => {
                    this.$Message.error(err)
                });
                this.showConfig = false;
            },
            submit() {
                this.detectUrl = {
                    carUrl: '',
                    faceUrl: ''
                };
                this.showConfig = false;
                let url = this.updateRTSPConfigUrl;
                let data = {};
                alert(JSON.stringify(this.modalData))
                // this.$curl.post(url, data).then(res => {
                //
                // }, err => {
                //
                // })
            },
            showDetect(mode) {
                let url = axios.baseURL + "/camera/detect_box?url=" + "rtsp://" + this.deviceData[this.indexForm].url + "&mode=" + mode;
                this.detectUrl.carUrl = url;
            },
            gotoSeeDetect(index) {
                this.indexForm = index;
                this.rtspUrl = "rtsp://"
                if (this.deviceData[index].auth === 1) {
                    this.rtspUrl += this.deviceData[index].username + ":" + this.deviceData[index].password + "@";
                }
                this.rtspUrl += this.deviceData[index].url;
                this.$router.push({
                    path: '/Configuration/CarDetector',
                    name: '',
                    params: {
                        rtspUrl: '123',
                        name: '',
                    }
                })
            }
        },
        data() {
            return {
                showConfig: false,
                showModal: false,
                rtspUrl: '',
                value11: '',
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '生日',
                        key: 'birth'
                    },
                    {
                        title: '证件类型',
                        key: 'document_type'
                    },
                    {
                        title: '证件号',
                        key: 'certificate_number'
                    },
                    {
                        title: '所在人脸库',
                        key: 'from'
                    }
                ],
                data1: [
                    {}
                ],
                deviceHeader: [
                    {
                        type: 'selection',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 150,
                        align: 'center'
                    },
                    {
                        title: 'rtsp地址',
                        key: 'url',
                        width: 350,
                        align: 'center'
                    },
                    {
                        title: '设备状态',
                        key: 'enable',
                        width: 100
                    },
                    {
                        title: '操作',
                        slot: 'operation',
                        align: 'center'

                    }
                ],
                deviceData: [{}],
                modalData: {
                    activeName: 'face',
                    faceDetect: {},
                    carDetect: {},
                },
                indexForm: 0,
                detectUrl: {
                    carUrl: '',
                    faceUrl: ''
                }

            }
        },
        mixins: [http],
        created() {
            let url = this.selectAllRTSPUrl;
            this.$curl.post(url).then(res => {
                if (res.code === 200) {
                    this.deviceData = res.data;
                    this.deviceData.forEach(item => {
                        item.enable = item.enable === 1 ? "启用" : "禁用";
                    });
                } else {
                    this.$Message.warning(res.msg);
                }
            }, err => {
                this.$Message.error(err)
            })
        },
        destroyed() {
            this.cancel()
        }

    }
</script>

<style lang="less">

</style>
