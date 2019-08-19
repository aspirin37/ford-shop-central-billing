import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import filters from './filters';
import axiosInstance from './api';

import './styles/index.scss';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$http = axiosInstance;

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});

export default app;
