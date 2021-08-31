/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-08-30 17:10:24
 * @LastEditTime: 2021-08-31 09:06:40
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
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;