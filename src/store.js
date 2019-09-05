import Vue from 'vue';
import Vuex from 'vuex';
import clone from 'lodash.clonedeep';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isMenuShown: false,
    user: JSON.parse(localStorage.getItem('user')),
    isSignOutModalShown: false,
    isBackgroundBlurred: false,
    cartItems: [],
  },
  mutations: {
    toggleMenu: state => {
      state.isMenuShown = !state.isMenuShown;
    },
    hideMenu: state => {
      state.isMenuShown = false;
    },
    showMenu: state => {
      state.isMenuShown = true;
    },
    setUser: (state, payload) => {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    setBackgroundBlur: (state, payload) => {
      state.isBackgroundBlurred = payload;
    },
    toggleSignOutModal: (state, payload) => {
      state.isSignOutModalShown = payload;
    },
    addToCart: (state, payload) => {
      const matchIndex = state.cartItems.findIndex(it => it.guid === payload.guid);

      if (~matchIndex) {
        state.cartItems[matchIndex].quantity += payload.quantity;
      } else {
        state.cartItems.push(clone(payload));
      }

      localStorage[`cart~${state.user.id}`] = JSON.stringify(state.cartItems);
    },
    initializeCart: (state, payload) => {
      state.cartItems = payload;
    },
  },
  getters: {
    cart: state => {
      let cart = {
        items: state.cartItems,
        total: 0,
        price: 0,
      };

      if (state.cartItems.length) {
        cart = state.cartItems.reduce((acc, it) => {
          acc.total += it.quantity;
          acc.price += it.price.withNds * it.quantity;
          return acc;
        }, cart);
      }

      return cart;
    },
  },
});

const cart = JSON.parse(localStorage.getItem(`cart~${store.state.user.id}`)) || [];
store.commit('initializeCart', cart);

export default store;
