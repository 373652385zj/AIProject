"use strict";

import Vue from "vue";
import axios from "axios";
import config from "@/config/config";
import jQuery from "jquery";
import router from "@/config/router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const _axios = axios.create(config.axios);


_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        let header = {
            "Referer-Type": "ui" // 前后端分离请求
        };
        let token = window.sessionStorage.getItem("token");
        if (token && token != "null" && token != "") {
            header.Authorization = token;
            window.sessionStorage.removeItem('loginErrorCode');
        }
        Object.assign(config, {
            headers: header
        });
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        const {data, status} = response;

        if (Object.prototype.toString.call(response.data) != "[object Object]") {
            return response.data;
        }

        let res = {};
        if (status >= 200 && status < 300) {
            if (data.redirect) {
                // 如果接口有返回重定向的地址，则重定向
                window.location.href = data.redirect;
                return;
            }
            if (data.code === 0 || data.code === 200) {
                res = {
                    result: true,
                    data: data.data,
                    msg: data.msg,
                    code: data.code,
                    redirect: data.redirect
                };
            } else if (data.code > 109 && data.code < 114) {
                // 判断是否需要进行登出操作
                // 110 异常 * 111 无效 * 112 过期 * 113 为空

                window.localStorage.clear();
                window.sessionStorage.clear();
                window.sessionStorage.setItem('loginErrorCode', data.code);
                router.replace("/login");
            } else {
                res = {
                    result: false,
                    msg: data.msg,
                    code: data.code
                };
            }
        } else {
            res = {
                result: false,
                msg: `服务器异常，status:${status}`,
                code: data.code
            };
        }

        return res;
    },
    function (error) {
        // Do something with response error
        const {data} = error.response;

        const msg = data => {
            Vue.prototype.$Notice.error({
                title: "请求错误",
                render: h => {
                    return h(
                        "div",
                        {
                            style: {
                                color: "#ed4014",
                                lineHeight: 1.2,
                                marginTop: "-5px",
                                wordBreak: "break-all"
                            }
                        },
                        [
                            h("p", `error: ${data.error}`),
                            h("p", `message: ${data.msg}`),
                            h("p", `path: ${data.path}`),
                            h("p", `status: ${data.status}`),
                            h("p", `timestamp: ${data.timestamp}`)
                        ]
                    );
                },
                duration: 0
            });
        };

        if (Object.prototype.toString.call(data) === "[object Blob]") {
            const reader = new FileReader();
            reader.addEventListener("loadend", () => {
                msg(JSON.parse(reader.result));
            });
            reader.readAsText(data);
        } else {
            msg(data);
        }

        return Promise.reject(error);
    }
);

Plugin.install = function (Vue) {
    Vue.axios = axios; // 原始版本
    window.axios = _axios; // 从全局调用实例

    // 配置ajax请求默认配置
    const ajaxConfig = {
        dataType: "json",
        cache: false,
        timeout: config.axios.timeout
    };

    jQuery.ajaxSetup(ajaxConfig);
    // 合并必要参数
    jQuery.ajaxPrefilter(options => {
        var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
        var re = new RegExp(strRegex);
        // 设置baseURL
        options.url = re.test(options.url)
            ? options.url
            : config.axios.baseURL + options.url;
        // 设置头部
        let header = {
            "Referer-Type": "ui" // 前后端分离请求
        };
        let token = window.sessionStorage.getItem("token");
        if (token && token != "null" && token != "") {
            // header.access_token = token;
            header.Authorization = token;
            window.sessionStorage.removeItem('loginErrorCode');
        }
        options.headers = Object.assign(options.headers || {}, header);
        // token校验拦截
        options.dataFilter = function (data) {
            const res = data ? JSON.parse(data) : {};
            if (res.redirect) {
                // 如果接口有返回重定向的地址，则重定向
                window.location.href = res.redirect;
                return;
            }
            if (res.code > 109 && res.code < 114) {
                // 判断是否需要进行登出操作
                // 110 异常 * 111 无效 * 112 过期 * 113 为空
                window.localStorage.clear();
                window.sessionStorage.clear();
                window.sessionStorage.setItem('loginErrorCode', res.code);
                router.replace("/login");
            }

            // 对结果进行统一包装，与axios统一
            if (res.code === 0) {
                return {
                    result: true,
                    data: res.result,
                    msg: res.message,
                    code: data.code
                };
            } else {
                return {
                    result: false,
                    data: res.result,
                    msg: res.message,
                    code: data ? data.code : null
                };
            }
        };
    });

    // 全局载入jq，为最新版本，部分jq插件可能不支持
    window.$ = jQuery;
    window.jQuery = jQuery;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return axios;
            }
        },
        $curl: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin);

export const $curl = _axios;

export default Plugin;
