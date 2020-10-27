import Vue from 'vue';
import CONFIG from "@/config/config";

import Router from 'vue-router';
import header from "@/header";
import res_management from '@/components/Resource/res_management';
import Realtime from '@/components/Realtime/Realtime';
import addDevice from "@/components/Realtime/addDevice";
import live from "@/components/Realtime/live";
import login from '@/components/login';
import system_menu from '@/components/System/system_menu';
import GAT1400 from '@/components/GAT1400';
import Person from "@/components/System/Person";
import Maintenance from "@/components/System/Maintenance";
import BaseSetting from "@/components/System/BaseSetting";
import FTP from "@/components/System/FTP";
import HTTP from "@/components/System/HTTP";
import local_management from "@/components/System/local_management";
import log_detection from "@/components/System/log_detection";
import network_diagnosis from "@/components/System/network_diagnosis";
import PDNS from "@/components/System/PDNS";
import sto_management from "@/components/System/sto_management";
import Time from "@/components/System/Time";
import user_management from "@/components/System/user_management";
import Search from "@/components/Search/Search";
import vihicle from "@/components/Search/vihicle";
import face_capture from "@/components/Search/face_capture";
import face_contrast from "@/components/Search/face_contrast";
import event_search from "@/components/Search/event_search";
import Configuration from "@/components/Configuration/Configuration";
import camera_config from "@/components/Configuration/camera_config";
import global_config from "@/components/Configuration/global_config";
import CheckpointEditor from "@/components/Configuration/CheckpointEditor";
import ParkingDetector from  "@/components/Configuration/ParkingDetector";
import CarDetector from "@/components/Configuration/CarDetector";
import FaceDetector from "@/components/Configuration/FaceDetector";
import NewParkingDetector from "@/components/ParkingDetector/ParkingDetector";

Vue.use(Router);


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login',
            meta: {title: '登录'}
        },
        {
            path: '/login',
            component: login,
            meta: {title: '登录'}
        },
        {
            path: '/header',
            component: header,
            meta: {title: '智能分析盒子管理平台'},
            children: [
                {
                    path: '/Resource',
                    component: res_management,
                    meta: {title: '智能分析盒子管理平台'}
                },
                {
                    path: '/Realtime',//实时监控
                    component: Realtime,
                    children: [
                        {
                            path: '/',
                            redirect: '/Realtime/live',
                        },
                        {
                            path: '/Realtime/addDevice',
                            component: addDevice
                        },
                        {
                            path: '/Realtime/live',
                            component: live
                        }
                    ]
                },
                {
                    path: '/System',
                    component: system_menu,
                    children: [
                        {
                            path: '/',
                            redirect: '/System/BaseSetting',
                        },
                        {
                            path: '/System/GAT1400',
                            component: GAT1400
                        },
                        {
                            path: '/System/Person',
                            component: Person
                        },
                        {
                            path: '/System/Maintenance',
                            component: Maintenance
                        },
                        {
                            path: '/System/BaseSetting',
                            component: BaseSetting
                        },
                        {
                            path: '/System/FTP',
                            component: FTP
                        },
                        {
                            path: '/System/HTTP',
                            component: HTTP
                        },
                        {
                            path: '/System/local_management',
                            component: local_management
                        },
                        {
                            path: '/System/log_detection',
                            component: log_detection
                        },
                        {
                            path: '/System/network_diagnosis',
                            component: network_diagnosis
                        },
                        {
                            path: '/System/PDNS',
                            component: PDNS
                        },
                        {
                            path: '/System/sto_management',
                            component: sto_management
                        },
                        {
                            path: '/System/Time',
                            component: Time
                        },
                        {
                            path: '/System/user_management',
                            component: user_management
                        }
                    ]
                },
                {
                    path: '/Search',//智能检索
                    component: Search,
                    children: [
                        {
                            path: '/',
                            redirect: '/Search/face_capture',
                        },
                        {
                            path: '/Search/vihicle',
                            component: vihicle
                        },
                        {
                            path: '/Search/face_capture',
                            component: face_capture
                        },
                        {
                            path: '/Search/face_contrast',
                            component: face_contrast
                        },
                        {
                            path: '/Search/event_search',
                            component: event_search
                        },
                    ]
                },
                {
                    path: '/Configuration',//智能配置
                    component: Configuration,
                    children: [
                        {
                            path: '/',
                            redirect: '/Configuration/global_config',
                        },
                        {
                            path: '/Configuration/camera_config',
                            component: camera_config
                        },
                        {
                            path: '/Configuration/global_config',
                            component: global_config
                        },
                        {
                            path: '/Configuration/ParkingDetector',
                            component: ParkingDetector
                        },
                        {
                            path: '/Configuration/CarDetector',
                            component: CarDetector
                        },
                        {
                            path: '/Configuration/FaceDetector',
                            component: FaceDetector
                        },
                        {
                            path: '/NewParkingDetector',
                            component: NewParkingDetector,
                        }
                    ]
                }
            ]
        }
    ]
})
