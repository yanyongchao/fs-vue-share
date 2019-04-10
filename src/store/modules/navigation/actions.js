import { UPDATE_BREADCRUMB, UPDATE_ROUTE_LABEL, UPDATE_CURRENT_MATCHED, UPDATE_ROUTE_INFO } from './types'
import menu from '@/config/menu'
import realRoute from '@/config/realRoute'

export default {
  UpdataRouteLabel ({ commit, state }, data) {
    commit(UPDATE_ROUTE_LABEL, data)
  },
  DeleteRouteLabel ({ state }, data) {
    return new Promise(resolve => {
      let index = state.routeLabelList.indexOf(data)
      resolve(state.routeLabelList.splice(index, 1))
    })
  },
  UpdataBreadcrumb ({ commit }, data) {
    let fullInfo = { ...menu, ...realRoute }
    let breadcrumbList = []
    data.reduce((prev, next) => {
      const name = prev === '' ? next : `${prev}_${next}`
      breadcrumbList.push({
        path: name,
        text: fullInfo[name]
      })
      return name
    }, '')
    commit(UPDATE_BREADCRUMB, breadcrumbList)
  },
  UpdataRouteInfo ({ commit }, data) {
    commit(UPDATE_ROUTE_INFO, data)
  }
}
