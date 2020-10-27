import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from './config/router'
import ElementUI from 'element-ui'
import 'iview/dist/styles/iview.css';
import curl from '@/config/axios';
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import VEasy from "v-easy-components";
import 'v-easy-components/lib/theme-chalk/index.css';
import store from './config/store'
import $ from "jquery"
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(VEasy);
Vue.use(router);
Vue.use(BootstrapVue)
Vue.use($)
Vue.config.productionTip = false

new Vue({
  curl,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
