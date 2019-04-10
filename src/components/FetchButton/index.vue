<template>
  <a-button
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
    @click="executeFetch">
    <slot />
  </a-button>
</template>

<script>
export default {
  name: 'FetchButton',
  props: {
    fetch: [Promise, Function]
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    executeFetch () {
      this.loading = true
      this.fetch().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
