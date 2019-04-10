<template>
  <a-tabs
    v-model="activeKey"
    type="editable-card"
    @change="tabClick"
    :hideAdd="true"
    @edit="closeSelectedTag">
    <a-tab-pane v-for="item in routeLabelList" :tab="realRoute[item] || item" :key="item"/>
  </a-tabs>
</template>

<script>
import realRoute from '../../config/realRoute'
import { mapGetters } from 'vuex'

export default {
  name: 'routeLabel',
  computed: {
    ...mapGetters([
      'routeInfo'
    ])
  },
  data () {
    return {
      realRoute,
      activeKey: this.$route.name,
      list: []
    }
  },
  props: {
    routeLabelList: Array
  },
  watch: {
    '$route' (val) {
      this.activeKey = val.name
    }
  },
  methods: {
    tabClick (name) {
      this.$router.push({ name, ...this.routeInfo[name] })
    },
    isActive (route) {
      return route === this.$route.name
    },
    closeSelectedTag (targetKey, action) {
      if (this.routeLabelList.length <= 1) {
        this.$message.warning('这已经是最后一页，不能再关闭啦')
        return
      }
      if (this.isActive(targetKey)) {
        let index = this.routeLabelList[0] === targetKey ? 1 : 0
        this.$router.push({ name: this.routeLabelList[index] })
      }
      this.$store.dispatch('DeleteRouteLabel', targetKey)
    }
  }
}
</script>
