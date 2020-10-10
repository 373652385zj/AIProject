<template>
    <div class="rightNav">
        <ul class="tab-nav">
            <h3 style="padding:5px 0 5px 10px;border-bottom:1px solid #c2c2c2;">设备管理树</h3>
        </ul>
        <div class="test3">
            <div style="border-bottom:1px solid #c2c2c2;">
                <h3 style="padding:5px 0 5px 10px;">事件搜索</h3>
            </div>
            <div style="margin:10px 0 0 10px">
                <div style="float: left">
                    <Input v-model="ID" placeholder="请输入姓名、证件号等关键字"
                           style="float:left;margin-right: 50px;width: 250px"/>
                </div>
                <br>
                <br>
                <div class="personalReport_time">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                placeholder="Select date and time"
                                style="float:left;width: 200px"></DatePicker>
                    <div style="float: left;font-size: 23px;margin: 0 5px 0 5px">至</div>
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                placeholder="Select date and time"
                                style="float:left;width: 200px"></DatePicker>
                    <Select placeholder="事件类型" v-model="model1" style="width:150px;padding-left: 30px">
                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>

                    <Select placeholder="关联人脸库" v-model="model2" style="width:150px;padding-left: 30px">
                        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </div>

                <br>
                <div>
                    <Checkbox v-model="single">全选</Checkbox>
                    <Button type="primary" style="margin-left: 30px;" icon="ios-cloud-download-outline">下载</Button>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "event_search",
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
                cityList1: [
                    {
                        value: 'no',
                        label: '无'
                    },
                    {
                        value: 'yes',
                        label: '有'
                    },
                ],
                model1: '',
                cityList2: [
                    {
                        value: 'yes',
                        label: '是'
                    },
                    {
                        value: 'no',
                        label: '否'
                    },
                ],
                model2: '',
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

