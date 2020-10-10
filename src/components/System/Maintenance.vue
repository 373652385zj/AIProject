<template>
    <div class="test3">
        <div class="title2">
            <h3>设备维护</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">
            <div class="father">
                <Divider orientation="left" style="font-weight: bold">▷ 重启设备</Divider>
                <label style="font-weight: normal">重启设备</label>

                <label style="font-weight: normal">
                    <Icon type="ios-alert-outline"/>
                    重启时所有业务会重启</label>
                <br>
                <br>
                <label style="font-weight: normal">自动重启</label>
                <i-switch size="large">
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </i-switch>
                <br>
                <br>
                <label style="font-weight: normal">星期</label>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <br>
                <br>
                <label style="font-weight: normal">时间</label>
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm"
                            placeholder="Select date and time(Excluding seconds)" style="width: 200px"></DatePicker>

                <br>
                <br>
                <p class="deadline" style="margin-left: 200px">当前时间是：{{gettime}}</p>
                <br>

                <Divider orientation="left" style="font-weight: bold">▷ 恢复出厂设置</Divider>

                <label style="font-weight: normal">完全恢复出厂设置</label>
                <label style="font-weight: normal;width: auto">
                    <Icon type="ios-alert-outline"/>
                    所有设置均恢复、ip地址也恢复、可能会连接不上设备
                </label>
                <Button type="primary" style="float:right;margin-right: 200px;">完全恢复</Button>
                <br>
                <br>

                <label style="font-weight: normal">部分恢复出厂设置</label>
                <label style="font-weight: normal;width: auto">
                    <Icon type="ios-alert-outline"/>
                    设备网络信息、用户名、密码、设备名称不恢复
                </label>
                <Button type="primary" style="float:right;margin-right: 200px;">部分恢复</Button>
                <br>
                <br>

                <Divider orientation="left" style="font-weight: bold">▷ 升级</Divider>
                <br>
                <br>
                <label style="font-weight: normal">软件版本</label>
                <label style="font-weight: normal">1.0.0.2020022101</label>
                <br>
                <br>
                <label style="font-weight: normal">系统版本</label>
                <label style="font-weight: normal">u018.k011.r043.a262</label>
                <br>
                <br>
                <label style="font-weight: normal">算法版本</label>
                <label style="font-weight: normal">2020.08.14</label>
                <br>
                <br>
                <label style="font-weight: normal">选择升级文件</label>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择升级文件</Button>
                </Upload>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                cityList: [
                    {
                        value: '周日',
                        label: 'Sunday'
                    },
                    {
                        value: '周六',
                        label: 'Saturday'
                    },
                    {
                        value: '周五',
                        label: 'Friday'
                    },
                    {
                        value: '周四',
                        label: 'Thursday'
                    },
                    {
                        value: '周三',
                        label: 'Wednesday'
                    },
                    {
                        value: '周二',
                        label: 'Tuesday'
                    },
                    {
                        value: '周一',
                        label: 'Monday'
                    }
                ],
                model1: '',
                gettime: ''
            }
        },
        mounted() {
            this.created()
        },
        methods: {
            handleMessage(onoff) {
                console.log(onoff)
            },
            save(event) {
                console.log(event.target.value)
            },
            getTime: function () {
                var _this = this;
                let yy = new Date().getFullYear();
                var mm = new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
                var dd = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours();
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
            },
            currentTime() {
                setInterval(this.getTime, 500)
            },
            created() {
                this.currentTime();
            },
        }
    }
</script>

<style>

</style>
