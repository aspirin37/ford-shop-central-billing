<template>
  <div class="pagination">
    <nav>
      <b-pagination
        :value="currentPage"
        :total-rows="totalCount"
        :per-page="limit"
        @input="changePage"
      />
    </nav>
    <div class="form-group">
      <select
        id="quantity"
        class="form-control"
        :value="limit"
        @change="changeLimit"
      >
        <option>10</option>
        <option>20</option>
        <option>30</option>
        <option>40</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(currentPage) {
      this.$emit('pageChanged', currentPage);
      window.scroll({ top: 0 });
    },
    changeLimit(evt) {
      this.$emit('limitChanged', +evt.target.value);
      window.scroll({ top: 0 });
    },
  },
};
</script>
