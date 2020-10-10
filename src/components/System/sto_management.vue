<template>
    <div class="test3">
        <div class="title2">
            <h3>存储管理</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">
            <div class="word">
                    <Divider orientation="left" style="font-weight: bold">▷ 存储管理</Divider>
                <Table border :columns="columns1" :data="data1" style="margin: 10px"></Table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                value11: '',
                columns1: [
                    {
                        title: '设备',
                        key: 'equipment'
                    },
                    {
                        title: '状态',
                        key: 'style'
                    },
                    {
                        title: '已使用/总量(全部)',
                        key: 'all'
                    },
                    {
                        title: '已使用/总量(图片)',
                        key: 'photo'
                    },
                    {
                        title: '已使用/总量(录像)',
                        key: 'videotape'
                    },
                    {
                        title: '操作',
                        key: 'operation'
                    }
                ],
                data1: [
                    {
                        equipment: '1',
                        style: '开启',
                        all: '100MB',
                        photo: '3/200',
                        videotape: '1/200',
                        operation: '无'
                    }
                ]
            }
        }
    }
</script>

<style>

</style>
