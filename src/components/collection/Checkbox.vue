<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="id"
      v-model="filter.isChecked"
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
  name: 'CollectionCheckbox',
  props: {
    filter: Object,
  },
  computed: {
    id() {
      return this.filter.value + String(Math.random());
    },
  },
};
</script>
