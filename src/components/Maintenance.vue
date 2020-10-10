<template>
    <div class="test3">
        <div class="title2">
            <h3>设备维护</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">
            <div class="father">
                <label style="float: left">重启设备</label>
                <br>
                <br>
                <p style="width: 200px;">重启设备</p>
                <p>重启时所有业务会重启</p>
            </div>
            <br>
            <br>
            <br>
            <br>
            <div class="father">
                <p style="width: 200px">自动重启</p>
            </div>
            <br>
            <div class="onoffswitch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">
                <label class="onoffswitch-label" for="myonoffswitch">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
            </div>
            <br>
            <br>
            <br>
            <div class="father">
                <p>星期</p>
                <br>
                <form>
                    <select name="cars">
                        <option value="周一" selected="selected">周一</option>
                        <option value="周二" selected="selected">周二</option>
                        <option value="周三" selected="selected">周三</option>
                        <option value="周四" selected="selected">周四</option>
                        <option value="周五" selected="selected">周五</option>
                        <option value="周六" selected="selected">周六</option>
                        <option value="周日" selected="selected">周日</option>
                    </select>
                </form>
            </div>
            <br>
            <br>
            <br>
            <div class="father">
                <p>时间</p>
                <br>
                <input>
                <div id="home">

                    <span class="deadline" style="font-size: 18px">当前时间是：{{gettime}}</span>

                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
            <div class="father">
                <label>恢复出厂设置</label>
            </div><br>
            <br>

            <div class="father">
                <p style="width: 200px">完全恢复出厂设置</p>
                <p style="width: 500px">所有设置均恢复、ip地址也恢复、可能会连接不上设备</p>
                <br>
                <button style="margin-left: 93px;color: white;background-color: dodgerblue;outline: red">重启</button>
            </div>
            <br>

            <div class="father">
                <p style="width: 200px">部分恢复出厂设置</p>
                <p style="width: 500px">设备网络信息、用户名、密码、设备名称不恢复</p>
                <br>
                <button style="margin-left: 93px;color: white;background-color: dodgerblue;outline: red">重启</button>
            </div>
            <br>
            <br>
            <br>


            <div class="father">
                <label>升级</label>
            </div>
            <br>
            <br>
            <br>

            <div class="father">
                <p style="width: 200px">软件版本</p>
                <p>1.0</p>
            </div>
            <br>
            <br>
            <br>
            <br>
            <div class="father">
                <p style="width: 200px">系统版本</p>
                <p style="width: 500px">1.0</p>
            </div>

            <br>
            <br>
            <br>
            <br>


            <div class="father">
                <p style="width: 200px">算法版本</p>
                <p>2020.08.14</p>
            </div>

            <div class="father">
                <p style="width: 200px">选择升级文件</p>
                <br>

            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                gettime: '',//当前时间
            }

        },
        mounted()
        {
            this.created()
        },
        methods: {

            getTime:function () {
                var _this = this;
                let yy = new Date().getFullYear();
                var mm = new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
                var dd = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours();
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
            },
            currentTime()
            {
                setInterval(this.getTime, 500)
            },
            created()
            {
                this.currentTime();
            },
        }
    }
</script>

