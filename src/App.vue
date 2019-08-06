<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>
