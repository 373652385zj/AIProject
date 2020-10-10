<template>
    <div class="test3">
        <div class="title2">
            <h3>PDNS</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">

            <div class="father">
                <br>
                <label style="width: 200px">PDNS</label>
<!--            </div>-->

            <i-switch size="large" >
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
            </i-switch>
            <br>
            <br>
<!--            <div class="father">-->

                <label>序列号</label>
                <p >230b3f3c_29bab7dd</p>
                <br>

                <label>地址</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />
                <br>
                <br>

                <label>端口</label>
                <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

                <br>
                <br>
                <label>连接状态</label>
                <p >未连接</p>


                <br>
                <br>
                <Button type="primary" style="margin-left: 393px;">保存</Button>

            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "PDNS",
        data() {
            return {
                gettime: '',//当前时间
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

