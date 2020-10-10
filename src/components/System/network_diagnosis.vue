<template>
    <div class="test3">
        <div class="title2">
            <h3>网络诊断</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">
            <div class="father">
                <label> 命令 </label>
                <Input v-model="command" placeholder="请输入命令" style="margin-right: 50px;width: 220px" />
                <Button type="primary" style="margin-left: 0px;">执行命令</Button>


            <br>
                <br>
            <Input v-model="value" type="textarea" :rows="12" placeholder="" style="width: 800px;"/>
        </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "network_diagnosis",
        data() {
            return {
                command:'',
                value:'',
            }
        }
    }
</script>

<style>

</style>
