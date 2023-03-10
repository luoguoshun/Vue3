/*
 * @LastEditTime: 2023-03-10 10:31:46
 * @Descripttion:路由配置文件
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// 获取用户信息，
const { groupId, token } = {
  groupId: 2,
  token: 'dsfsdtfgdfsdfsdf',
};
// 路由配置
const routes: Array<RouteRecordRaw> = [
  // 注意：这里是一级路由
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@views/error/404.vue'),
    meta: {
      title: '404',
    },
  },
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
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isAuth: true,
        },
      },
      {
        path: 'system',
        name: 'system',
        component: () => import('@/layout/RouteView.vue'),
        meta: {
          title: '系统设置',
          isAuth: true,
        },
        ///注意：这里是三级路由，在 `path` 的前面没有 `/`
        children: [
          {
            path: 'user',
            name: 'user',
            component: () => import('@/views/system/user/index.vue'),
            meta: {
              title: '用户信息管理',
              isAuth: true,
            },
          },
          {
            path: 'role',
            name: 'role',
            component: () => import('@/views/system/role/index.vue'),
            meta: {
              title: '角色信息管理',
              isAuth: true,
            },
          },
          {
            path: 'department',
            name: 'department',
            component: () => import('@/views/system/department/index.vue'),
            meta: {
              title: '部门信息管理',
              isAuth: true,
            },
          },
        ],
      },
      {
        path: '/practise',
        name: 'practise',
        component: () => import('@/views/practise/index.vue'),
        meta: {
          title: '练习',
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

//#region 导航守卫

//《路由前置导航守卫》
router.beforeEach((to, from) => {
  const { title, isAuth } = to.meta;
  document.title = title || 'Vue3';
  if (isAuth) {
    if (!token && !token.length) {
      return '/login';
    }
  }
});
//《全局后置守卫》
router.afterEach((to, from) => {
  // 上报流量的操作
  // ...
});
//#endregion

export default router;
