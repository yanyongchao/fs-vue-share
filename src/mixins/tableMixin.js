import store from '../store'

export default {
  data () {
    return {
      requestData: {
        page: 1,
        pageSize: 10
      },
      tableListData: [],
      getTableList: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    // 是否是返回或者存在存在标签中
    let isBack = from.path.indexOf(to.path) > -1 || store.state.navigation.routeLabelList.includes(to.name)
    // 从store里面拿到存储的值
    let historyRequestData = store.state.tableData.historyRequestList[to.name]
    // 把reqData存储到对应路由的meta信息中，供单个组件beforeRouteEnter生命周期使用，解决没有next(),拿不到this的问题；
    to.meta.requestData = isBack && historyRequestData ? historyRequestData : {
      page: 1,
      pageSize: 10
    }
    if (!isBack) {
      // 如果是前进，则清除store中存储的该组建的数据
      store.dispatch('uploadListParams', {
        routeName: to.name
      })
    } else {
      console.log('后退')
    }
    next(vm => {
      // 请求参数做赋值
      vm.requestData = to.meta.requestData
    })
  },
  methods: {
    $_tableMixin_setList (res, vm = this) {
      vm.tableListData = res.data
      vm.pagination = { ...this.pagination, total: res.data.total, current: vm.requestData.page }
      store.dispatch('uploadListParams', {
        routeName: vm.$route.name,
        requestData: vm.requestData
      })
    },
    $_tableMixin_tableChange (pagination) {
      if (pagination && pagination.hasOwnProperty('current')) {
        this.requestData = { ...this.requestData, page: pagination.current }
      } else {
        this.requestData = { ...this.requestData, page: 1 }
      }
      return this.getTableList(this.requestData).then(res => {
        this.$_tableMixin_setList(res)
      }).catch(error => {
        return error
      })
    }
  }
}
