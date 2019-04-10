import { constantRouterMap, asyncRouterMap } from '@/router'

function hasPermission (roles, route) {
  if (roles.includes(route.name)) {
    return true
  } else {
    return false
  }
}

function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    } else if (tmp.hidden) {
      res.push(tmp)
    }
  })

  return res
}

function planeMenu (menus) {
  let res = []
  menus.forEach(menu => {
    res.push(menu.content)

    if (menu.children) {
      res = [...res, ...planeMenu(menu.children)]
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes ({ commit }, menu) {
      return new Promise((resolve) => {
        let accessedRouters = filterAsyncRouter(asyncRouterMap, planeMenu(menu))
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
