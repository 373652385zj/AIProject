<template>
    <div class="test3">
        <div class="title2">
            <h3>本地配置</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">
            <div class="father">
                <div class="word">
                    <label>抓图存储</label>
                </div>
                <br>
                <br>
                <label style="font-weight: normal"> 抓图文件保存路径 </label>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择路径</Button>
                </Upload>
                <!--                <Button type="primary" style="margin-left: 150px;">选择路径</Button>-->
                <div class="word">
                    <label>录像与视频配置</label>
                </div>
                <br>
                <br>
                <label style="font-weight: normal">录像文件格式</label>
                <Select v-model="model1" style="width:auto">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <br>
                <br>
                <label style="font-weight: normal">录像文件打包时长</label>
                <Select v-model="model2" style="width:auto">
                    <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <br>
                <br>
                <label style="font-weight: normal"> 录像文件保存路径 </label>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择路径</Button>
                </Upload>
                <br>
                <label style="font-weight: normal"> 是否绘制检测框 </label>
                <Checkbox v-model="single0"></Checkbox>
                <br>
                <br>
                <label style="font-weight: normal"> 是否绘制背脸 </label>
                <Checkbox v-model="single1"></Checkbox>
                <br>
                <br>
                <label style="font-weight: normal"> 是否绘制人脸 </label>
                <Checkbox v-model="single2"></Checkbox>
                <br>
                <br>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "local_management",
        data() {
            return {
                single0: false,
                single1: false,
                single2: false,
                cityList: [
                    {
                        value: 'avi',
                        label: '.avi'
                    },
                    {
                        value: 'rmvb',
                        label: '.rmvb'
                    },
                    {
                        value: 'mpg',
                        label: '.mpg'
                    },
                    {
                        value: 'mov',
                        label: '.mov'
                    }
                ],
                model1: '',
                cityList1: [
                    {
                        value: '5',
                        label: '5分钟'
                    },
                    {
                        value: '10',
                        label: '10分钟'
                    },
                    {
                        value: '15',
                        label: '15分钟'
                    },
                    {
                        value: '20',
                        label: '20分钟'
                    }
                ],
                model2: ''
            }
        }
    }
</script>

