const apiPath = {
    data:function () {
        return {
            loginUrl: "/login",                                         //登录接口
            selectAllUserUrl: "/selectAllUser",                         //查询所有管理员接口
            addUserUrl: "/insertUser",                                  //新增管理员接口
            deleteUserUrl: "/deleteUser",                               //删除管理员接口
            editUserUrl: '/updateUser',                                 //更新管理员信息接口
            selectLoginTimeoutUrl: 'selectLoginTimeout',                //获取登录超时时间接口
            updateLoginTimeoutUrl: 'updateLoginTimeout',                //更新登录超时接口
            getIPUrl: '/ip/getIP',                                      //获取ip信息接口
            geditIPUrl: '/ip/geditIP',                                  //ip修改接口
            insertRTSPUrl: '/camera/add/rtsp',                          //添加rtsp流
            selectAllRTSPUrl: '/camera/selectAll/rtsp',                 //查询所有rtsp流
            // stopRTSPUrl: '/camera/stop/rtsp',                           //关闭指定rtsp流
            updateRTSPConfigUrl: '/camera/update/rtsp/config',          //更新设置
            algorithmModeURL: 'camera/update/algorithmMode',
            updateParkingPointUrl: "/car/updateParkingPoint",
            getCarBoundingBoxUrl:"/car/getCarBoundingBox",
            getCarBoxLiveUrl:"/car/getCarBoxLive",
            getFaceBoxLiveUrl:"/face/getFaceBoxLive",
            checkpointsUrl:"/camera/detect/checkpoints",
            getFaceRecordUrl:"/face/getFaceRecord",
            getParkingPointUrl:"/car/getParkingPoint",
            insertFaceUrl:"/face/insertFace"
            
            
        }
    },
    methods:{

    }
}
export default apiPath;