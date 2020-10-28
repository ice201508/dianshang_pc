import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Welcome from '../components/Welcome.vue';
import Users from '../components/Users.vue';
import Rights from '../components/Rights.vue';
import Roles from '../components/Roles.vue';
import Categories from '../components/Category.vue';
import Params from '../components/Params.vue';
import Goods from '../components/Goods.vue';
import GoodsAdd from '../components/GoodsAdd.vue';

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
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome,
      },
      {
        path: '/users',
        component: Users,
      },
      {
        path: '/rights',
        component: Rights,
      },
      {
        path: '/roles',
        component: Roles,
      },
      {
        path: '/categories',
        component: Categories,
      },
      {
        path: '/params',
        component: Params,
      },
      {
        path: '/goods',
        component: Goods,
      },
      {
        path: '/goods/add',
        component: GoodsAdd,
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
