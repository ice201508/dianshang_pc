import axios from 'axios';

axios.defaults.baseURL = 'http://m.leijiuling.com/api/private/v1/';
// 路由白名单
const whiteList = ['/login', '/registry', '/code'];
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // if (config.url !== '/login') {
    if (!whiteList.includes(config.url)) {
      config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
