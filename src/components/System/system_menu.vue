<template>
    <div class="rightNav">
        <div>
            <Menu style="height: 100%" :theme="theme1" active-name="1-1" :accordion="true" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-analytics"/>
                        基础网络
                    </template>
                    <MenuItem name="1-1" to="/System/BaseSetting">基础设置</MenuItem>
                    <MenuItem name="1-2" to="/System/network_diagnosis">网络诊断</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-filing"/>
                        高级网络
                    </template>
                    <MenuItem name="2-1" to="/System/HTTP">HTTP推送</MenuItem>
                    <MenuItem name="2-2" to="/System/FTP">FTP</MenuItem>
                    <MenuItem name="2-3" to="/System/PDNS">PDNS</MenuItem>
                    <MenuItem name="2-4" to="/System/GAT1400">GAT1400</MenuItem>
                </Submenu>
                <MenuItem name="3" to="/System/local_management">
                    <Icon type="ios-filing"/>
                    本地配置
                </MenuItem>
                <MenuItem name="4" to="/System/Time">
                    <Icon type="ios-filing"/>
                    时间配置
                </MenuItem>
                <MenuItem name="5" to="/System/user_management">
                    <Icon type="ios-filing"/>
                    用户管理
                </MenuItem>
                <MenuItem name="6" to="/System/sto_management">
                    <Icon type="ios-filing"/>
                    存储管理
                </MenuItem>
                <Submenu name="7">
                    <template slot="title">
                        <Icon type="ios-filing"/>
                        系统维护
                    </template>
                    <MenuItem name="7-1" to="/System/Maintenance">设备维护</MenuItem>
                    <MenuItem name="7-2" to="/System/log_detection">日志检测</MenuItem>
                </Submenu>
            </Menu>
        </div>
        <!--        <div>-->
        <router-view></router-view>
        <!--        </div>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                theme1: 'dark'
            }
        },
        methods: {
            openNav(index, num) {
                // eslint-disable-next-line no-unused-vars
                let _this = this
                let nav = document.querySelectorAll('.nav')
                let items = document.querySelectorAll('.nav-n-box')
                if (num == 0) {
                    let i = _this.navList[index].path
                    console.log(i)
                    this.$router.push(i)

                }
                for (let i = 0; i < nav.length; i++) {
                    if (
                        items[i].style.height === '' ||
                        items[i].style.height === '0rem' ||
                        nav[index].classList.contains('nav-n-box-active')
                    ) {
                        let height = items[index].style.height
                        items[index].style.height = height
                    } else {
                        items[i].style.height = '0rem'
                    }
                    nav[i].classList.remove('nav-n-box-active')
                }
                if (
                    items[index].style.height === '' ||
                    items[index].style.height === '0rem'
                ) {
                    items[index].style.height = num * 2 + 'rem'
                    nav[index].classList.add('nav-n-box-active')
                } else {
                    items[index].style.height = '0rem'
                    nav[index].classList.remove('nav-n-box-active')
                }
            }
        }
    }
</script>

<style lang="less">
    .rout {
        width: auto;
    }

</style>
