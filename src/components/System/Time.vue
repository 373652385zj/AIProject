<template>
    <div class="test3">
        <div class="title2">
            <h3>时间配置</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">

            <div class="word">
                <Divider orientation="left" style="font-weight: bold">▷ 时区设置</Divider>
            </div>

            <div class="father">
                <label> 时区 </label>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="word">
                <Divider orientation="left" style="font-weight: bold">▷ 手动校时</Divider>
            </div>
            <div class="father">
                <label>设备时间</label>
                <DatePicker type="datetime" placeholder="Select date and time" style="width: 250px"></DatePicker>

                <br>
                <br>

                <label>选择时间</label>
                <DatePicker type="datetime" placeholder="Select date and time" style="width: 250px"></DatePicker>

                <br>
                <br>

                <label>本机时间</label>
                <DatePicker type="datetime" placeholder="Select date and time" style="width: 250px"></DatePicker>
            </div>

            <div class="word">
                <Divider orientation="left" style="font-weight: bold">▷ NTP校时</Divider>
            </div>

            <div class="father">
                <label>NTP校时</label>
            </div>

            <i-switch size="large" >
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
            </i-switch>
            <br>
            <br>
            <div class="father">
                <label>服务器地址</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

                <br>
                <br>

                <label>同步周期</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />


            </div>
            <br>
            <Button type="primary" style="margin-left: 390px;">保存配置</Button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseSetting",
        methods: {
            handleMessage(onoff) {
                console.log(onoff)
            },
            save(event) {
                console.log(event.target.value)
            }
        },
        data () {
            return {
                cityList: [
                    {
                        value: '北京时间（UTC+08:00）',
                        label: '北京时间（UTC+08:00）'
                    },
                    {
                        value: '日本时间（JSC+09:00）',
                        label: '日本时间（JSC+09:00）'
                    },
                    {
                        value: '香港时间（HKT+08:00）',
                        label: '香港时间（HKT+08:00）'
                    },
                    {
                        value: '北美东部时间（EST-05:00）',
                        label: '北美东部时间（EST-05:00）'
                    }
                ],
                model1: ''
            }
        }
    }
</script>
<style>

</style>
