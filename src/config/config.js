module.exports = {
  title: "视频盒子",
  microServer: false, // 默认后端不是微服务
  // 单点配置
  cas: {
    enable: true, // 是否启用单点
    // 配置本机的ip地址，如果启用nginx时需要配置nginx的地址
    servicePrefix: "http://192.168.137.100:80",
    // servicePrefix: "http://192.168.200.8:7001",
    // 单点登陆的服务端地址
    serverPath: "http://localhost:8080",
    paths: {
      login: "/login", // 配置前端的登录路由
      logout: "/logout"
    }
  },
  // 后端请求配置
  axios: {//http://112.74.47.182:9898
    // 配置后端的地址，如果启用nginx时需要配置nginx的地址
    // baseURL: "http://192.168.137.100:5000", //后端请求接口ip:port
    baseURL: "http://112.74.47.182:9898", //后端请求接口ip:port
    timeout: 1000 * 60,
    withCredentials: true
  },
  // 水印配置
  watermark: {
    enable: false,
    width: 400,
    height: 300,
    x: 0,
    y: 80,
    font: "SimSun Bold",
    fontSize: 20,
    color: "#000",
    alpha: 0.22,
    angle: -20,
    mode: "canvas"
  },
  // 不进行token校验的路由
  whiteList: ["/login", "/login/admin", "/logout"]
};
