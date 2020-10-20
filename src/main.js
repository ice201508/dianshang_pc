import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './plugins/element';
import App from './App.vue';
import router from './router';

import './assets/css/global.css';
import './assets/fonts/iconfont.css';

axios.defaults.baseURL = 'http://m.leijiuling.com/api/private/v1/';
Vue.prototype.$http = axios;

Vue.use(ElementUI);

new Vue({
  router,
  data() {
    return {
      abc: '我是根组件，通过$root访问',
    };
  },
  render: (h) => h(App),
}).$mount('#app');
