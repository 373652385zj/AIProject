<template>
    <div class="test3">
        <div class="title2">
            <h3>日志检测</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">

            <div class="father">
                <div class="personalReport_time" >
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time"
                                style="float:left;width: 200px;margin: 10px 0 0 10px;"></DatePicker>
                    <div style="float: left;font-size: 15px;margin: 13px 5px 0 5px">至</div>
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time"
                                style="float:left;width: 200px;margin: 10px 0 0 0px;"></DatePicker>
<!--                    <br>-->
<!--                    <br>-->
<!--                    <br>-->
                    <Button style="background-color: #212020;color: #f4f8ff;padding:0 3px; margin:10px 0 0 5px;">业务日志</Button>
                    <Button style="background-color: #212020;color: #f4f8ff;padding:0 3px; margin:10px 0 0 5px;">系统日志</Button>
                    <Button style="background-color: #212020;color: #f4f8ff;padding:0 3px; margin:10px 0 0 5px;">异常日志</Button>
                    <Button style="background-color: #212020;color: #f4f8ff;padding:0 3px; margin:10px 0 0 5px;">操作日志</Button>

                    <Button type="primary" style="padding:0 2px; margin:10px 0 0 10px;width: 80px;" icon="ios-search">查询</Button>
                </div>
                <br>
                <Table border :columns="columns1" :data="data1" style="margin: 10px;width: 800px;height: 500px"></Table>
                <br>
                <Button type="primary" style="margin-left: 700px;" icon="ios-undo">导出日志</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'log_detection',
        data() {
            return {
                value11: '',
                columns1: [
                    {
                        title: '时间',
                        key: 'time',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '日志类型',
                        key: 'log_type',
                        resizable: true,
                        // width: 180
                    },
                    {
                        title: '日志内容',
                        key: 'log_content',
                    }
                ],
                data1: [
                    {}
                ]
            }
        },
        inputFunc: function () {
            if (this.searchVal.trim()) {
                this.fuzzy_search(this.searchVal.trim())
            }
        },
        methods: {
            focus: function () {
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
            searchVal: function () {
                this.focus()
            }
        },
        Time: function (now) {
            let year = new Date(now).getFullYear();
            let month = new Date(now).getMonth() + 1;
            let date = new Date(now).getDate();
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            return year + "-" + month + "-" + date
        },
        //本周第一天；
        showWeekFirstDay: function () {
            let Nowdate = new Date();
            let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            let M = Number(WeekFirstDay.getMonth()) + 1;
            if (M < 10) {
                M = "0" + M;
            }
            let D = WeekFirstDay.getDate();
            if (D < 10) {
                D = "0" + D;
            }
            return WeekFirstDay.getFullYear() + "-" + M + "-" + D;
        },
        //本周最后一天
        showWeekLastDay: function () {
            let Nowdate = new Date();
            let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
            let M = Number(WeekLastDay.getMonth()) + 1;
            if (M < 10) {
                M = "0" + M;
            }
            let D = WeekLastDay.getDate();
            if (D < 10) {
                D = "0" + D;
            }
            return WeekLastDay.getFullYear() + "-" + M + "-" + D;
        },
        //获得某月的天数：
        getMonthDays: function (myMonth) {
            let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
            let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
            let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },
//点击事件
        query: function (way) {
            // let self=this;
            this.$refs.pag.currentPage = 1;
            this.page = this.$refs.pag.currentPage;
            switch (way) {
                case 'today':
                    this.startTime = this.maxTime;
                    this.endTime = this.maxTime;
                    break;
                case 'yesterday':
                    this.startTime = this.Time(new Date().getTime() - 24 * 60 * 60 * 1000);
                    this.endTime = this.Time(new Date().getTime() - 24 * 60 * 60 * 1000);
                    break;
                case 'weeks':
                    this.startTime = this.showWeekFirstDay();
                    this.endTime = this.maxTime;
                    break;
                case 'lastWeek':
                    this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay() - 6));
                    this.endTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay() - 6)));
                    break;
                case 'month':
                    this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
                    this.endTime = this.maxTime;
                    break;
                case 'lastMonth':
                    this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1));
                    this.endTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth() - 1, this.getMonthDays(new Date().getMonth() - 1)));
                    break;
            }
            this.$axios({
                method: 'post',
                url: '/inter/user/queryMemberReport',
                data: {
                    'account': this.account,
                    'baseLotteryId': this.lottersId,
                    'startTime': this.startTime,
                    'endTime': this.endTime
                }
            }).then(function (data) {
                console.log(data)
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
</script>

