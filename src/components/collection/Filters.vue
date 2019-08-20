<template>
  <div class="filter-block">
    <div class="filter-block__item">
      <form id="search-form">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            name="search"
            placeholder="Название, артикул"
          >
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="material-icons">search</i>
            </span>
          </div>
        </div>
      </form>
    </div>
    <div class="filter-block__item">
      <form id="filter-form">
        <collection-checkbox-group
          v-for="(filter, i) in filters"
          :key="i"
          :position="i"
          :filter="filter"
        />
        <div class="filter-block__element">
          <button
            type="submit"
            class="btn btn-primary-ford-orange"
          >
            Показать
          </button>
          <button
            type="reset"
            class="btn btn-secondary-ford-gray"
          >
            Сбросить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CollectionCheckboxGroup from './CheckboxGroup';

export default {
  name: 'CatalogFilters',
  components: {
    CollectionCheckboxGroup,
  },
  props: {
    filters: Array,
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
