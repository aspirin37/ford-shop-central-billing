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
        <div class="filter-block">
          <div class="filter-block__item">
            <p class="filter-block__title">Поиск</p>
            <form id="search-form">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  name="search"
                  placeholder="Артикул, название"
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
            <p class="filter-block__title">Фильтр</p>
            <form id="fiter-form">
              <div class="filter-block__element">
                <p class="filter-block__element__title">Модель</p>
                <div class="custom-control custom-checkbox">
                  <input
                    id="checkbox1"
                    type="checkbox"
                    class="custom-control-input"
                  >
                  <label
                    class="custom-control-label"
                    for="checkbox1"
                  >Применяется ко всем
                    моделям</label>
                </div>
              </div>
              <div class="filter-block__element">
                <p class="filter-block__element__title">Бренд</p>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checkbox2"
                  >
                  <label
                    class="custom-control-label"
                    for="checkbox2"
                  >Bright Box</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checkbox3"
                  >
                  <label
                    class="custom-control-label"
                    for="checkbox3"
                  >Pandora</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checkbox4"
                  >
                  <label
                    class="custom-control-label"
                    for="checkbox4"
                  >Scher-Khan</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checkbox5"
                  >
                  <label
                    class="custom-control-label"
                    for="checkbox5"
                  >StarLine</label>
                </div>
              </div>
              <div class="filter-block__element">
                <p class="filter-block__element__title">Дополнительно</p>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checkbox6"
                  >
                  <label
                    class="custom-control-label"
                    for="checkbox6"
                  >Не нулевая цена</label>
                </div>
              </div>
              <div class="filter-block__element">
                <p class="filter-block__element__title">Сезон</p>
                <select
                  class="form-control"
                  type="text"
                >
                  <option
                    selected
                    value="Все"
                  >Все</option>
                  <option value="Два">Два</option>
                  <option value="Три">Три</option>
                  <option value="Четыре">Четыре</option>
                  <option value="Пять">Пять</option>
                </select>
              </div>
              <div class="filter-block__element">
                <p class="filter-block__element__title">Параметры</p>
                <div class="filter-block__element__select-block">
                  <span class="filter-block__element__select-block__title">Ширина</span>
                  <select
                    class="form-control"
                    type="text"
                  >
                    <option
                      selected
                      value="Все"
                    >Все</option>
                    <option value="Два">Два</option>
                    <option value="Три">Три</option>
                    <option value="Четыре">Четыре</option>
                    <option value="Пять">Пять</option>
                  </select>
                </div>
                <div class="filter-block__element__select-block">
                  <span class="filter-block__element__select-block__title">Профиль</span>
                  <select
                    class="form-control"
                    type="text"
                  >
                    <option
                      selected
                      value="Все"
                    >Все</option>
                    <option value="Два">Два</option>
                    <option value="Три">Три</option>
                    <option value="Четыре">Четыре</option>
                    <option value="Пять">Пять</option>
                  </select>
                </div>
                <div class="filter-block__element__select-block">
                  <span class="filter-block__element__select-block__title">Диаметр</span>
                  <select
                    class="form-control"
                    type="text"
                  >
                    <option
                      selected
                      value="Все"
                    >Все</option>
                    <option value="Два">Два</option>
                    <option value="Три">Три</option>
                    <option value="Четыре">Четыре</option>
                    <option value="Пять">Пять</option>
                  </select>
                </div>
              </div>
              <div class="filter-block__element">
                <button
                  type="submit"
                  class="btn btn-primary-ford-orange"
                >Показать</button>
                <button
                  type="reset"
                  class="btn btn-secondary-ford-gray"
                >Сбросить</button>
              </div>
            </form>
          </div>
        </div>
        <div class="content__wrapper">
          <div class="items-block">
            <div class="items-block__top">
              <div class="prognosis">
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customSwitch1"
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
                >По алфавиту</a>
                <a
                  class="sort__link"
                  href="javascript:void(0);"
                >По цене</a>
              </div>
            </div>
            <collection-item
              v-for="(it, i) in items"
              :key="i"
              :item="it"
            />
          </div>
          <pagination
            :current-page="currentPage"
            :limit="limit"
            :total-count="totalCount"
            @pageChanged="(page) => currentPage = page"
            @limitChanged="(lim) => limit = lim"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Pagination from '@/components/common/Pagination';
import CollectionItem from '@/components/collection/CollectionItem';

export default {
  name: 'Collection',
  components: {
    Breadcrumbs,
    Pagination,
    CollectionItem,
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
