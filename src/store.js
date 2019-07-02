import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')),
        isSignOutModalShown: false,
        isBackgroundBlurred: false,
        isMenuShown: false,
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
    },
});

export default store;
