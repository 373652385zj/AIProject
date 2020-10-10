<template>
    <div class="rightNav">
        <ul class="tab-nav">
            <h3 style="padding:5px 0 5px 10px;border-bottom:1px solid #c2c2c2;">设备管理</h3>
        </ul>
        <div class="test3">
            <div style="border-bottom:1px solid #c2c2c2;">
                <h3 style="padding:5px 0 5px 10px;">设备管理</h3>
            </div>
            <div style="width:100%;display: flex;flex-direction: row;">
                <div style="margin: 5px;display: flex;width: 200px;height:20px;justify-content: center;background-color: #6aabf8">
                    所有设备
                </div>
                <div style="border-left:1px solid #c2c2c2;padding:10px 0 0 10px">
                    <Button type="primary">+手动添加</Button>
                    <Button type="primary" style="margin-left: 10px">批量添加到分组</Button>
                    <br>
                    <br>
                    <Table border :columns="columns1" :data="data1"></Table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value11: '',
                columns1: [
                    {
                        type: 'selection',
                        align: 'center'
                    },
                    {
                        title: '通道',
                        key: 'passageway'
                    },
                    {
                        title: '相机名称',
                        key: 'name'
                    },
                    {
                        title: 'IP',
                        key: 'IP'
                    },
                    {
                        title: '端口',
                        key: 'port'
                    },
                    {
                        title: '协议类型',
                        key: 'protocoltype'
                    },
                    {
                        title: '状态',
                        key: 'state'
                    },
                    {
                        title: '分组',
                        key: 'grouping'
                    },
                    {
                        title: '操作',
                        key: 'operation'
                    }
                ],
                data1: [
                    {
                        passageway: '',
                        name: '',
                        IP: '',
                        port: '',
                        protocoltype: '',
                        state: '',
                        group: '',
                        operation: ''
                    }
                ]
            }
        }
    }
</script>

<style lang="less">

</style>
