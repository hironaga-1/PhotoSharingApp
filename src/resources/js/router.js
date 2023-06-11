import { createRouter, createWebHistory } from 'vue-router';

import PhotoList from './pages/PhotoList.vue';
import Login from './pages/Login.vue';
import SystemError from './pages/errors/System.vue';
import store from './store';

const routes = [
    {
        path: '/',
        component: PhotoList,
    },
    {
        path: '/login',
        component: Login,
        beforeEnter (to, from, next) {
            if (store.getters['auth/check']) {
                next('/')
            } else {
                next()
            }
        }
    },
    {
        path: '/500',
        component: SystemError
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router