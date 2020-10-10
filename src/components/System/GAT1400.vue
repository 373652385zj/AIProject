<template>
  <div class="test3">
    <div class="title2">
      <h3>GAT1400</h3>
    </div>
    <div class="aline"></div>
    <div class="cont1">

      <div class="father">
        <br>
        <label>推送</label>

      <i-switch size="large" >
        <span slot="open">ON</span>
        <span slot="close">OFF</span>
      </i-switch>
      <br>
      <br>
        <label>服务器地址</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

        <br>
        <br>

        <label>设备ID</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />
        <br>
        <br>

        <label>端口</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

        <br>
        <br>

        <label>超过时间</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

        <br>
        <br>

        <label>用户名</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />
        <br>
        <br>

        <label>密码</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

        <br>
        <br>

        <label>推送地址</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

        <br>
        <br>

        <label>注册地址</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

        <br>
        <br>

        <label>取消注册地址</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

        <br>
        <br>

        <label>心跳地址</label>
        <Input v-model="value" placeholder="Enter something..." style="margin-right: 50px;width: 250px" />

        <br>
        <br>

        <Button type="primary" style="margin-left: 363px;">保存配置</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseSetting",
    methods: {
      handleMessage(onoff) {
        console.log(onoff)
      },
      save(event) {
        console.log(event.target.value)
      }
    }
  }
</script>

