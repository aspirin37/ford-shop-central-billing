<template>
  <div class="items-block__top">
    <div class="prognosis">
      <div class="custom-control custom-switch">
        <input
          id="customSwitch1"
          type="checkbox"
          class="custom-control-input"
        >
        <label
          class="custom-control-label"
          for="customSwitch1"
        >
          Режим прогнозов
        </label>
      </div>
    </div>
    <div class="sort">
      <a
        v-for="(it, i) in fields"
        :key="i"
        class="sort__link"
        :class="getSortClass(it.sortKey)"
        href="javascript:void(0);"
        @click="changeSortKey(it.sortKey)"
      >
        {{ it.label }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionTopOptions',
  props: {
    sort: String,
    loading: Boolean,
  },
  data: () => ({
    sortKey: 'name',
    reverse: false,
    fields: [
      {
        label: 'По алфавиту',
        sortKey: 'name',
      },
      {
        label: 'По цене',
        sortKey: 'price',
      },
    ],
  }),
  methods: {
    changeSortKey(sortKey) {
      if (this.loading) {
        return;
      }

      this.reverse = this.sortKey === sortKey ? !this.reverse : false;
      this.sortKey = sortKey;

      const sort = (this.reverse ? '-' : '+') + this.sortKey;
      this.$emit('sortChanged', sort);
    },
    getSortClass(sortKey) {
      return { [`sort__link_active ${this.reverse ? 'sort__link_desc' : 'sort__link_asc'}`]: this.sortKey === sortKey };
    },
  },
};
</script>
