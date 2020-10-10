<template>
    <div class="test3">
        <div class="title2">
            <h3>时间配置</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">

            <div class="word">
                <label>时区设置</label>
            </div>
            <br>
            <br>

            <div class="father">
                <label> 时区 </label>
                <form>
                    <select name="cars">
                        <option value="北京时间（UTC+08:00）" selected="selected">北京时间（UTC+08:00）</option>
                        <option value="日本时间（JSC+09:00）">日本时间（JSC+09:00）</option>
                        <option value="香港时间（HKT+08:00）">香港时间（HKT+08:00）</option>
                        <option value="北美东部时间（EST-05:00）">北美东部时间（EST-05:00）</option>
                    </select>
                </form>
            </div>
            <br>
            <br>
            <div class="word">
                <label>手动校时</label>
            </div>
            <div class="father">
                <label>设备时间</label>
                <input>

                <br>
                <br>

                <label>选择时间</label>
                <input>

                <br>
                <br>

                <label>本机时间</label>
                <input>
            </div>

            <br>
            <br>
            <div class="word">
                <label>手动校时</label>
            </div>

            <div class="father">
                <label>NTP校时</label>
            </div>

            <div class="onoffswitch">

                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">

                <toggleChange style="float: left" @change="handleMessage"></toggleChange>
            </div>
            <br>
            <br>
            <br>
            <div class="father">
                <label>服务器地址</label>
                <input>

                <br>
                <br>

                <label>同步周期</label>
                <input>


            </div>
        </div>
    </div>
</template>

<script>
    import toggleChange from "@/components/toggleChange";

    export default {
        name: "BaseSetting",
        components: {
            toggleChange
        },
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
        margin:0px 0px 0px 10px;
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
        width: 220px;
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

    .onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-inner {
        margin-left: 0;
    }

    .onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-switch {
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

    .father{
        position: relative;
    }
    .father label{
        float:left;
        font-size: 23px;
    }
    .father form{
        float:left;
        font-size: 23px;
    }

    .word {
        position: relative;
    }
    .word label{
        font-weight: 900;
        font-size: 30px;
    }
</style>
