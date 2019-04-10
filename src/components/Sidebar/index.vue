<template>
  <a-menu
    mode="inline"
    theme="dark"
    :openKeys.sync="openKeys"
    v-model="selectedKeys"
    :inlineCollapsed="collapsed"
  >
    <template v-for="item in routers" v-if="!item.hidden">
      <side-bar-item v-if="menuHidden(item).length > 1 || item.alwaysShow"
                     :menuInfo="item"
                     :key="item.name"/>
      <a-menu-item v-else
                   :key="item.children[0].name"
                   @click="$router.push({ name: item.children[0].name })">
        <a-icon type="pie-chart" />
        <span>{{ menu[item.children[0].name] || item.children[0].name }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import SideBarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import menu from '../../config/menu'

export default {
  name: 'SideBar',
  components: {
    SideBarItem
  },
  props: {
    collapsed: Boolean
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      menu,
      cachedOpenKeys: []
    }
  },
  computed: {
    ...mapGetters([
      'routers',
      'breadcrumbList'
    ])
  },
  watch: {
    '$route': {
      handler (val) {
        const arr = []
        val.name.split('_').reduce((prev, next) => {
          const name = prev === '' ? next : `${prev}_${next}`
          arr.push(name)
          return name
        }, '')
        this.setSelectKeys(arr)
      },
      immediate: true
    },
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    }
  },
  methods: {
    setSelectKeys (array) {
      let openKeys = new Set(this.openKeys)
      let cachedOpenKeys = new Set(this.cachedOpenKeys)
      let selectedKeys = []
      for (let i = array.length - 1; i >= 0; i--) {
        if (menu.hasOwnProperty(array[i]) && selectedKeys.length === 0) {
          selectedKeys.push(array[i])
        } else if (menu.hasOwnProperty(array[i]) && !this.collapsed) {
          openKeys.add(array[i])
        } else if (menu.hasOwnProperty(array[i]) && this.collapsed) {
          cachedOpenKeys.add(array[i])
        }
      }
      this.openKeys = [...openKeys]
      this.selectedKeys = selectedKeys
      this.cachedOpenKeys = [...cachedOpenKeys]
    },
    menuHidden (child) {
      let arr = []
      if (child.children && child.children.length > 0) {
        arr = child.children.filter(item => {
          return !item.hidden
        })
      }
      return arr
    }
  }
}
</script>
