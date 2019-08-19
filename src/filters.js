import Vue from 'vue';

Vue.filter('currency', value =>
  value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }));
