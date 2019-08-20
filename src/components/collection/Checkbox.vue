<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="id"
      v-model="isChecked"
      :disabled="!filter.count"
      type="checkbox"
      class="custom-control-input"
    >
    <label
      class="custom-control-label"
      :for="id"
    >
      {{ filter.value }}
      <span class="amount">{{ filter.count ? `(${filter.count})` : '' }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CatalogCheckbox',
  props: {
    filter: Object,
  },
  data: () => ({
    isChecked: false,
  }),
  computed: {
    id() {
      return this.filter.value + String(Math.random());
    },
  },
};
</script>
