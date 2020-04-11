import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  name: 'Home',
  component: Home
},
{
  name: 'detial',
  path: '/detial/:id',
  component: () =>
    import('@/views/Detial/detial'),
  props: true
},
{
  name: 'goodsInfo',
  path: '/goodsInfo/:id2/:id',
  component: () =>
    import('@/views/Detial/goodsInfo'),
  props: true
},
{
  // 一起改为懒加载  == Sia
  path: '/crossborder',
  component: () =>
    import('@/views/crossborder.vue')
},

// 海外和美妆的列表页跳转 ==Sia
{
  name: 'productlists',
  path: '/productlists/:id&:title',
  component: () =>
    import('@/views/productlists.vue'),
  props: true
},
{
  path: '/women',
  component: () =>
    import('@/views/women.vue')

},
{
  path: '/cosmetics',
  component: () =>
    import('@/views/cosmetics.vue')

},
{
  path: '/men',
  component: () =>
    import('@/views/men.vue')

},
{
  path: '/cosmetics',
  component: () =>
    import('@/views/cosmetics.vue')

},
{
  path: '/lifestyle',
  component: () =>
    import('@/views/lifestyle.vue')

},
{
  path: '/kids',
  component: () =>
    import('@/views/kids.vue')

},
{
  path: '/upcoming',
  component: () =>
    import('@/views/upcoming.vue')

}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
