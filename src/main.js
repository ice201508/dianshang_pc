import Vue from 'vue';
import axios from 'axios';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
import './plugins/element';
import App from './App.vue';
import router from './router';

import './assets/css/global.css';
import './assets/fonts/iconfont.css';

axios.defaults.baseURL = 'http://m.leijiuling.com/api/private/v1/';
Vue.prototype.$http = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
