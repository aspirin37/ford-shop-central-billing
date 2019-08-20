<template>
  <div
    :key="key"
    class="filter-block__element"
  >
    <p class="filter-block__element__title">
      {{ filter._id }}
      <i class="material-icons">keyboard_arrow_down</i>
    </p>
    <div class="filter-block__element__wrapper">
      <div class="filter-block__element__wrapper__content active">
        <div
          class="filter-block__element__wrapper__content__reset"
          @click="resetFilters"
        >
          <span>сбросить фильтр</span>
        </div>
        <collection-checkbox
          v-for="(it, i) in filter.values"
          :key="i"
          :filter="it"
        />
        <div class="filter-block__element__wrapper__content__need-more">
          <span>показать еще</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionCheckbox from './Checkbox';

export default {
  name: 'CatalogCheckboxGroup',
  components: {
    CollectionCheckbox,
  },
  props: {
    filter: Object,
  },
  data: () => ({
    key: 0,
  }),
  methods: {
    resetFilters() {
      this.key++;
    },
  },
};
</script>
