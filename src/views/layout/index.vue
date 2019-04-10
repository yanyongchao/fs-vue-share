<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      width="256px"
    >
      <div class="sider-logo">
        <a href="javascript:">
          <img v-if="!collapsed" src="../../assets/images/common/logo.png" class="logo" alt="logo">
          <img v-else src="../../assets/images/common/logo_small.png" class="logo" alt="logo">
        </a>
      </div>
      <sidebar
        :collapsed="collapsed"
        class="sidebar-container"/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header" :style="{left: layoutHeaderLeft}">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapsed = !collapsed"
        />
        <div style="position: absolute; top: 0; right: 40px;">
          <a-dropdown>
            <a class="ant-dropdown-link" href="javascript:;">
              admin
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click.prevent="logout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <tabs-view :routeLabelList="routeLabelList"></tabs-view>
        <div class="layout-content-header">
          <a-breadcrumb :routes="breadcrumbList" style="display:inline-block;">
            <template slot="itemRender" slot-scope="{route, params, routes, paths}">
              <span v-if="routes.indexOf(route) === routes.length - 1 || !isRealRoute(route.path)" >
                {{route.text}}
              </span>
              <router-link v-else :to="{name: route.path}" >
                {{route.text}}
              </router-link>
            </template>
          </a-breadcrumb>
          <h1 class="current-breadcrumb">{{realRoute[$route.name]}}</h1>
        </div>
        <keep-alive :include="routeLabelList">
          <router-view class="layout-view"></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import realRoute from '@/config/realRoute'
import Sidebar from '@/components/Sidebar'
import TabsView from '@/components/TabsView'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    TabsView
  },
  data () {
    return {
      realRoute,
      collapsed: false
    }
  },
  computed: {
    layoutHeaderLeft () {
      return this.collapsed ? '80px' : '256px'
    },
    ...mapGetters([
      'breadcrumbList',
      'routeLabelList',
      'routeInfo'
    ])
  },
  watch: {
    '$route': {
      handler (val) {
        let currentMatched = val.name.split('_')
        if (!this.routeLabelList.includes(val.name)) {
          // 把路由name push到routeLabelList
          this.UpdataRouteLabel(val.name)
        }
        this.UpdataBreadcrumb(currentMatched)
        this.UpdataRouteInfo({
          [val.name]: {
            query: val.query,
            params: val.params
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'UpdataRouteLabel',
      'UpdataBreadcrumb',
      'DeleteRouteLabel',
      'UpdataRouteInfo'
    ]),
    isRealRoute (val) {
      return realRoute.hasOwnProperty(val)
    },
    logout () {
      this.$store.dispatch('logout').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style lang="less" scoped>
#components-layout-demo-custom-trigger {
  height: 100%;
  .trigger {
    padding: 0 24px;
    line-height: 64px;
    font-size: 18px;
    cursor: pointer;
    transition: color .3s;
    &:hover {
      color: @primary-color;
    }
  }
  .ant-layout-side {
    background-color: #001529;
  }
  .sider-logo {
    position: relative;
    overflow: hidden;
    height: 64px;
    padding-left: 24px;
    line-height: 64px;
    background: #002140;
    transition: all .3s;
    .logo {
      display: inline-block;
      height: 32px;
      vertical-align: middle;
    }
  }
  .layout-header {
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    padding: 0;
    background: #fff;
    transition: .2s;
  }
  .layout-content {
    overflow: auto;
    min-height: 280px;
    padding: 80px 24px 24px 24px;
    background: #f0f2f5;
    &-header {
      margin: -16px -24px 24px;
      padding: 12px 24px;
      background-color: #fff;
      .current-breadcrumb {
        margin-top: 22px;
        font-size: 18px;
      }
    }
  }
  .tag-view {
    overflow-x: auto;
    height: 34px;
    margin-top: -5px;
    padding: 0 20px;
    border-bottom: 1px solid #d8dce5;
    box-sizing: border-box;
    line-height: 34px;
    background: #fff;
    white-space: nowrap;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  }
  .layout-view {
    // min-height: 100%;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
  }
}
</style>
