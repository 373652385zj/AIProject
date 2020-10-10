<template>
    <div class="test3">
        <div class="title2">
            <h3>基础网络</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">

            <!----------------------------------------页面内部--------------------------------------------->
            <div class="word">
                <!--                    <hr class="hrLine"/>-->
                <Divider orientation="left" style="font-weight: bold">▷ LAN1</Divider>
            </div>

            <div class="father">
                <label>IP地址</label>
                <ve-ip width="220" @status="isIP" format="ipv4" v-model="ip"></ve-ip>
                <br>
                <br>

                <label>子网掩码</label>
                <ve-subnet width="220" @status="isNetmask" v-model="netmask"></ve-subnet>
                <br>
                <br>

                <label>网关</label>
                <ve-ip width="220" format="ipv4" @status="isGateway" :message="'请输入正确的网关'" v-model="gateway"></ve-ip>
                <br>
                <br>


                <Button type="primary" style="margin-left: 500px;" @click="checkTheIP()">保存配置</Button>

            </div>

            <div class="word">
                <Divider orientation="left" style="font-weight: bold">▷ 其他</Divider>
            </div>
            <div class="father">
                <label>首选DNS</label>
                <ve-ip width="200" format="ipv4" :message="'请输入正确的DNS地址'" v-model="DNS"></ve-ip>
                <br>
                <br>

                <label>备选DNS</label>
                <ve-ip width="200" format="ipv4" :message="'请输入正确的DNS地址'" v-model="DNS2"></ve-ip>
                <br>
                <br>

                <label>HTTPS</label>
                <Input v-model="HTTPS" placeholder="Enter something..." style="margin-right: 50px;width: 250px"/>
                <br>
                <br>

                <Button type="primary" style="margin-left: 500px;">保存配置</Button>

            </div>
        </div>
    </div>
</template>

<script>

    import http from "@/config/http";

    export default {
        name: "BaseSetting",
        data() {
            return {
                ip: [],
                netmask: [],
                gateway: [],
                DNS: [],
                DNS2: [],
                HTTPS: '',
                isIpTrue: true,
                isGatewayTrue: true,
                isNetmaskTrue: true
            }
        },
        methods: {
            save(event) {
                console.log(event.target.value)
            },
            handleError(value) {
                this.$Message.error(value)
            },
            getIP() {
                let url = this.getIPUrl;
                this.$curl.post(url).then(res => {
                    if (res.code === 200) {
                        this.netmask = [];
                        this.gateway = [];
                        this.ip = [];
                        res.data.NETMASK.split('.').forEach(item => {
                            this.netmask.push(+item)
                        });
                        if (res.data.GATEWAY) {
                            res.data.GATEWAY.split('.').forEach(item => {
                                this.gateway.push(+item)
                            });
                        }
                        res.data.IP.split('.').forEach(item => {
                            this.ip.push(+item)
                        });
                    } else {
                        this.$Message.warning(res.msg)
                    }
                }, err => {
                    this.$Message.error(err)
                })
            },
            isIP(status) {
                this.isIpTrue = !status;
            },
            isGateway(status) {
                this.isGatewayTrue = !status;
            },
            isNetmask(status) {
                this.isNetmaskTrue = status;
            },
            checkTheIP() {
                if (this.isGatewayTrue && this.isNetmaskTrue && this.isIpTrue) {
                    let flag = true;
                    for (let i = 0; i < 3; i++) {
                        if (this.ip[i] != this.gateway[i]) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        this.sumbitGeditIP(this.ip, this.gateway, this.netmask);
                    } else {
                        this.$Modal.warning({
                            title: "警告",
                            content: "ip与子网掩码不在同一网段，这可能将导致开发板系统无法上网，是否继续",
                            okText: "是",
                            cancelText: "否",
                            onOk: this.sumbitGeditIP(this.ip, this.gateway, this.netmask)
                        })
                    }
                } else {
                    this.$Message.error("保存配置失败，请检查IP，网关，子网掩码是否正确")
                }
            },
            sumbitGeditIP(ip, gateway, netmask) {
                let url = this.geditIPUrl;
                let data = {
                    ip: ip[0].toString() + '.' + ip[1].toString() + '.' + ip[2].toString() + '.' + ip[3].toString(),
                    gateway: gateway[0].toString() + '.' + gateway[1].toString() + '.' + gateway[2].toString() + '.' + gateway[3].toString(),
                    netmask: netmask[0].toString() + '.' + netmask[1].toString() + '.' + netmask[2].toString() + '.' + netmask[3].toString()
                };
                this.$curl.post(url, data).then(res => {
                    if (res.code === 200) {
                        this.getIP();
                        this.$Message.success(res.msg);
                    } else {
                        this.$Message.warning(res.msg);
                    }
                }, err => {
                    this.$Message.error(err);
                })
            }
        },
        created() {
            let url = this.getIPUrl;
            this.$curl.post(url).then(res => {
                if (res.code == 200) {
                    this.netmask = [];
                    this.gateway = [];
                    this.ip = [];
                    res.data.NETMASK.split('.').forEach(item => {
                        this.netmask.push(+item)
                    });
                    if (res.data.GATEWAY) {
                        res.data.GATEWAY.split('.').forEach(item => {
                            this.gateway.push(+item)
                        });
                    }
                    res.data.IP.split('.').forEach(item => {
                        this.ip.push(+item)
                    });
                } else {
                    this.$Message.warning(res.msg)
                }
            }, err => {
                this.$Message.error(err)
            })
        },
        mixins: [http]
    }
</script>

<style>
    .input-ip ul li input {
        color: #000000;
        width: 80% !important;
        font-size: 16px;
    }

    .input-subnet ul li input {
        color: #000000;
        width: 80% !important;
        font-size: 16px;
    }
</style>
