import {createRouter, createWebHistory} from 'vue-router';
import store from '@/store/index.js';
import Login from '@/views/Login.vue';
import HomeLayout from '@/layout/HomeLayout/Index.vue';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner: false, speed: 1000})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeLayout,
            redirect: '/products',
            children: [
                {
                    path: 'products',
                    name: 'products',
                    component: () => import(/* webpackChunkName: "products" */ '@/views/Products.vue'),
                    meta: {requiresAuth: true}
                },
                {
                    path: 'orders',
                    name: 'orders',
                    component: () => import(/* webpackChunkName: "orders" */ '@/views/order/Index.vue'),
                    meta: {requiresAuth: true}
                },
            ]
        },
        /**
         {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
         **/
        /** 登录 **/
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {requiresAuth: false}
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
});


router.beforeEach((to, from, next) => {
    NProgress.start()
    const {__app_token__: app_token} = store.state
    if (to.meta.requiresAuth && (app_token == null)) {
        next({ path: '/login', replace: true, query: {} })
    }  else {
        next()
    }
})

router.afterEach(() => {
    console.log(1111111111)
    NProgress.done() // finish progress bar
})

export default router
