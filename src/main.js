import Vue from 'vue';
import ZkTable from 'vue-table-with-tree-grid';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './plugins/element';
import App from './App.vue';
import router from './router';
import axios from './utils/myAxios';
import 'nprogress/nprogress.css';

import './assets/css/global.css';
import './assets/fonts/iconfont.css';

Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.component('tree-table', ZkTable);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
