<template>
  <main
    v-if="!loading && items"
    id="product-list"
  >
    <div class="container">
      <div class="top-block">
        <div class="top-block__title">
          <h2 class="top-block__title__text">
            {{ pageTitle }}
          </h2>
        </div>
      </div>
      <breadcrumbs
        :links="breadcrumbsLinks"
        is-catalog
      />
      <div class="content">
        <collection-filters :filters="filters" />
        <div class="content__wrapper">
          <div class="items-block">
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
                  >Режим прогнозов</label>
                </div>
              </div>
              <div class="sort">
                <!-- классы сортировки - asc и desc -->
                <a
                  class="sort__link sort__link_active sort__link_asc"
                  href="javascript:void(0);"
                >
                  По алфавиту
                </a>
                <a
                  class="sort__link"
                  href="javascript:void(0);"
                >
                  По цене
                </a>
              </div>
            </div>
            <collection-item
              v-for="(it, i) in items"
              :key="i"
              :item="it"
            />
          </div>
          <pagination
            v-if="items.length"
            :current-page="currentPage"
            :limit="limit"
            :total-count="totalCount"
            @pageChanged="(page) => currentPage = page"
            @limitChanged="(lim) => limit = lim"
          />
        </div>
      </div>
    </div>
    <div
      id="filter-modal"
      class="filter-modal"
    >
      <span>Найдено:</span>
      <span class="value">10</span>
      <button
        class="btn"
        type="button"
      >
        Показать
      </button>
    </div>
  </main>
</template>

<script>
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Pagination from '@/components/common/Pagination';
import CollectionItem from '@/components/collection/Item';
import CollectionFilters from '@/components/collection/Filters';

export default {
  name: 'Collection',
  components: {
    Breadcrumbs,
    Pagination,
    CollectionItem,
    CollectionFilters,
  },
  props: {
    alias: String,
    id: String,
  },
  data: () => ({
    loading: false,
    currentPage: 1,
    limit: 10,
    totalCount: 0,
    breadcrumbs: null,
    items: null,
    filters: null,
  }),
  computed: {
    breadcrumbsLinks() {
      return this.breadcrumbs.map(it => it.name);
    },
    pageTitle() {
      return this.breadcrumbsLinks[this.breadcrumbsLinks.length - 1];
    },
  },
  watch: {
    alias() {
      this.getCollection();
    },
  },
  created() {
    this.getCollection();
  },
  methods: {
    async getCollection() {
      this.loading = true;
      try {
        const { breadcrumbs, items, props } = await this.$http.get(`collection/1.0/collections/byalias/${this.alias}/items`, {
          params: {
            limit: this.limit,
            offset: (this.currentPage - 1) * this.limit,
          },
        });
        this.breadcrumbs = breadcrumbs;
        this.items = items;
        this.filters = props;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