<style>

    .test1 {

        margin: 10px;
    }

    .test1 {
        /*border:1px solid #dcdbda;*/
        font-size: 20px;
    }

    .test1 .title {
        height: 25px;
        line-height: 25px;
    }

    .test1 .title h2 {
        float: left;
        width: 30%;
        margin: 0 0 0 10px;
        color: #090808;
    }

    .test1 .title a {
        margin-left: 10px;
        padding-bottom: 4px;
        color: #1f7ce2;
        text-decoration: none;
    }

    .test1 .title a:hover {
        border-bottom: 2px solid #1f7ce2;
        font-weight: bold;
    }

    .test1 .title .menu-list {
        padding: 0 20px;
    }

    .clear {
        clear: both;
    }


    <!--
    body {
        padding: 0;
        font: 12px "宋体";
    }

    .menus {
        /*margin-top: 20px;*/
        padding-left: 5px;
        padding-top: 20px;
        width: 12%;
        overflow: hidden;
        border-right: 1px solid #c2c2c2;
    }

    .menu {
        overflow: hidden;
        height: 0px;
        transition: all 0.3s ease;
    }

    .menu_title {
        width: 305px;
        height: 50px;
        line-height: 50px;
        color: #212020;
        font-size: 18px;
        padding-left: 15px;
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        font-weight: bold;
        overflow: hidden;
    }

    .menu_title:hover {
        background: #dedede;
        color: black;
    }

    .indicator {
        width: 50px;
        height: 50px;
        font-weight: bold;
        position: absolute;
        right: 0px;
        top: 0px;
        transition: all 0.3s ease;
        font-weight: bold;
        text-align: center;
    }

    .item {
        width: 290px;
        height: 40px;
        line-height: 40px;
        /*background: #b0dbfc;*/
        /*color: #adadad;*/
        padding-left: 30px;
        transition: all 0.3s ease;
        cursor: pointer;
        overflow: hidden;
    }

    .item:hover {
        font-weight: bold;
    }

    .item a {
        width: 290px;
        height: 40px;
        display: block;
        text-decoration: none;
        color: #535353;
    }

    .item_divider {
        width: 322px;
        height: 1px;
        background: white;
        display: block;
        opacity: 0.8;
    }

    .menu_divider {
        width: 100%;
        height: 1px;
        background: gray;
    }

    .test2 {
        width: 100%;
        display: inline-flex;
        border-top: 1px solid #c2c2c2;
        background: #f4f8ff;
    }

    .test3 {
        width: 88%;
        display: flex;
        flex-direction: column;
    }

    .title2 {
        margin: 0px 0px 0px 10px;
        font-size: 16px;
        /*font-weight: bold;*/
    }

    .aline {
        border-bottom: 1px solid #c2c2c2;
    }

    .cont1 {
        background: #ffffff;
        height: 100%;
    }

    .onoffswitch {
        position: relative;
        width: 440px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }

    .onoffswitch-checkbox {
        display: none;
    }

    .onoffswitch-label {
        display: block;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid #E3E3E3;
        border-radius: 36px;
    }

    .onoffswitch-inner {
        display: block;
        width: 200%;
        margin-left: -100%;
        transition: margin 0.3s ease-in 0s;
    }

    .onoffswitch-inner:before,
    .onoffswitch-inner:after {
        display: block;
        float: left;
        width: 50%;
        height: 18px;
        padding: 0;
        line-height: 18px;
        font-size: 10px;
        color: white;
        font-family: Trebuchet, Arial, sans-serif;
        font-weight: bold;
        box-sizing: border-box;
    }

    .onoffswitch-inner:before {
        content: "on";
        padding-left: 10px;
        background-color: green;
        color: #27A1CA;
        text-align: left;
    }

    .onoffswitch-inner:after {
        content: "off";
        padding-right: 10px;
        background-color: white;
        color: #666666;
        text-align: right;
    }

    .onoffswitch-switch {
        display: none;
        width: 18px;
        margin: 0px;
        background: #A1A1A1;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 35px;
        border: 2px solid #E3E3E3;
        border-radius: 36px;
        transition: all 0.3s ease-in 0s;
    }

    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
        margin-left: 0;
    }

    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
        right: 0px;
        background-color: #27A1CA;
    }

    .onoffswitch label {
        float: left;
        font-size: 23px;
    }

    .onoffswitch div {
        float: left;
        font-size: 23px;
    }

    .onoffswitch p {
        float: left;
        font-size: 18px;
    }


    .father {
        position: relative;
    }

    .father label {
        float: left;
        font-size: 23px;
        width: 200px;
    }

    .father form {
        float: left;
        font-size: 23px;
    }

    .father input {
        width: 250px;
        float: left;
    }

    .father p {
        float: left;
        font-size: 18px;
        width: 200px;
    }


    .word {
        position: relative;
    }

    .word label {
        font-weight: 900;
        font-size: 30px;
    }


    .lebt {
        position: absolute;
        left: 200px;
        bottom: 0px;
    }
</style>
