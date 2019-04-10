import Layout from '@/views/layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/operate',
  name: 'operate',
  meta: {
    title: '运营工具'
  },
  component: Layout,
  alwaysShow: true,
  children: [
    {
      path: 'appversion',
      name: 'operate_appversion',
      meta: {
        title: 'APP版本管理'
      },
      component: _import('appversion/manage')
    },
    {
      path: 'appversion/add',
      name: 'operate_appversion_add',
      meta: {
        title: '新增版本'
      },
      hidden: true,
      component: _import('appversion/add')
    },
    {
      path: 'appversion/:id/edit',
      name: 'operate_appversion_edit',
      meta: {
        title: '修改'
      },
      hidden: true,
      component: _import('appversion/edit')
    },
    {
      path: 'appversion/:id/users',
      name: 'operate_appversion_users',
      meta: {
        title: '查看用户列表'
      },
      hidden: true,
      component: _import('appversion/users')
    }
  ]
}
