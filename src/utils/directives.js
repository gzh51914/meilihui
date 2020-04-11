import Swiper from 'swiper'
import Vue from 'vue'
Vue.directive('swiper', {
  inserted (el, binding, vnode) {
    // 代表最后一个元素插入完毕了，再进进行一次实例化操作就可以了
    if (binding.value.current === binding.value.length - 1) {
      // eslint-disable-next-line
      new Swiper('.' + binding.value.swipe, { // 默认swiper执行3次，因为插入了3个swiper-slide的真实dom
        ...binding.value.free
        // loop: true,
        // pagination: {
        //     el: ".swiper-pagination",
        // },
        // autoplay: {
        //     delay: 2000
        // },
      })
    }
  }
})

// //封装自定义指令v-title
Vue.directive('title', {
  inserted (el, binding) {
    el.style.opacity = 0
    window.onscroll = () => {
      if (
        (document.body.scrollTop || document.documentElement.scrollTop) > binding.value) {
        el.style.opacity = 1
      } else {
        el.style.opacity = 0
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
