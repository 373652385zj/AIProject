<template>
    <div class="login-wrap">
        <div class="logo_box">
            <img style="width: 180px;" src="../assets/img/reddot_logo_1.png">
        </div>
        <div style="letter-spacing: 2px;color: white; font-weight: 300; font-size: 25px; height: 35px;text-align:center;margin-top: 10%"> <!-- margin:11% auto auto 66.5%-->
            智能分析盒子管理平台
        </div>
        <div class="login-box" style="text-align:center;position: relative; background-color: #ffffff" v-if="login">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="username">
                    <Input prefix="ios-contact" type="text" v-model="formInline.username" @keyup.enter.native="submit" placeholder="用户名">
                    </Input>
                </FormItem>
                <br>
                <FormItem prop="password">
                    <Input prefix="ios-lock" v-model="formInline.password" type="password" @keyup.enter.native="submit" password placeholder="密码" >
                    </Input>
                </FormItem>
                <br>
                <FormItem>
                    <Button  type="primary" @click="submit" style="margin-left: 0;text-align: center;" >登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import http from "@/config/http";
    export default {
        data () {
            return {
                error_msg: false,
                login: true,
                error_info: "",
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }//,
                        // { type: 'string', min: 6, message: '密码最短不小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submit() {
                if (this.formInline.username && this.formInline.password) {
                    let url = this.loginUrl;
                    let data ={
                        username: this.formInline.username,
                        password: this.formInline.password
                    };
                    this.$curl.post(url,data).then(res=>{
                        if (res.code===200) {
                            window.sessionStorage.setItem('token', res.data)
                            this.$Message.success("登陆成功")
                            this.$router.push('/Realtime')
                        } else {
                            this.$Message.warning("账号或密码错误")
                        }
                    },err=>{
                        this.$Message.error("系统错误")
                    })
                } else {
                    this.$Message.error("信息不完整");
                }
            }
        },
        mixins: [http],
        created(){
            let loginErrorCode=window.sessionStorage.getItem('loginErrorCode');
            switch (loginErrorCode) {
                case '110':
                    this.$Message.error('登录异常');
                    break;
                case '111':
                    this.$Message.error('无效登录');
                    break;

                case '112':
                    this.$Message.error('登录过期');
                    break;
                case '114':
                    this.$Message.warning('注销成功');
                    break;
                default:
                    break;
            }
            window.sessionStorage.clear();
        }
    }
</script>
<style scoped>
    .login-wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("../assets/img/big-bg.jpg");
        /*background-color: #533fff;*/
        background-position: center;
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    .login-box {
        height:265px;
        width:279px;
        /*margin-left: 66.5%;*/
        /*margin-top: 15px;*/
        margin: 15px auto;
        padding: 25px 22px;
        border-radius: 4px;
        background: white;
        box-shadow: 5px 5px 2px #387EE8;
    }
    .logo_box{
        position: absolute;
        top: 5%;
        left: 5%;
    }
</style>