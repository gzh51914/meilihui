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
  // 一起改为懒加载  == Sia
  path: '/crossborder',
  component: () =>
    import('@/views/crossborder.vue')
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
// 家具列表页路由
{
  name: 'lifelist',
  path: '/lifelist/:id',
  component: () => import('@/views/lifelist/lifelist'),
  props: true
},
// 婴儿列表页路由
{
  name: 'kidslist',
  path: '/kidslist/:id',
  component: () => import('@/views/kidslist/kidslist'),
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

}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
