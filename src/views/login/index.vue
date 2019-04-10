<template>
  <div class="login">
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        label="用户名"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your username!' }]}
        ]" />
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your password!' }]}
        ]" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button
          type="primary"
          html-type="submit"
        >
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { login } from '@/api'
export default {
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      redirect: null
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store
            .dispatch('login', values)
            .then(res => {
              this.$router.replace({ path: this.redirect || '/' })
            })
            .catch(err => {
              console.log('err' + err.message)
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  overflow: hidden;
}
.ant-form {
  overflow: hidden;
  margin: 100px auto 0 auto;
}
</style>
