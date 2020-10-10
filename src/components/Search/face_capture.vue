<template>
    <div class="rightNav">
        <ul class="tab-nav">
            <h3 style="padding:5px 0 5px 10px;border-bottom:1px solid #c2c2c2;">设备管理树</h3>
        </ul>
        <div class="test3">
            <div style="border-bottom:1px solid #c2c2c2;">
                <h3 style="padding:5px 0 5px 10px;">人脸抓拍</h3>
            </div>
            <div style="margin:10px 0 0 10px">
                <div class="personalReport_time">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                placeholder="Select date and time(Excluding seconds)"
                                style="float:left;width: 200px"></DatePicker>
                    <div style="float: left;font-size: 23px;margin: 0 5px 0 5px">至</div>
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                placeholder="Select date and time(Excluding seconds)"
                                style="float:left;width: 200px"></DatePicker>
                    <br>
                    <br>
                    <Select placeholder="性别" v-model="model1" style="width:100px">
                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>

                    <Select placeholder="年龄" v-model="model2" style="width:100px;margin-left: 10px">
                        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>

                    <Select placeholder="眼镜" v-model="model3" style="width:100px;margin-left: 10px">
                        <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>

                    <Select placeholder="帽子" v-model="model4" style="width:100px;margin-left: 10px">
                        <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>

                    <Select placeholder="口罩" v-model="model5" style="width:100px;margin-left: 10px">
                        <Option v-for="item in cityList5" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </div>
                <br>
                <div>
                    <Checkbox v-model="single0">全选</Checkbox>
                    <Button type="primary" style="margin-left: 30px;" icon="ios-cloud-download-outline">下载</Button>
                    <Button type="primary" style="margin-left: 10px;">+添加到人脸库</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "face_capture",
        data() {
            return {
                single0: false,
                cityList1: [
                    {
                        value: 'man',
                        label: '男'
                    },
                    {
                        value: 'woman',
                        label: '女'
                    }
                ],
                model1: '',
                cityList2: [
                    {
                        value: 'age',
                        label: '年龄'
                    },
                    {
                        value: '10-15',
                        label: '10-15'
                    },
                    {
                        value: '16-20',
                        label: '16-20'
                    },
                    {
                        value: '21-55',
                        label: '21-25'
                    }
                ],
                model2: '',
                cityList3: [
                    {
                        value: 'no',
                        label: '无'
                    },
                    {
                        value: 'yes',
                        label: '有'
                    },
                ],
                model3: '',
                cityList4: [
                    {
                        value: 'no',
                        label: '无'
                    },
                    {
                        value: 'yes',
                        label: '有'
                    },
                ],
                model4: '',
                cityList5: [
                    {
                        value: 'no',
                        label: '无'
                    },
                    {
                        value: 'yes',
                        label: '有'
                    },
                ],
                model5: '',
            }
        }
    }
</script>
