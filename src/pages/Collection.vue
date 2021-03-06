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
          is-collection
        />
        <div class="content">
          <collection-filters
            :filters="filters"
            :loading="loading"
            :prev-filter-state="prevFilterState"
            @applyFilters="applyFilters"
            @updateFilterState="updateFilterState"
          />
          <div class="content__wrapper">
            <div class="items-block">
              <collection-top-options
                :sort="sort"
                :loading="loading"
                @sortChanged="(val) => sort = val"
              />
              <transition
                name="fade"
                mode="out-in"
              >
                <div
                  v-if="!loading"
                  key="items"
                >
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
                <div
                  v-else
                  key="loader"
                  class="collection-spinner__wrapper d-flex"
                >
                  <b-spinner class="collection-spinner mx-auto" />
                </div>
              </transition>
            </div>
            <transition
              name="fade"
              mode="out-in"
            >
              <pagination
                v-if="!loading && items.length"
                :current-page="currentPage"
                :limit="limit"
                :total-count="total"
                @pageChanged="(page) => currentPage = page"
                @limitChanged="(lim) => limit = lim"
              />
            </transition>
          </div>
        </div>
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
import CollectionTopOptions from '@/components/collection/TopOptions';

export default {
  name: 'Collection',
  components: {
    Breadcrumbs,
    Pagination,
    CollectionItem,
    CollectionFilters,
    CollectionTopOptions,
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
    filterState: {},
    prevFilterState: {},
    filterRequestObject: {},
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
      this.pageWatcherDisabled = true;
      Object.assign(this.$data, this.$options.data());
      this.getCollection();
    },
    sort() {
      this.pageWatcherDisabled = true;
      this.currentPage = 1;
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

      this.getCollection(true);
    },
  },
  created() {
    this.getCollection();
  },
  methods: {
    async getCollection(pageChanged) {
      this.loading = true;
      try {
        if (this.firstTimeLoading || !Object.keys(this.filterRequestObject).length) {
          /* eslint-disable */
          const { breadcrumbs, items, props, propTypes, total } = await this.$http.get(
            `collection/1.0/collections/byalias/${this.alias}/items`,
            {
              params: {
                limit: this.limit,
                skip: (this.currentPage - 1) * this.limit,
                sort: this.sort,
                ...this.filterRequestObject,
              },
            },
          );
          this.breadcrumbs = breadcrumbs;
          this.items = items;
          this.total = total;
          this.filters = propTypes.map(filterGroup => {
            filterGroup.values = props
              .find(prop => prop.name === filterGroup.name)
              .values.map(value => {
                value.isChecked = false;
                value.isDisabled = false;
                return value;
              });
            return filterGroup;
          });

          this.prevFilterState = this.filters.reduce((acc, prop) => {
            acc[prop.name] = null;
            return acc;
          }, {});

          this.filterState = JSON.parse(JSON.stringify(this.prevFilterState));
          return;
        }

        const { items, props, total } = await this.$http.get(`collection/1.0/collections/byalias/${this.alias}/items`, {
          params: {
            limit: this.limit,
            skip: (this.currentPage - 1) * this.limit,
            sort: this.sort,
            ...this.filterRequestObject,
          },
        });
        this.items = items;
        this.total = total;

        if (pageChanged) {
          return;
        }
        this.filters = this.filters.map(filterGroup => {
          const [, currentFilterGroupState] = Array.from(Object.entries(this.filterState)).find(([key, val]) => key === filterGroup.name);
          const [, prevFilterGroupState] = Array.from(Object.entries(this.prevFilterState)).find(([key, val]) => key === filterGroup.name);

          // Ничего не делаем с группой инпутов, если юзер делал в ней изменения с прошлой загрузки данных
          if (currentFilterGroupState && currentFilterGroupState !== prevFilterGroupState) {
            filterGroup.values.map(it => {
              it.isDisabled = false;
              return it;
            });
            return filterGroup;
          }

          const newFilterGroupInfo = props.find(prop => prop.name === filterGroup.name);

          // Если сервер не вернул информации по группе инпутов, обнуляем счетчики значений и блокируем их
          if (!newFilterGroupInfo) {
            filterGroup.values = filterGroup.values.map(value => {
              value.count = 0;
              value.isDisabled = true;
              return value;
            });
            return filterGroup;
          }

          // обновляем счетчики и состояние инпутов в соответствии с ответом с сервера
          filterGroup.values = filterGroup.values.map(it => {
            const match = newFilterGroupInfo.values.find(prop => prop.value === it.value);
            if (match) {
              it.count = match.count;
              it.isDisabled = false;
              return it;
            }

            it.count = 0;
            it.isDisabled = true;
            return it;
          });

          return filterGroup;
        });
        this.prevFilterState = this.filterState;
      } finally {
        this.loading = false;
        this.firstTimeLoading = false;
        this.pageWatcherDisabled = false;
      }
    },
    applyFilters(filters) {
      this.pageWatcherDisabled = true;
      this.currentPage = 1;
      this.filterRequestObject = filters;
      this.getCollection();
    },
    updateFilterState(filterState) {
      this.filterState = filterState;
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
