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
// 女士列表页路由
{
  name: 'womenlist',
  path: '/womenlist/:id',
  component: () =>
    import('@/views/womenlist/womenlist'),
  props: true
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
// 男士列表页路由
{
  name: 'menlist',
  path: '/menlist/:id',
  component: () =>
    import('@/views/menlist/menlist'),
  props: true
},
{
  name: 'menlist',
  path: '/menlist/:id',
  component: () =>
    import('@/views/menlist/menlist'),
  props: true
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
// 家具列表页路由
{
  name: 'lifelist',
  path: '/lifelist/:id',
  component: () =>
    import('@/views/lifelist/lifelist'),
  props: true
},
// 家具详情页路由
{
  name: 'lifedetail',
  path: '/lifelist/:id/:id2',
  component: () =>
    import('@/views/lifelist/lifedetail/lifedetial'),
  props: true
},
// 婴儿列表页路由
{
  name: 'kidslist',
  path: '/kidslist/:id',
  component: () =>
    import('@/views/kidslist/kidslist'),
  props: true
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

},
{
  path: '*',
  redirect: '/home' // 所有都匹配不上就直接返回首页
}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
