<template>
    <div class="rightNav">
        <ul class="tab-nav">
            <h3 style="padding:5px 0 5px 10px;border-bottom:1px solid #c2c2c2;">设备管理树</h3>
        </ul>
        <div class="test3">
                <h3 style="padding:5px 0 5px 10px;">按车牌检索</h3>
                <div style="display: flex;flex-direction: row;border-top:1px solid #c2c2c2;">
                    <div style="width: 80%;margin:10px 0 0 10px">
                        <div>
                            <Input v-model="value" placeholder="请输入车牌号" style="margin-right: 50px;width: 250px;float: left" />

                            <div class="personalReport_time" style="float: left">
                                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time(Excluding seconds)" style="float:left;width: 200px"></DatePicker>
                                <div style="float: left;font-size: 23px;margin: 0 5px 0 5px">至</div>
                                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time(Excluding seconds)" style="float:left;width: 200px"></DatePicker>
                            </div>

                            <br>
                            <br>
                            <Checkbox v-model="single">全选</Checkbox>
                            <Button type="primary" style="margin-left: 30px;" icon="ios-cloud-download-outline">下载</Button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vihicle"
    }
</script>
