<template functional>
  <a-sub-menu v-on="listeners"
              :key="data.attrs.menuInfo.name">
    <span slot="title">
      <!-- <a-icon type="mail" /> -->
      <svg-icon class="anticon" :type="data.attrs.menuInfo.name" :icon-class="data.attrs.menuInfo.name" style="margin-right: 10px;"/>
      <span>{{ parent.menu[data.attrs.menuInfo.name] || data.attrs.menuInfo.name }}</span>
    </span>
    <template v-for="item in data.attrs.menuInfo.children">
      <side-bar-item v-if="parent.menuHidden(item).length > 1 || item.alwaysShow"
                     :menuInfo="item"
                     :key="item.name"/>
      <a-menu-item v-if="parent.menuHidden(item).length <= 1 && !item.hidden"
                   :key="item.name"
                   @click="parent.$router.push({ name: item.name })">
        <span>{{ parent.menu[item.name]  || item.name }}</span>
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>
