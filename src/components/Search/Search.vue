<template>
    <div class="rightNav">
        <div>
            <Menu style="height: 100%" :accordion="true" :theme="theme1" active-name="1-1" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-analytics"/>
                        人员
                    </template>
                    <MenuItem name="1-1" to="/Search/face_capture">人脸抓拍</MenuItem>
                    <MenuItem name="1-2" to="/Search/face_contrast">人脸对比</MenuItem>
                    <MenuItem name="1-3" to="/Search/event_search">事件搜索</MenuItem>
                </Submenu>

                <MenuItem name="2" to="/Search/vihicle">
                    <Icon type="ios-filing"/>
                    车辆
                </MenuItem>

            </Menu>
        </div>
            <router-view></router-view>
    </div>

</template>

<script>
    export default {
        name: "Search",
        data () {
            return {
                theme1: 'dark'
            }
        }
    }
</script>

<style scoped>

</style>
