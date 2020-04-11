const module = {
  namespaced: true, // 开启命名空间
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
  }
}

export default module
