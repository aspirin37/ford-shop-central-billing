<template>
    <div id="app">
        <app-header />
        <router-view />
        <sign-out-modal />
    </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader';
import SignOutModal from '@/components/common/SignOutModal';

export default {
    name: 'App',
    components: {
        AppHeader,
        SignOutModal,
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
