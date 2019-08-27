<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="id"
      v-model="filter.isChecked"
      :disabled="filter.isDisabled || loading"
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
    loading: Boolean,
  },
  computed: {
    id() {
      return this.filter.value + String(Math.random());
    },
  },
};
</script>
