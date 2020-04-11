import Vue from 'vue'
import Vuex from 'vuex'
// import home from './home/home'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isShow: false
  },
  mutations: {
    Show (state) {
      state.isShow = true
    },
    hide (state) {
      state.isShow = false
    }
  },
  actions: {}
  // modules: {
  //     home
  // },
})
