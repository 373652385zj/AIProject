<template>
    <div class="rightNav">
        <ul class="tab-nav">
            <button>

            </button>
        </ul>
        <div class="test3">
            <div class="title2">
                <h3>设备管理</h3>
                <div style="display: flex;flex-direction: row;border-top:1px solid #c2c2c2 ">
                    <div style="width: 80%;border-right: 1px solid #c2c2c2;height: 800px">

                        <p style="float: left;width:200px;font-size: 23px">人脸识别</p>
                        <i-switch size="large" >
                            <span slot="open">ON</span>
                            <span slot="close">OFF</span>
                        </i-switch>

                        <br>
                        <br>
                        <p style="font-size:23px;float: left;width: 200px">关联人脸库</p>
                        <Checkbox v-model="single">全选</Checkbox>
                        <br>
                        <br>
                        <Button type="primary" style="margin-left: 200px;">保存配置</Button>
                        <br>
                        <p style="font-size:23px;float: left;width: 200px">功能演示</p>
                        <br><br><br>
                        <br>
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">上传</Button>
                        </Upload>

                        <p style="font-size:23px;width: 200px">识别结果</p>
                        <Table stripe :columns="columns1" :data="data1"></Table>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "monitor",
        methods: {
            handleMessage(onoff) {
                console.log(onoff)
            },
            save(event) {
                console.log(event.target.value)
            }
        },
        data () {
            return {
                value11: '',
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '生日',
                        key: 'birth'
                    },
                    {
                        title: '证件类型',
                        key: 'document_type'
                    },
                    {
                        title: '证件号',
                        key: 'certificate_number'
                    },
                    {
                        title: '所在人脸库',
                        key: 'from'
                    }
                ],
                data1: [
                    {
                    }
                ]
            }
        }
    }
</script>

<style lang="less">

</style>
