import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
// 引入全局样式
import '@/stylesheets/main.scss'

// 导入rem.js
import '@/utils/rem.js'

// 加载自定义指令文件 directive.js
import '@/utils/directives.js'
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
