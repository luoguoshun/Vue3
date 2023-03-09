/*
 * @LastEditTime: 2023-03-09 17:11:11
 * @Descripttion:路由文件
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// 获取用户信息，
const { groupId, token } = {
  groupId: 2,
  token: 'dsfsdtfgdfsdfsdf',
};
const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@views/error/404.vue'),
    meta: {
      title: '404',
    },
  },
  // 注意：这里是一级路由
  {
    path: '/login',
    name: 'login',
    component: () => import(`@/views/login/index.vue`),
    meta: {
      title: '登入',
      isAuth: false,
    },
  },
  {
    path: '/',
    name: 'index',
    redirect: () => {
      if (!token && !token.length) {
        return '/login';
      }
      // 根据组别 ID 进行跳转
      switch (groupId) {
        // 管理员跳去仪表盘
        case 1:
          return '/dashboard';
        // 普通用户跳去首页
        case 2:
          return '/home';
        // 其他都认为未登录，跳去登录页
        default:
          return '/login';
      }
    },
    component: () => import(`@/layout/index.vue`),
    meta: {
      title: '登入',
      isAuth: true,
    },
    // 注意：这里是二级路由，在 `path` 的前面没有 `/`
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isAuth: true,
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
//路由前置导航守卫
router.beforeEach((to, from) => {
  const { title, isAuth } = to.meta;
  document.title = title || 'Vue3';
  if (isAuth) {
    if (!token && !token.length) {
      return '/login';
    }
  }
});
//全局后置守卫
router.afterEach((to, from) => {
  // 上报流量的操作
  // ...
})

export default router;
