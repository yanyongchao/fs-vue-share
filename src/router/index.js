import Vue from 'vue'
import Router from 'vue-router'
import operateRoutes from './modules/operate'
import Layout from '@/views/layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'home',
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

export const asyncRouterMap = [
  operateRoutes,
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
