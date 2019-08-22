<template>
  <transition name="fade">
    <main
      v-if="!firstTimeLoading && items"
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
            <transition
              name="fade"
              mode="out-in"
            >
              <div
                v-if="!loading"
                key="items"
              >
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
                        >
                          Режим прогнозов
                        </label>
                      </div>
                    </div>
                    <div class="sort">
                      <a
                        class="sort__link sort__link_active sort__link_asc"
                        href="javascript:void(0);"
                        data-type="name"
                      >
                        По алфавиту
                      </a>
                      <a
                        class="sort__link"
                        href="javascript:void(0);"
                        data-type="price"
                      >
                        По цене
                      </a>
                    </div>
                  </div>
                  <div
                    v-if="!firstTimeLoading && !items.length"
                    class="product-element"
                  >
                    <strong>По Вашему запросу ничего не найдено</strong>
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
                  :total-count="total"
                  @pageChanged="(page) => currentPage = page"
                  @limitChanged="(lim) => limit = lim"
                />
              </div>
              <div
                v-else
                key="loader"
                class="collection-spinner__wrapper d-flex"
              >
                <b-spinner class="collection-spinner mx-auto" />
              </div>
            </transition>
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
    <div
      v-else
      class="loading-spinner"
    >
      <div
        class="spinner-border"
        role="status"
      >
        <span class="sr-only">Пожалуйста, подождите</span>
      </div>
    </div>
  </transition>
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
    firstTimeLoading: true,
    pageWatcherDisabled: false,
    loading: false,
    currentPage: 1,
    limit: 10,
    total: 0,
    breadcrumbs: null,
    items: null,
    filters: null,
    sort: '+name',
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
    limit() {
      this.pageWatcherDisabled = true;
      this.currentPage = 1;
      this.getCollection();
    },
    currentPage() {
      if (this.pageWatcherDisabled) {
        return;
      }

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
        /* eslint-disable */
        const { breadcrumbs, items, props, propTypes, total } = await this.$http.get(
          `collection/1.0/collections/byalias/${this.alias}/items`,
          {
            params: {
              limit: this.limit,
              skip: (this.currentPage - 1) * this.limit,
              sort: this.sort,
            },
          },
        );
        this.breadcrumbs = breadcrumbs;
        this.items = items;
        this.total = total;
        this.filters = propTypes.map(filter => {
          filter.values = props
            .find(prop => prop.name === filter.name)
            .values.map(value => {
              value.isChecked = false;
              return value;
            });
          return filter;
        });
      } finally {
        this.loading = false;
        this.firstTimeLoading = false;
        this.pageWatcherDisabled = false;
      }
    },
  },
};
</script>

<style lang="scss">
.collection-spinner {
  margin-top: 20vh;

  &__wrapper {
    min-height: 80vh;
  }
}
</style>
