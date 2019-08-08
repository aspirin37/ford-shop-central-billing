<template>
  <div class="breadcrumbs">
    <router-link
      to="/"
      class="breadcrumbs__home"
    >
      <i class="material-icons">home</i>
    </router-link>
    <a
      v-if="isCatalog"
      class="breadcrumbs__link"
    >
      <i class="material-icons">arrow_forward_ios</i>
      Каталог
    </a>
    <a
      v-for="(it, i) in links"
      :key="i"
      class="breadcrumbs__link"
      :class="{'active': i == links.length - 1}"
    >
      <i class="material-icons">arrow_forward_ios</i>
      {{ it }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    links: Array,
    isCatalog: Boolean,
  },
};
</script>
