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
