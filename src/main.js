import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
        return routerPush.call(this, location).catch(error => error)
    }
    // 引入全局样式
import "@/stylesheets/main.scss"
Vue.config.productionTip = false

//导入rem.js
import "@/utils/rem.js"

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')