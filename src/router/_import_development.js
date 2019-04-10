// 开发环境使用Common.js方式引入，加快热加载
module.exports = file => require('@/views/' + file + '/index.vue').default
