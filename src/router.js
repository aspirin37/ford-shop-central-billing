import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';

import Main from '@/pages/Main.vue';
import Collection from '@/pages/Collection.vue';

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
      path: '/collection/:alias',
      name: 'Collection',
      component: Collection,
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
