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

      if (!payload) {
        localStorage.removeItem('jwtacc');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    },
    setBackgroundBlur: (state, payload) => {
      state.isBackgroundBlurred = payload;
    },
    toggleSignOutModal: (state, payload) => {
      state.isSignOutModalShown = payload;
    },
    changeItemsQuantityInCart: (state, { item, quantity }) => {
      const matchIndex = state.cartItems.findIndex(it => it.guid === item.guid);

      if (~matchIndex) {
        state.cartItems[matchIndex].quantity += quantity;
      } else {
        const itemClone = clone(item);
        itemClone.quantity = quantity;
        state.cartItems.push(itemClone);
      }

      localStorage[`cart~${state.user.id}`] = JSON.stringify(state.cartItems);
    },
    removeItemFromCart: (state, payload) => {
      state.cartItems = state.cartItems.filter(it => it.guid !== payload.guid);
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
        priceBase: 0,
        priceWithNds: 0,
      };

      if (state.cartItems.length) {
        cart = state.cartItems.reduce((acc, it) => {
          acc.total += it.quantity;
          acc.priceWithNds += it.price.withNds * it.quantity;
          acc.priceBase += it.price.base * it.quantity;
          return acc;
        }, cart);
      }

      return cart;
    },
    getCartItem: state => id => {
      return state.cartItems.find(it => it.guid === id);
    },
  },
});

const cart = JSON.parse(localStorage.getItem(`cart~${store.state.user.id}`)) || [];
store.commit('initializeCart', cart);

export default store;
