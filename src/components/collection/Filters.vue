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
          :loading="loading"
        />
        <div class="filter-block__element">
          <button
            type="submit"
            class="btn btn-primary-ford-orange"
            :disabled="loading"
            @click.prevent="applyFilters"
          >
            Показать
          </button>
          <button
            type="reset"
            class="btn btn-secondary-ford-gray"
            :disabled="loading"
            @click.prevent="resetFilters"
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
  name: 'CollectionFilters',
  components: {
    CollectionCheckboxGroup,
  },
  props: {
    filters: Array,
    loading: Boolean,
  },
  data: () => ({
    key: 0,
  }),
  computed: {
    filterState() {
      return this.filters.reduce((acc, prop) => {
        const checkedValues = prop.values.filter(it => it.isChecked);
        if (!checkedValues.length) {
          acc[prop.name] = null;
          return acc;
        }
        if (checkedValues.length === 1) {
          acc[prop.name] = checkedValues[0].value;
          return acc;
        }

        if (checkedValues.length > 1) {
          acc[prop.name] = checkedValues.map(it => it.value).join(',');
          return acc;
        }
      }, {});
    },
    filterRequestObject() {
      return this.filters.reduce((acc, prop) => {
        const checkedValues = prop.values.filter(it => it.isChecked);
        let objectKey;
        let objectValue;

        if (!checkedValues.length) {
          return acc;
        }

        if (checkedValues.length === 1) {
          objectKey = `properties~${prop.name}`;
          objectValue = checkedValues[0].value;
          acc[objectKey] = objectValue;
          return acc;
        }

        if (checkedValues.length > 1) {
          objectKey = `properties~${prop.name}[in]`;
          objectValue = checkedValues.map(it => it.value).join(',');
          acc[objectKey] = objectValue;
          return acc;
        }
      }, {});
    },
  },
  methods: {
    applyFilters() {
      this.$emit('applyFilters', this.filterRequestObject, this.filterState);
    },
    resetFilters() {
      this.filters.map(filterGroup => {
        return filterGroup.values.map(it => {
          it.isChecked = false;
        });
      });
      this.$emit('applyFilters', {});
    },
  },
};
</script>
