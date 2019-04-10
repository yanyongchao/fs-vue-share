import { UPDATE_BREADCRUMB, UPDATE_ROUTE_LABEL, UPDATE_CURRENT_MATCHED, UPDATE_ROUTE_INFO } from './types'

export default {
  [UPDATE_BREADCRUMB] (state, data) {
    state.breadcrumbList = data
  },
  [UPDATE_ROUTE_LABEL] (state, data) {
    state.routeLabelList.push(data)
  },
  [UPDATE_ROUTE_INFO] (state, data) {
    state.routeInfo = { ...state.routeInfo, ...data }
  }
}
