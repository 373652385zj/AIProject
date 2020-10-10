<template>
    <div style="height: 100%;">
        <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="gotoUrl">
            <div class="layout-logo">
                <h2>智能分析盒子</h2>

            </div>
            <div class="layout-nav">
                <MenuItem name="/Realtime">
                    <Icon type="ios-paper"/>
                    实时监控
                </MenuItem>
                <MenuItem name="/Configuration">
                    <Icon type="ios-people"/>
                    智能配置
                </MenuItem>
                <MenuItem name="/Search">
                    <Icon type="ios-construct"/>
                    智能检索
                </MenuItem>
                <MenuItem name="/Resource">
                    <Icon type="ios-construct"/>
                    资源管理
                </MenuItem>
                <MenuItem name="/System">
                    <Icon type="ios-construct"/>
                    系统管理
                </MenuItem>
                <MenuItem name="/system_men">
                    <Icon type="ios-construct"/>
                    库管理
                </MenuItem>
            </div>
            <a style="color: #ffffff;float: right;margin-right: 30px" v-on:click="logout()">
                <Icon type="ios-exit-outline" />
                注销
            </a>
            <a style="color: #ffffff;float: right;margin-right: 30px;">
                <Icon  type="md-person" />
                admin
            </a>
        </Menu>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                theme1: 'dark'
            }
        },
        methods: {
            gotoUrl(name) {
                this.$router.push(name)
            },
            logout() {
                window.sessionStorage.clear();
                window.localStorage.clear();
                window.sessionStorage.setItem('loginErrorCode', '114');
                this.$router.push('/login');
            }
        }
    }

</script>

<style lang="less">


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
        height: 100%;
        display: inline-flex;
        border-top: 1px solid #c2c2c2;
        background: #f4f8ff;
    }

    .test3 {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .title2 {
        padding: 15px 0 15px 0;
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
        width: 100%;
    }

    .onoffswitch {
        position: relative;
        padding-bottom: 5px;
        width: 400px;
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
        /*background: #71b5e5;*/
        width: 100%;
        margin: 5px 0px 0px 18px;
        position: relative;
    }

    .father label {
        width: 200px;
        float: left;
        font-size: 15px;
        font-weight: bold;
    }

    .father form {
        float: left;
        font-size: 23px;
    }

    .word {
        /*position: relative;*/
        margin: 10px 0px 0px 0px;
    }

    .word label {
        font-weight: bold;
        font-size: 20px;
    }

    .hrLine {
        vertical-align: middle;
        display: inline-block;
        width: 80%;
    }

    .rightNav {
        width: 100%;
        height: 100%;
        display: inline-flex;

        .tab-nav {
            overflow: hidden;
            border-right: 1px solid #c2c2c2;
            list-style: none;
            width: 250px;
            height: auto;
        }
    }

    //点击后右箭头的反转效果
    .nav-n-box-active {
        #right-btn {
            transform: rotate(90deg) !important;
        }
    }
</style>
<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        /*width: 100px;*/
        height: 30px;
        /*background: #5b6270;*/
        border-radius: 3px;
        float: left;
        color: #ffffff;
        position: relative;
        /*top: 15px;*/
        left: 20px;
    }

    .layout-nav {
        width: 900px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>
