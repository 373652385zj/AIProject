<template>
  <div style="height: 100%; width: 100%">
    <Button style="margin: 5px" @click="gotoBack">
      <Icon type="ios-arrow-back" />
      返回
    </Button>
    <b-container
      fluid
      style="overflow-y: auto; height: 88%; padding-bottom: 8px"
    >
      <b-row class="justify-content-md-center">
        <b-col md="4">
          <status />
        </b-col>
        <b-col md="7">
          <checkpoint-editor />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Status from "./Status";
import CheckpointEditor from "./CheckpointEditor";

export default {
  name: "parking-detector",
  props: ["rtspUrl"],
  components: {
    Status,
    CheckpointEditor,
  },
  data() {
    return {
      host: "mqtt.iot.nlinks.cn:9898",
    };
  },
  methods: {
    gotoBack() {
      window.history.back();
    },
  },
};
</script>

<style>
</style>
