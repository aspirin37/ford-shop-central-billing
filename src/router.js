import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';

import Main from '@/pages/Main.vue';
import Collection from '@/pages/Collection.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: 'central-billing',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.name !== from.name) {
      return { y: 0 };
    }
  },
  routes: [
    {
      path: '/',
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
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.commit('hideMenu');
  if (!localStorage.jwtacc && to.name !== 'SignIn') {
    next({
      path: '/sign-in',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
