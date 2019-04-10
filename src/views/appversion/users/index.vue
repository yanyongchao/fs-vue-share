<template>
  <div class="appversion-users">
    <data-table
      ref="table"
      @page-change="fetch"
    >
      <a-table
        bordered
        :dataSource="list"
        :columns="columns"
        :locale="locale"
        :pagination="false"
      >
      </a-table>
    </data-table>
  </div>
</template>

<script>
// @ is an alias to /src
import { getTableList } from '@/api'

export default {
  name: 'home',
  data() {
    return {
      locale: {
        emptyText: '暂无数据'
      },
      search: {
        size: 10,
        page: 1
      },
      list: [],
      columns: [
        {
          title: '用户名',
          dataIndex: 'name',
          width: '33%',
          align: 'center',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '用户id',
          dataIndex: 'userId',
          width: '33%',
          align: 'center',
          scopedSlots: { customRender: 'userId' }
        },
        {
          title: '时间',
          dataIndex: 'lastDate',
          width: '33%',
          align: 'center',
          scopedSlots: { customRender: 'lastDate' }
        }
      ]
    }
  },
  mounted() {
    if (this.$store.state.search.listPagePars.has(this.$route.path)) {
      this.search = this.$store.state.search.listPagePars.get(this.$route.path)
    }
    this.fetch()
  },
  methods: {
    fetch(current) {
      this.search.page = current || this.search.page || 1
      this.$refs.table.fetch(getTableList, this.search).then(res => {
        this.list = res.data.list || []
        console.log(this.list)
      })
    }
  }
}
</script>