import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
// import Home from '../components/Home.vue';
// import Welcome from '../components/Welcome.vue';
// import Users from '../components/Users.vue';
// import Rights from '../components/Rights.vue';
// import Roles from '../components/Roles.vue';
// import Categories from '../components/Category.vue';
// import Params from '../components/Params.vue';
// import Goods from '../components/Goods.vue';
// import GoodsAdd from '../components/GoodsAdd.vue';
// import Orders from '../components/Orders.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    // component: Home,
    component: () => import(/* webpackChunkName: "Home" */ '../components/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        // component: Welcome,
        component: () => import(/* webpackChunkName: "group-foo4" */ '../components/Welcome.vue'),
      },
      {
        path: '/users',
        meta: {
          name: '用户列表',
        },
        // component: Users,
        component: () => import(/* webpackChunkName: "group-foo4" */ '../components/Users.vue'),
      },
      {
        path: '/rights',
        meta: {
          name: '角色列表',
        },
        // component: Rights,
        component: () => import(/* webpackChunkName: "group-foo4" */ '../components/Rights.vue'),
      },
      {
        path: '/roles',
        meta: {
          name: '权限列表',
        },
        // component: Roles,
        component: () => import(/* webpackChunkName: "grou132p-foo3" */ '../components/Roles.vue'),
      },
      {
        path: '/categories',
        // component: Categories,
        component: () => import(/* webpackChunkName: "grou1231p-foo1" */ '../components/Category.vue'),
      },
      {
        path: '/params',
        // component: Params,
        component: () => import(/* webpackChunkName: "Params" */ '../components/Params.vue'),
      },
      {
        path: '/goods',
        // component: Goods,
        component: () => import(/* webpackChunkName: "gr231oup-foo2" */ '../components/Goods.vue'),
      },
      {
        path: '/goods/add',
        // component: GoodsAdd,
        component: () => import(/* webpackChunkName: "GoodsAdd" */ '../components/GoodsAdd.vue'),
      },
      {
        path: '/orders',
        // component: Orders,
        component: () => import(/* webpackChunkName: "Orders" */ '../components/Orders.vue'),
      },
      {
        path: '/vuex',
        // component: vuex,
        component: () => import(/* webpackChunkName: "vuex" */ '../components/Vuex.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});

export default router;
