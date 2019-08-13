<template>
  <main id="product-list">
    <div class="container">
      <div class="top-block">
        <div class="top-block__title">
          <h2 class="top-block__title__text">
            Автосигнализации двухсторонние
          </h2>
        </div>
      </div>
      <breadcrumbs
        :links="['Противоугон', 'Автосигнализации двухсторонние']"
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
            <!-- Элемент каталога -->
            <div class="product-element">
              <a
                href="javascript:void(0);"
                class="product-element__link"
              >
                <div class="product-element__image-block">
                  <img
                    src="images/product-preview.png"
                    class="product-element__image-block__image"
                  >
                </div>
                <div class="product-element__info">
                  <p class="product-element__info__title">Pandora DX 90B</p>
                  <p class="product-element__info__article">RB40012G</p>
                  <p class="product-element__info__description">Тестовое описание товара, которое занимает
                    порядочно места. На скринах тестового портала описание полностью дублирует название
                  </p>
                </div>
              </a>
              <div class="product-element__price">
                <div class="product-element__price-info">
                  <span class="product-element__price-info__title">Цена (без НДС):</span>
                  <span class="product-element__price-info__total bold">9 171.97 р</span>
                </div>
                <div class="product-element__price-info">
                  <span class="product-element__price-info__title">Цена (с НДС):</span>
                  <span class="product-element__price-info__total">11 006.36 р</span>
                </div>
                <div class="product-element__price-info">
                  <span class="product-element__price-info__title">МЦП (с НДС)*:</span>
                  <span class="product-element__price-info__total">20 237.29 р</span>
                </div>
              </div>
              <div class="product-element__buy">
                <div class="product-element__amount">
                  <span class="product-element__amount__value">123</span>
                  <div class="arrow-block">
                    <span class="arrow-block__top">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.138"
                        height="8.273"
                        viewBox="0 0 17.138 8.273"
                      >
                        <g
                          id="Symbol_22"
                          data-name="Symbol 22"
                          transform="translate(4005.138 1119.273) rotate(-180)"
                        >
                          <path
                            id="Path_3"
                            data-name="Path 3"
                            d="M3106.946,2498h17.138l-8.965,8.273Z"
                            transform="translate(881.054 -1387)"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <span class="arrow-block__bottom">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.138"
                        height="8.273"
                        viewBox="0 0 17.138 8.273"
                      >
                        <g
                          id="Symbol_2_19"
                          data-name="Symbol 2 – 19"
                          transform="translate(-3988 -1111)"
                        >
                          <path
                            id="Path_3"
                            data-name="Path 3"
                            d="M3106.946,2498h17.138l-8.965,8.273Z"
                            transform="translate(881.054 -1387)"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <button class="btn btn-primary-ford-orange">
                  <i class="material-icons">shopping_cart</i>
                  В корзину
                </button>
              </div>
            </div>
          </div>
          <pagination
            :current-page="currentPage"
            :per-page="perPage"
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

export default {
  name: 'Collection',
  components: {
    Breadcrumbs,
    Pagination,
  },
  props: {
    alias: String,
    id: String,
  },
  data: () => ({
    currentPage: 1,
    perPage: 10,
    limit: 10,
    totalCount: 0,
  }),
  computed: {},
  created() {},
  methods: {},
};
</script>
