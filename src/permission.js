import router from './router'
import store from './store'
import { getToken } from '@/untils/auth' // getToken from cookie

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.menu === undefined) {
        store.dispatch('getUserInfo').then(res => {
          const { menu } = res
          store.dispatch('generateRoutes', menu).then((addRouters) => { // 根据menus权限生成可访问的路由表
            router.addRoutes(addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true })// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err.message)
          store.dispatch('logout').then(() => {
            next('/login')
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})