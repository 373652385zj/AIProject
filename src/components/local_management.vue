<template>
    <div class="test3">
        <div class="title2">
            <h3>本地配置</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">
            <div class="word">
                <label>抓图存储</label>
            </div>
            <div class="father">
                <p> 抓图文件保存路径 </p>
                <br>
                <br>
            </div>
            <input type=button value=选择路径
                   onclick='javascript: alert(new ActiveXObject("Shell.Application").BrowseForFolder(0, "请选择路径", 0, "").Items().Item().Path)'>


            <br>
            <br>
            <br>
            <br>
            <div class="word">
                <label>录像与视频配置</label>
            </div>
            <div class="father">
                <label style="width: 200px">录像文件格式</label>

            </div>
            <form>
                <select name="cars">
                    <option value=".avi" selected="selected">avi</option>
                    <option value=".mp4">mp4</option>
                    <option value=".mov">.mov</option>
                    <option value=".rmvb">.rmvb</option>
                </select>
            </form>
            <br>
            <br>
            <div class="father">
                <label style="width: 200px">录像文件打包时长</label>
            </div>
            <form>
                <select name="cars">
                    <option value="10分钟" selected="selected">10分钟</option>
                    <option value="15分钟">15分钟</option>
                    <option value="20分钟">20分种</option>
                    <option value="30分钟">30分钟</option>
                </select>
            </form>

            <div class="father">
                <p>录像文件保存路径</p>
            </div>
            <br>
            <br>
            <input type=button value=选择路径
                   onclick='javascript: alert(new ActiveXObject("Shell.Application").BrowseForFolder(0, "请选择路径", 0, "").Items().Item().Path)'>
            <br>
            <br>
            <div class="father">
                <p style="width: 200px"> 是否绘制检测框</p>
            </div>
            <br>
            <br>
            <input type="checkbox" name="Bike">
            <br>
            <br>
            <br>
            <div class="father">
                <p style="width: 200px">是否绘制背脸</p>
            </div>
            <br>
            <p>
                <input type="checkbox" name="Car">
                <br>
            </p>
            <br>
            <br>
            <div class="father">
                <p>是否绘制人脸</p>
            </div>
            <br>
            <p>
                <input type="checkbox" name="peo">
            </p>
        </div>
    </div>

</template>

<script>
    export default {
        name: "local_management"
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

    .father {
        position: relative;
    }

    .father label {
        float: left;
        font-size: 23px;
    }

    .father form {
        float: left;
        font-size: 23px;
    }

    .father p {
        float: left;
        font-size: 23px;
        width: 200px;
    }

    .word {
        position: relative;
    }

    .word label {
        font-weight: 900;
        font-size: 30px;
    }
</style>
