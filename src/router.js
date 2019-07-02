import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/pages/Main.vue';
import store from './store.js';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/main',
            name: 'Main',
            component: Main,
        },
        {
            path: '*',
            redirect: '/main',
        },
    ],
});

router.beforeEach((to, from, next) => {
    store.commit('hideMenu');
    next();
});

export default router;
