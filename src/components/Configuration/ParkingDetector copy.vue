<template style="overflow-y: auto">
  <b-container fluid>
    <b-row class="justify-content-md-center">
      <b-col md="4">
        <status />
      </b-col>
      <b-col md="7">
        <checkpoint-editor  />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Status from "./Status";
import CheckpointEditor from "./CheckpointEditor";

export default {
  name: "parking-detector",
  components: {
    Status,
    CheckpointEditor,
  }
};
</script>

<style>
</style>
