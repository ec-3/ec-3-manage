import {createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/Login.vue';
import HomeLayout from '@/layout/HomeLayout/Index.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
                    meta: {requiresAuth: false}
                },
                {
                    path: 'orders',
                    name: 'orders',
                    component: () => import(/* webpackChunkName: "orders" */ '@/views/Orders.vue'),
                    meta: {requiresAuth: false}
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
    ]
})

export default router
