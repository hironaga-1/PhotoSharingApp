import { createRouter, createWebHistory } from 'vue-router';

import PhotoList from './pages/PhotoList.vue';
import Login from './pages/Login.vue';

const routes = [
    {
        path: '/',
        component: PhotoList,
    },
    {
        path: '/login',
        component: Login,
    }
];

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
      return { x: 0, y: 0 }
    },
    routes,
});

export default router