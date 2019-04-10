<template>
  <div class="home">
    <p class="welcome">欢迎登录,付呗app运营后台!</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
  background-color: #fff;
  .welcome {
    position: absolute;
    top: 50%;
    left: 50%;
    color: @primary-color;
    font-weight: 500;
    font-size: 30px;
    transform: translate(-50%,-50%);
  }
}
</style>
