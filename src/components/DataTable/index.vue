<template>
  <div class="data-table">
    <div v-if="$slots.toolbar" class="data-table-toolbar">
      <slot name="toolbar"></slot>
    </div>
    <a-spin :spinning="spinning" :indicator="indicator">
      <div class="data-table-content" :class="{'data-table-column1': !showPagination||!total}">
        <slot />
      </div>
    </a-spin>
    <div v-if="showPagination && total"
      class="data-table-page">
      <a-pagination :total="total"
        :showTotal="total => `共 ${total} 条`"
        :defaultPageSize="10"
        v-model="page"
        @change="pageChange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      spinning: false,
      total: 0,
      page: 1,
      indicator: <a-icon type="loading" style="font-size: 30px" spin />
    }
  },
  methods: {
    fetch (resource, search) {
      this.spinning = true
      return resource(search).then((res) => {
        this.spinning = false
        this.page = search.page || 1
        this.total = res.data.total || 0
        this.$store.dispatch('SaveListPagePars', {
          path: this.$route.path,
          pars: { ...search }
        })
        return res
      })
    },
    pageChange (page) {
      this.$emit('page-change', page)
    }
  }
}
</script>

<style lang="less" scoped>
.data-table-toolbar {
  margin-bottom: 20px;
}
.data-table-content {
  margin-bottom: 24px;
  &.data-table-column1 {
    margin-bottom: 0;
  }
}
.data-table-page {
  text-align: right;
}
</style>

