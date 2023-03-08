/*
 * @LastEditTime: 2023-03-07 15:29:17
 * @Descripttion:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const history = createWebHistory();
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import(`@/views/login/index.vue`),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(`@/layout/index.vue`),
    meta: {
      title: '',
      isAuth: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '',
          isAuth: true,
        },
      },
    ],
  },
];
const router = createRouter({
  history,
  routes,
});
export default router;
