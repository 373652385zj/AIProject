<template>
    <div class="rightNav">
        <ul class="tab-nav">
            <h3>设备管理树</h3>
        </ul>
        <div class="test3">
            <div class="title2">
                <h3>设备管理</h3>
                <div style="display: flex;flex-direction: row;border-top:1px solid #c2c2c2 ">
                    <div style="width: 80%;border-right: 1px solid #c2c2c2">
                        <div></div>
                    </div>
                    <div style="height: 400px">
                        <h5>最新识别</h5>
                    </div>
                </div>
            </div>
            <div>
                <ul class="rightNav" style="height: 100px">最新抓拍</ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "equipment_mana"
    }
</script>

<style lang="less">
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
    .rightNav {
        width: 100%;
        height: auto;
        /*display: inline-flex;*/
        border-top: 1px solid #c2c2c2;
        background: #f4f8ff;

        .tab-nav {
            overflow: hidden;
            border-right: 1px solid #c2c2c2;
            list-style: none;
            width: 20%;
            height: auto;
        }
    }
    //点击后右箭头的反转效果

</style>
