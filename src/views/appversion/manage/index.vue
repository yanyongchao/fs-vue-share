<template>
  <div class="appversion-manage">
    manage
    <a-button
      v-has="'appversionAdd'"
      @click="$router.push({name: 'operate_appversion_add'})"
    >add</a-button>
    <a-button
      v-has="'appversionEdit'"
      @click="$router.push({name: 'operate_appversion_edit', params: { id: 111 } })"
    >edit</a-button>
    <a-button
      v-has="'appversionUsers'"
      @click="$router.push({name: 'operate_appversion_users', params: { id: 111 } })"
    >users</a-button>
  </div>
</template>
