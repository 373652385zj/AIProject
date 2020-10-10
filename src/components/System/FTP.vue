<template>
    <div class="test3">
        <div class="title2">
            <h3>FTP</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">

            <br>
            <div class="father">
                <label>FTP</label>
                <i-switch size="large">
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </i-switch>
                <br>
                <br>
                <label>地址</label>
                <Input v-model="value"  style="margin-right: 50px;width: 250px"/>
                <br>
                <br>
                <label>端口</label>
                <Input v-model="value" style="margin-right: 50px;width: 250px"/>
                <br>
                <br>
                <label>用户名</label>
                <Input v-model="value"  style="margin-right: 50px;width: 250px"/>
                <br>
                <br>
                <label>密码</label>
                <Input v-model="value"  style="margin-right: 50px;width: 250px"/>
                <br>
                <br>
                <label>目录结构</label>
                <Input v-model="value"  style="margin-right: 50px;width: 250px"/>

                <br>
                <br>

                <label>图片归档间隔</label>
                <Input v-model="value" style="margin-right: 50px;width: 250px"/>

                <br>
                <br>
                <label>图片名前缀</label>
                <Input v-model="value"  style="margin-right: 50px;width: 250px"/>
                <br>
                <br>
                <label>内容详细等级</label>
                <RadioGroup v-model="phone">
                    <Radio label="apple"  style="width: 100px">
                        <span>背景图</span>
                    </Radio>
                    <Radio label="android" style="width: 100px">
                        <span>人脸图</span>
                    </Radio>
                    <Radio label="windows" style="width: 100px">
                        <span>背脸图</span>
                    </Radio>
                    <Radio label="window" style="width: 100px">
                        <span>人形图</span>
                    </Radio>
                </RadioGroup>

                <br>
                <br>
                <Button type="primary" style="margin-left: 200px;">推送测试</Button>
                <Button type="primary" style="margin-left: 30px;">保存配置</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FTP",
        methods: {
            handleMessage(onoff) {
                console.log(onoff)
            },
            save(event) {
                console.log(event.target.value)
            }
        }
    }
</script>
