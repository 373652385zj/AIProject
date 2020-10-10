<template>
    <div style="height: 100%;width: 100%;">
            <Button style="margin: 5px" @click="gotoBack">
                <Icon type="ios-arrow-back"/>
                返回
            </Button>
        <b-container fluid style="overflow-y: auto;height: 88%;padding-bottom: 8px">

            <b-row class="justify-content-md-center">
                <b-col md="4">
                    <face-status/>
                </b-col>
                <b-col md="7">  
                    <face-checkpoint-editor/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import FaceStatus from "@/components/Configuration/FaceStatus";
    import FaceCheckpointEditor from "@/components/Configuration/FaceCheckpointEditor";

    export default {
        name: "FaceDetector",
        components: {
            FaceStatus,
            FaceCheckpointEditor,
        },
        methods: {
            gotoBack() {
                window.history.back();
            }
        },
        created() {
            alert(this.$router.params.rtspUrl)
        }
    }
</script>

<style scoped>

</style>