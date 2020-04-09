import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
import Home from '@/views/home.vue'
import crossborder from "@/views/crossborder"
const routes = [{
        path: "/",
        redirect: "/home"
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/crossborder',
        component: crossborder
    },
    {
        path: '/women',
        component: () =>
            import ("@/views/women.vue")

    },
    {
        path: '/cosmetics',
        component: () =>
            import ("@/views/cosmetics.vue")

    },
    {
        path: '/men',
        component: () =>
            import ("@/views/men.vue")

    },
    {
        path: '/cosmetics',
        component: () =>
            import ("@/views/cosmetics.vue")

    },
    {
        path: '/lifestyle',
        component: () =>
            import ("@/views/lifestyle.vue")

    },
    {
        path: '/kids',
        component: () =>
            import ("@/views/kids.vue")

    },
    {
        path: '/upcoming',
        component: () =>
            import ("@/views/upcoming.vue")

    },
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router