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
};
</script>
