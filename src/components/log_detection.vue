<template>
    <div class="test3">
        <div class="title2">
            <h3>时间配置</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">
            <div class="personalReport_time">
                <input style="float:left;" type="date" :max="this.endTime" value="" v-model="startTime"/>
                <div style="float: left;font-size: 23px">至</div>
                <input style="float: left" type="date" :min="startTime" :max="this.maxTime" v-model="endTime"/>

                <button v-on:click="save" value="Lan2" style="float:left;margin-left: 30px;color: #ffffff;background-color: black;outline: red">业务日志</button>
                <button v-on:click="save" value="Lan2" style="float:left;margin-left: 30px;color: #ffffff;background-color: black;outline: red">系统日志</button>
                <button v-on:click="save" value="Lan2" style="float:left;margin-left: 30px;color: #ffffff;background-color: black;outline: red">异常日志</button>
                <button v-on:click="save" value="Lan2" style="float:left;margin-left: 30px;color: #ffffff;background-color: black;outline: red">操作日志</button>

                <button v-on:click="save" value="Lan2" style="margin-left: 30px;width:70px;color: white;background-color: dodgerblue;outline: red">查询</button>

            </div>

            <br>
            <div class="word">
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br><br>
                <br><br>
                <table border="1" class="lebt" cellspacing="0" cellpadding="10">
                    <div>
                        <tr>
                            <th style="width: 100px;padding: 10px">用户名</th>
                            <th style="width: 200px;padding: 10px">类型</th>
                            <th style="width: 500px;padding: 10px">操作</th>
                        </tr>
                        <tr align="center">
                            <td style="width: 100px;height: 200px" colspan="6">暂无数据</td>
                        </tr>
                    </div>
                </table>

                <br>
                <br>
                <br>
                <br>
                <br>
            </div>
            <button v-on:click="save" value="Lan2" style="margin-left: 700px;color: white;background-color: dodgerblue;outline: red">保存配置</button>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Person',
        data () {
            return {
                selected: '事件类型',
                options: [
                    {text: '事件类型', value: 'what', disabled: ''},
                    {text: '男', value: '1'},
                    {text: '女', value: '2'}
                ],
                other: [
                    {text: '关联人脸库', value: 'what', disabled: ''},
                    {text: '男', value: '1'},
                    {text: '女', value: '2'}
                ]
            }
        },
        inputFunc: function() {
            if (this.searchVal.trim()) {
                this.fuzzy_search(this.searchVal.trim())
            }
        },
        methods:{
            focus: function() {
                if (document.querySelector('input') === document.activeElement) {
                    this.fuzzy_search(this.searchVal.trim())
                }
            },
            fuzzy_search: function (value) {
                var that = this
                if (!value) {
                    that.fuzzy_list = []
                    return;
                }
            }
        },
        watch: {
            searchVal: function() {
                this.focus()
            }
        },
        Time:function(now)  {
            let year=new Date(now).getFullYear();
            let month=new Date(now).getMonth()+1;
            let date=new Date(now).getDate();
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            return  year+"-"+month+"-"+date
        },
        //本周第一天；
        showWeekFirstDay:function()
        {
            let Nowdate=new Date();
            let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
            let M=Number(WeekFirstDay.getMonth())+1;
            if(M<10){
                M="0"+M;
            }
            let D=WeekFirstDay.getDate();
            if(D<10){
                D="0"+D;
            }
            return WeekFirstDay.getFullYear()+"-"+M+"-"+D;
        },
        //本周最后一天
        showWeekLastDay:function ()
        {
            let Nowdate=new Date();
            let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
            let WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
            let M=Number(WeekLastDay.getMonth())+1;
            if(M<10){
                M="0"+M;
            }
            let D=WeekLastDay.getDate();
            if(D<10){
                D="0"+D;
            }
            return WeekLastDay.getFullYear()+"-"+M+"-"+D;
        },
        //获得某月的天数：
        getMonthDays:function (myMonth){
            let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
            let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
            let  days  =  (monthEndDate  -  monthStartDate)/(1000  *  60  *  60  *  24);
            return  days;
        },
//点击事件
        query:function (way) {
            // let self=this;
            this.$refs.pag.currentPage=1;
            this.page=this.$refs.pag.currentPage;
            switch (way){
                case 'today':
                    this.startTime=this.maxTime;
                    this.endTime=this.maxTime;
                    break;
                case 'yesterday':
                    this.startTime=this.Time(new Date().getTime()-24*60*60*1000);
                    this.endTime=this.Time(new Date().getTime()-24*60*60*1000);
                    break;
                case 'weeks':
                    this.startTime=this.showWeekFirstDay();
                    this.endTime=this.maxTime;
                    break;
                case 'lastWeek':
                    this.startTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-new Date().getDay()-6));
                    this.endTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+(6-new Date().getDay()-6)));
                    break;
                case 'month':
                    this.startTime=this.Time(new Date(new Date().getFullYear(), new Date().getMonth(),1));
                    this.endTime=this.maxTime;
                    break;
                case 'lastMonth':
                    this.startTime=this.Time(new Date(new Date().getFullYear(),new Date().getMonth()-1,1));
                    this.endTime=this.Time(new Date(new Date().getFullYear(),new Date().getMonth()-1,this.getMonthDays(new Date().getMonth()-1)));
                    break;
            }
            this.$axios({
                method:'post',
                url:'/inter/user/queryMemberReport',
                data:{
                    'account':this.account,
                    'baseLotteryId':this.lottersId,
                    'startTime':this.startTime,
                    'endTime':this.endTime
                }
            }).then(function (data) {
                console.log(data)
            }).catch(function (error) {
                console.log(error);
            })
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
        width:200px;
    }
    .father form{
        float:left;
        font-size: 23px;
    }
    .father input{
        width: 250px;
    }


    .word {
        position: relative;
    }
    .word label{
        font-weight: 900;
        font-size: 30px;
    }


    .lebt {
        left: 0px;

    }
</style>
