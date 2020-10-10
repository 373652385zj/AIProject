<template>
    <div class="rightNav">
        <ul class="tab-nav">
            <h3 style="height:20px;margin:5px 0 5px 10px;">设备管理树</h3>
            <div class="aline"></div>
            <div style="margin: 5px;display: flex;width: auto;justify-content: center;background-color: #6aabf8">所有设备
            </div>
        </ul>
        <div class="test3">
            <Tabs value="name1">
                <TabPane label="人脸抓拍" name="name1">
                    <div class="father">
                        <label>人脸抓拍</label>
                        <i-switch size="large">
                            <span slot="open">ON</span>
                            <span slot="close">OFF</span>
                        </i-switch>
                        <br>
                        <br>
                        <label>输出人脸属性</label>
                        <i-switch size="large">
                            <span slot="open">ON</span>
                            <span slot="close">OFF</span>
                        </i-switch>
                        <br>
                        <br>
                        <label>目标生成速度</label>
                        <!--                <p style="float:left;width: 200px;font-size: 18px">目标生成速度</p>-->
                        <Slider v-model="value3" :step="10" style="float:left;width: 200px"></Slider>
                        <br>
                        <br>
                        <label>检测灵敏度</label>
                        <!--                <p style="float: left;width: 200px;font-size: 18px">检测灵敏度</p>-->
                        <Slider v-model="value4" :step="10" style="float:left;width: 200px"></Slider>
                        <br>
                        <br>
                        <label>瞳距范围</label>
                        <!--                <p style="float: left;width: 200px;font-size: 18px">瞳距范围</p>-->
                        <Slider v-model="value5" :step="10" style="float:left;width: 200px"></Slider>
                        <br>
                        <br>
                        <label>抓拍次数</label>
                        <!--                <p style="float: left;width: 200px;font-size: 18px">抓拍次数</p>-->
                        <Select v-model="model2" style="width:200px">
                            <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                        <br>
                        <br>
                        <label>抓拍模式</label>
                        <!--                <p style="float: left;width: 200px;font-size: 18px">抓拍模式</p>-->
                        <Select v-model="model1" style="width:200px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                        <br>
                        <br>
                        <label>担任抓拍间隔(帧)</label>
                        <!--                <p style="float: left;width: 200px;font-size: 18px">担任抓拍间隔(帧)</p>-->
                        <Slider v-model="value6" :step="10" style="float:left;width: 200px"></Slider>
                        <br>
                        <br>
                        <label>抓拍阈值</label>
                        <!--                <p style="float: left;width: 200px;font-size: 18px">抓拍阈值</p>-->
                        <Slider v-model="value7" :step="10" style="float:left;width: 200px"></Slider>
                        <br>
                        <br>
                        <label>最短停留时间(秒)</label>
                        <!--                <p style="float: left;width: 200px;font-size: 18px">最短停留时间(秒)</p>-->
                        <Slider v-model="value9" :step="10" style="float:left;width: 200px"></Slider>
                        <br>
                        <br>
                        <label>抓拍模式</label>
                        <!--                <p style="float: left;width: 200px;font-size: 18px">抓拍模式</p>-->
                        <Select v-model="model3" style="width:200px">
                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                        <br>
                        <br>
                        <label>图片分辨率</label>
                        <Select v-model="model4" style="width:200px">
                            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                        <br>
                        <br>
                    </div>
                </TabPane>
                <TabPane label="人脸识别" name="name2">人脸识别</TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "camera_config",
        props: {
            value: {
                type: [Number, String],
                default: 0
            },
            max: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                x: '',
                l: '',
                flag: false,
                inputValue: this.value,
                value8: 25,
                value4: 25,
                value5: 25,
                value6: 25,
                value7: 25,
                value9: 25,
                single: false,
                cityList: [
                    {
                        value: 'after',
                        label: '离开后抓拍'
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
                        value: '1',
                        label: '1'
                    },
                    {
                        value: '2',
                        label: '2'
                    },
                    {
                        value: '3',
                        label: '3'
                    },
                    {
                        value: '4',
                        label: '4'
                    }
                ],
                model2: '',
                cityList2: [
                    {
                        value: '100%',
                        label: '100%'
                    },
                    {
                        value: '80%',
                        label: '80%'
                    },
                    {
                        value: '60%',
                        label: '60%'
                    },
                    {
                        value: '50%',
                        label: '50%'
                    }
                ],
                model3: '',
                cityList3: [
                    {
                        value: '1920*1080',
                        label: '1920*1080'
                    },
                    {
                        value: '1280*960',
                        label: '1280*960'
                    },
                    {
                        value: '960*640',
                        label: '960*640'
                    },
                    {
                        value: '640*360',
                        label: '640*360'
                    }
                ],
                model4: ''
            }
        },
        computed: {
            width() {
                return this.inputValue * (this.$refs.bar.offsetWidth / this.max) - this.$refs.btn.offsetWidth / 2
            },
            stepWidth() {
                return Math.max(0, this.width)
            }
        },
        mounted() {
            this.$refs.btn.style.left = this.width + 'px'
            this.$refs.step.style.width = this.stepWidth + 'px'
        },
        methods: {
            handleMessage(onoff) {
                console.log(onoff)
            },
            save(event) {
                console.log(event.target.value)
            },
            btnclick(e) {
                let x = e.clientX - this.$refs.bar.offsetLeft
                this.inputValue = Math.round((x / this.$refs.bar.offsetWidth) * 100)
                // var y = e.clientY - this.$refs.bar.offsetTop
            },
            maxW() {
                return this.$refs.bar.offsetWidth - this.$refs.btn.offsetWidth / 2
            },
            btndown(e) {
                this.x = (e || window.event).clientX
                this.l = this.$refs.btn.offsetLeft
                this.flag = true
                document.addEventListener('mousemove', this.btnmove)
                document.addEventListener('mouseup', this.btnup)
            },
            btnmove(e) {
                let m = Math
                let thisX = (e || window.event).clientX
                this.tTo(m, thisX)
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
            },
            btnup() {
                this.flag = false
                document.removeEventListener('mousemove', this.btnmove)
                document.removeEventListener('mouseup', this.btnup)
            },
            tTo(m, x) {
                let w = m.min(this.maxW(), m.max(-this.$refs.btn.offsetWidth / 2, this.l + (x - this.x)))
                this.inputValue = m.round(m.max(0, w / this.maxW()) * 100)
            },
            btnth(e) {
                this.x = (e || window.event).touches[0].clientX
                this.l = this.$refs.btn.offsetLeft
                this.flag = true
                document.addEventListener('touchmove', this.btnthmove)
                document.addEventListener('touchend', this.btnthup)
            },
            btnthmove(e) {
                let m = Math
                let thisX = (e || window.event).touches[0].clientX
                this.tTo(m, thisX)
            },
            btnthup() {
                this.flag = false
                document.removeEventListener('touchmove', this.btnthmove)
                document.removeEventListener('touchend', this.btnthup)
            }
        },
        watch: {
            inputValue(val) {
                this.$emit('input', val)
                this.$emit('change', val)
                this.$refs.btn.style.left = this.width + 'px'
                this.$refs.step.style.width = this.stepWidth + 'px'
            }
        }
    }
</script>

<style lang="less">

    .slider {
        font-size: 12px;
        line-height: 50px;
        position: relative;
        height: 50px;
        width: 200px;
        list-style: none;
    }

    .slider-thumb {
        background-color: black;
        width: 16px;
        height: 16px;
        position: absolute;
        left: -8px;
        top: -5px;
        cursor: pointer;
        border-radius: 50%;
        transition: 0.5s box-shadow;
    }

    .slider-thumb.Act {
        box-shadow: 0 0 5px #333;
    }

    .slider-track {
        background: red;
        height: 5px;
        position: relative;
        font-size: 0px;
        cursor: pointer;
    }

    .slider-fill {
        background-color: blue;
        position: absolute;
        height: 5px;
        width: 0;
        left: 0;
        bottom: 0;
    }

    //点击后右箭头的反转效果

</style>
