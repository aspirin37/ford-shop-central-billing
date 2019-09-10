<template>
  <b-modal
    v-model="isShown"
    no-close-on-backdrop
    hide-header
    hide-footer
    centered
    no-fade
    @hide="redirect"
  >
    <form
      id="unloginModal"
      @submit.prevent="redirect"
    >
      <div class="modal-body unloginModal">
        <h2 class="modal-title">
          Время сессии истекло, вы будете перенаправлены на страницу авторизации
        </h2>
        <button
          type="submit"
          class="btn btn-primary-ford-orange modal-ext"
        >
          Авторизоваться
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LogoutRedirect',
  data: () => ({
    isShown: false,
  }),
  computed: {
    ...mapState(['isSignOutModalShown']),
  },
  watch: {
    isSignOutModalShown(isShown) {
      if (isShown) {
        this.isShown = true;
        this.$store.commit('setBackgroundBlur', true);
        return;
      }
      this.isShown = false;
      this.$store.commit('setBackgroundBlur', false);
    },
  },
  mounted() {
    if (this.isShown) {
      this.$store.commit('setBackgroundBlur', true);
    }
  },
  methods: {
    redirect() {
      this.$store.commit('setUser', null);
      this.$store.commit('toggleSignOutModal', false);

      if (process.env.NODE_ENV !== 'development') {
        window.location.href = `/front-users/sign-in?from=central-billing${this.$route.fullPath}`;
      }
    },
  },
};
</script>
