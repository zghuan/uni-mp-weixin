import Vue from 'vue'
import App from './App'
import store from './store'
import uView from 'uview-ui'
Vue.use(uView)
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
