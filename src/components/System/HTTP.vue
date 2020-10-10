<template>
    <div class="test3">
        <div class="title2">
            <h3>HTTP</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">

            <!----------------------------------------页面内部--------------------------------------------->
            <div class="father">
                <br>
                <label>主服务器优先</label>
                <i-switch size="large">
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </i-switch>
                <br>
                <br>
                <label>服务器地址</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px"/>

                <br>
                <br>

                <label>备选服务器</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px"/>

                <br>
                <br>

                <label>端口</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px"/>

                <br>
                <br>

                <label>ss连接</label>

                <i-switch size="large">
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </i-switch>
                <br>
                <br>
                <label>验证方式</label>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <br>
                <br>

                <label>ss端口</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px"/>

                <br>
                <br>

                <label>超过时间(s)</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px"/>

                <br>
                <br>

                <label>ss连接</label>

                <i-switch size="large">
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </i-switch>
                <br>
                <br>
                <label>重发次数</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px"/>

                <br>
                <br>
                <Button type="primary" style="margin-left: 360px;">保存配置</Button>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HTTP",
        methods: {
            handleMessage(onoff) {
                console.log(onoff)
            },
            save(event) {
                console.log(event.target.value)
            }
        },
        data() {
            return {
                single: false,
                cityList: [
                    {
                        value: 'avi',
                        label: '.avi'
                    },
                    {
                        value: 'rmvb',
                        label: '.rmvb'
                    },
                    {
                        value: 'mpg',
                        label: '.mpg'
                    },
                    {
                        value: 'mov',
                        label: '.mov'
                    }
                ],
                model1: '',
                cityList1: [
                    {
                        value: '5',
                        label: '5分钟'
                    },
                    {
                        value: '10',
                        label: '10分钟'
                    },
                    {
                        value: '15',
                        label: '15分钟'
                    },
                    {
                        value: '20',
                        label: '20分钟'
                    }
                ],
                model2: ''
            }
        }
    }
</script>


