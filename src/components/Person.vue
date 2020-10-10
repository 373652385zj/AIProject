<template>
    <div>
        <input style="width: 277px" type="text" id="cardsNum2" v-model="searchVal"  value="1" v-on:focus="focus()">
        <br>
        <br>
        <div class="personalReport_time">
            <input style="float:left;" type="date" :max="this.endTime" value="" v-model="startTime"/>
            <div></div>
            <input type="date" :min="startTime" :max="this.maxTime" v-model="endTime"/>
            <button @click="query" class="but">查询</button>
        </div>

        <div>
            <select v-model='selected'>
                <option v-for="(option,index) in options" v-bind:value="option.value" :disabled="option.disabled" :key="index">
                    {{ option.text }}{{index}}{{option.disabled}}
                </option>
            </select>
        </div>
        <div>
            <select v-model='selected'>
                <option v-for="(option,index) in other" v-bind:value="option.value" :disabled="option.disabled" :key="index">
                    {{ option.text }}{{index}}{{option.disabled}}
                </option>
            </select>
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
