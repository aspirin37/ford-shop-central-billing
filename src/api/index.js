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
  async response => response.data,
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
      window.location.href = '/front-users/sign-in';
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
