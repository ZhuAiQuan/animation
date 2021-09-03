/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-08-30 17:10:24
 * @LastEditTime: 2021-09-03 16:09:27
 * @LastEditors: zaq
 * @Reference: 
 */
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
} from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../pages/cloude/index.vue')
  },
  {
    path: '/other',
    component: () => import('../pages/other/index.vue')
  },
  {
    path: '/star',
    component: () => import('../pages/starSky/index.vue')
  },
  {
    path: '/text-shadow',
    component: () => import('../pages/textShadow/index.vue')
  },
  {
    path: '/fog',
    component: () => import('../pages/fog/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;