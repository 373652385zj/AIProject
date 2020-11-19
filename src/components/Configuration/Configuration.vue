<template>
        <div class="rightNav">
            <div style="border-right: 1px solid #c2c2c2; height: 100%">
                <Menu style="height: 100%" :theme="theme1" active-name="1" :open-names="['1']">
                    <MenuItem name="1" to="/Configuration/global_config">
                        <Icon type="ios-filing"/>
                        全局配置
                    </MenuItem>
                    <MenuItem name="2" to="/Configuration/camera_config">
                        <Icon type="ios-filing"/>
                        相机配置
                    </MenuItem>

                </Menu>
            </div>
            <div class="test3" >
                <router-view ></router-view>
            </div>
        </div>
</template>

<script>
    export default {
        name: "Configuration",
        data () {
            return {
                theme1: 'dark'
            }
        }
    }
</script>

<style scoped>

</style>
