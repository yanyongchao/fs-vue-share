/**
 * 跳转路由封装
 * @param {string} name 跳转的路由组件名字
 * @param {object} query 跳转所需要的参数
 */
export default {
  methods: {
    jumpTo (name, query = {}) {
      this.$router.push({
        name,
        query
      })
    }
  }
}
