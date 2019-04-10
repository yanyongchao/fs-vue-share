import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.less'
import './plugins/ant.js'
import './icons'
import 'nprogress/nprogress.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import FetchButton from './components/FetchButton'
import DataTable from './components/DataTable'
import hasPermission from '@/directives/has'
import './permission'

Vue.config.productionTip = false

Vue.use(Viewer)
Vue.use(hasPermission)

Vue.component(FetchButton.name, FetchButton)
Vue.component(DataTable.name, DataTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
