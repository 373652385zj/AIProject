<template>
    <div class="rightNav">
        <div style="background: #515a6e">
        <Menu id="menu1" style="height: 100%" :theme="'dark'" active-name="realtime">
            <MenuItem to="/Realtime/live" name="realtime">
                <Icon type="md-videocam" />
                实时监控
            </MenuItem>
            <MenuGroup id="menuGroup1" title="设备管理">
                <MenuItem  to="/Realtime/addDevice" name="add">
                    <icon type="md-add"></icon> 设备添加
                </MenuItem>

            </MenuGroup>

        </Menu>
    </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {globalBus} from '@/config/globalBus';
    export default {
        name: "Realtime",
        methods: {
            add() {
                let meu = document.getElementById('menuGroup1');
                alert(123)
            },
            addMenuItem() {
                let self = this;
                globalBus.$on("addMenuItem", () => {
                    alert(333)
                })
            }
        },
        created() {
        }
    }
</script>

<style lang="less">

    //点击后右箭头的反转效果

</style>
