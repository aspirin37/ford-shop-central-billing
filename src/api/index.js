import axios from 'axios';
import app from '../main';
import store from '../store';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  headers: {
    jwtacc: localStorage.getItem('jwtacc'),
  },
});

axiosInstance.interceptors.response.use(
  async response => {
    // если в хедере есть jwtacc, логинимся и получаем юзера
    if (response.headers.jwtacc) {
      localStorage.setItem('jwtacc', response.headers.jwtacc);
      axiosInstance.defaults.headers.jwtacc = response.headers.jwtacc;

      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      if (!store.state.user) {
        const user = await axiosInstance.get('user/1.0/self-user');
        store.commit('setUser', user);
      }
    }
    return response.data;
  },
  async error => {
    if (!error.response) {
      return Promise.reject(error);
    }

    // редиректы на страницу авторизации
    if (error.response.status === 401 && app.$route.name !== 'SignIn') {
      if (localStorage.getItem('jwtacc')) {
        store.commit('toggleSignOutModal', true);
        return;
      }

      if (process.env.NODE_ENV !== 'development') {
        window.location.href = `/front-users/sign-in?from=central-billing${app.$route.fullPath}`;
      }
    }

    // всплывашка с ошибками
    if (error.response.status !== 401) {
      app.$bvToast.toast(error.response.data.error.message, {
        title: 'Ошибка',
        variant: 'danger',
        solid: true,
        autoHideDelay: 15000,
      });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
