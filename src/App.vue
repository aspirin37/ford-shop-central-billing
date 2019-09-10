<template>
  <div
    id="app"
    :class="{'blurred': isBackgroundBlurred }"
  >
    <template v-if="user">
      <app-header />
      <keep-alive include="Collection">
        <router-view />
      </keep-alive>
    </template>
    <sign-out-modal />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AppHeader from '@/components/common/AppHeader';
import SignOutModal from '@/components/common/SignOutModal';

export default {
  name: 'App',
  components: {
    AppHeader,
    SignOutModal,
  },
  computed: {
    ...mapState(['isBackgroundBlurred', 'user']),
  },
  created() {
    this.updateRefreshToken();
    setInterval(() => {
      this.updateRefreshToken();
    }, 10 * 60 * 1000);
  },
  methods: {
    async updateRefreshToken() {
      if (localStorage.refreshToken) {
        await this.$http.post('user/1.0/token-validate', {
          token: localStorage.refreshToken,
        });
      }
    },
  },
};
</script>
