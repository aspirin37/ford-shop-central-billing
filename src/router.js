import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';

import Collection from '@/pages/Collection.vue';
import Basket from '@/pages/Basket.vue';

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
      path: '/collection/:alias',
      name: 'Collection',
      component: Collection,
      props: true,
    },
    {
      path: '/basket',
      name: 'Basket',
      component: Basket,
      props: true,
    },
    {
      path: '*',
      redirect: '/collection/prochie_aksessuary_raznoe',
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.commit('hideMenu');
  if (!localStorage.jwtacc && process.env.NODE_ENV !== 'development') {
    window.location.href = `/front-users/sign-in?from=central-billing${this.$route.fullPath}`;
  } else {
    next();
  }
});

export default router;
