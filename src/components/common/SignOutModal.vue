<template>
    <form
        id="unloginModal"
        @submit.prevent="redirect"
    >
        <b-modal
            v-model="value"
            no-close-on-backdrop
            hide-header
            hide-footer
            centered
            no-fade
            @hide="redirect"
        >
            <div class="modal-body unloginModal">
                <h2 class="modal-title">
                    Время сессии истекло, вы будете перенаправлены на страницу авторизации через {{ seconds }}
                </h2>
                <button
                    type="submit"
                    class="btn btn-primary-ford-orange modal-ext"
                >
                    Авторизоваться
                </button>
            </div>
        </b-modal>
    </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'LogoutRedirect',
    data: () => ({
        value: false,
        seconds: 10,
        timerID: null,
    }),
    computed: {
        ...mapState(['isSignOutModalShown']),
    },
    watch: {
        isSignOutModalShown(value) {
            if (value) {
                this.value = true;
                this.$store.commit('setBackgroundBlur', true);
                this.timerID = setInterval(() => {
                    if (this.seconds === 1) {
                        this.redirect();
                    }
                    this.seconds--;
                }, 1000);
                return;
            }
            this.value = false;
            this.$store.commit('setBackgroundBlur', false);
        },
    },
    methods: {
        hideModal() {
            this.$emit('input', false);
        },
        redirect() {
            this.hideModal();
            this.$store.commit('setUser', null);
            this.$store.commit('toggleSignOutModal', false);
            this.$router.push('sign-in');
            clearInterval(this.timerID);
        },
    },
};
</script>
