const getters = {
  routers: state => state.permission.routers,
  breadcrumbList: state => state.navigation.breadcrumbList,
  routeLabelList: state => state.navigation.routeLabelList,
  routeInfo: state => state.navigation.routeInfo,
  roles: state => state.user.roles
}

export default getters
