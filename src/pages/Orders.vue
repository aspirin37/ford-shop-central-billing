<template>
  <main id="orders">
    <div class="container">
      <div class="top-block">
        <div class="top-block__title">
          <h2 class="top-block__title__text">
            Оформление заказа
          </h2>
        </div>
      </div>
      <div class="dealer-info">
        <div class="dealer-info__wrapper">
          <div class="dealer-info__description">
            <div class="dealer-info__description__icon-wrapper">
              <i class="material-icons">star</i>
            </div>
            <div class="dealer-info__description__info">
              <span class="dealer-info__description__text">Автоград Гарант</span>
              <span class="dealer-info__description__mail">ltkachev@ford.com</span>
            </div>
          </div>
          <div class="dealer-info__address">
            <div class="form-group">
              <label
                for="address"
                class="col-form-label"
              >Выберите адрес доставки</label>
              <select
                id="address"
                class="custom-select"
                type="text"
              >
                <option
                  selected
                  disabled
                >Не выбрано</option>
                <option value="1">Address #1</option>
                <option value="2">Address #2</option>
                <option value="3">Address #3</option>
                <option value="4">Address #4</option>
                <option value="5">Address #5</option>
              </select>
            </div>
          </div>
          <div class="dealer-info__date">
            <div class="input-group">
              <label
                for="date"
                class="col-form-label"
              >Желаемая дата поставки</label>
              <input
                type="text"
                id="date"
                class="form-control"
                placeholder="__.__.____"
                aria-describedby="data"
              >
              <div class="input-group-append">
                <span
                  class="input-group-text"
                  id="data"
                ><i class="material-icons md-dark-blue">event</i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- в .deal находится обычная таблица, без всяких врапперов, здесь в них нет необходимости -->
      <div class="deal">
        <span class="deal__description">РЕМОТО</span>
        <table class="deal__table table">
          <thead>
            <tr>
              <th
                class="name-th sortable"
                scope="col"
              >
                <div class="table__header">
                  Название
                </div>
              </th>
              <th scope="col">
                <div class="table__header">
                  Цена (без НДС)
                </div>
              </th>
              <th scope="col">
                <div class="table__header">
                  Скидка</div>
              </th>
              <th scope="col">
                <div class="table__header">
                  Количество</div>
              </th>
              <th scope="col">
                <div class="table__header">
                  Сумма (без НДС)</div>
              </th>
              <th
                class="date-th"
                scope="col"
              >
                <div class="table__header">
                  Дата поставки</div>
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td class="balance">Кредитный остаток: <strong>3 159 076.25</strong></td>
              <td class="null-td"></td>
              <td class="null-td"></td>
              <td>Общее количество: <strong>395</strong></td>
              <td>Сумма: <strong>45 859.85 Р</strong></td>
              <td class="null-td"></td>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <td class="name-td">Pandora DX 90B</td>
              <td class="price-td">9 171.97 Р</td>
              <td>0%</td>
              <td>23</td>
              <td class="price-td">9 171.97 Р</td>
              <td class="date-td">
                <div class="input-group">
                  <input
                    type="text"
                    id="date"
                    class="form-control"
                    placeholder="__.__.____"
                    aria-describedby="data"
                  >
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      id="data"
                    ><i class="material-icons md-dark-blue">event</i></span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="name-td">Pandora DX 90B</td>
              <td class="price-td">9 171.97 Р</td>
              <td>0%</td>
              <td>23</td>
              <td class="price-td">9 171.97 Р</td>
              <td class="date-td">
                <div class="input-group">
                  <input
                    type="text"
                    id="date"
                    class="form-control"
                    placeholder="__.__.____"
                    aria-describedby="data"
                  >
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      id="data"
                    ><i class="material-icons md-dark-blue">event</i></span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="name-td">Pandora DX 90B</td>
              <td class="price-td">9 171.97 Р</td>
              <td>0%</td>
              <td>23</td>
              <td class="price-td">9 171.97 Р</td>
              <td class="date-td">
                <div class="input-group">
                  <input
                    type="text"
                    id="date"
                    class="form-control"
                    placeholder="__.__.____"
                    aria-describedby="data"
                  >
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      id="data"
                    ><i class="material-icons md-dark-blue">event</i></span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="name-td">Pandora DX 90B</td>
              <td class="price-td">9 171.97 Р</td>
              <td>0%</td>
              <td>23</td>
              <td class="price-td">9 171.97 Р</td>
              <td class="date-td">
                <div class="input-group">
                  <input
                    type="text"
                    id="date"
                    class="form-control"
                    placeholder="__.__.____"
                    aria-describedby="data"
                  >
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      id="data"
                    ><i class="material-icons md-dark-blue">event</i></span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="name-td">Pandora DX 90B</td>
              <td class="price-td">9 171.97 Р</td>
              <td>0%</td>
              <td>23</td>
              <td class="price-td">9 171.97 Р</td>
              <td class="date-td">
                <div class="input-group">
                  <input
                    type="text"
                    id="date"
                    class="form-control"
                    placeholder="__.__.____"
                    aria-describedby="data"
                  >
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      id="data"
                    ><i class="material-icons md-dark-blue">event</i></span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="deal">
        <span class="deal__description">Аларм Трейд</span>
        <table class="deal__table table">
          <thead>
            <tr>
              <th
                class="name-th"
                scope="col"
              >
                <div class="table__header">
                  Название</div>
              </th>
              <th scope="col">
                <div class="table__header">
                  Цена (без НДС)</div>
              </th>
              <th scope="col">
                <div class="table__header">
                  Скидка</div>
              </th>
              <th scope="col">
                <div class="table__header">
                  Количество</div>
              </th>
              <th scope="col">
                <div class="table__header">
                  Сумма (без НДС)</div>
              </th>
              <th
                class="date-th"
                scope="col"
              >
                <div class="table__header">
                  Дата поставки</div>
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td class="balance">Кредитный остаток: <strong>3 159 076.25</strong></td>
              <td class="null-td"></td>
              <td class="null-td"></td>
              <td>Общее количество: <strong>395</strong></td>
              <td>Сумма: <strong>45 859.85 Р</strong></td>
              <td class="null-td"></td>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <td class="name-td">Pandora DX 90B</td>
              <td class="price-td">9 171.97 Р</td>
              <td>0%</td>
              <td>23</td>
              <td class="price-td">9 171.97 Р</td>
              <td class="date-td">
                <div class="input-group">
                  <input
                    type="text"
                    id="date"
                    class="form-control"
                    placeholder="__.__.____"
                    aria-describedby="data"
                  >
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      id="data"
                    ><i class="material-icons md-dark-blue">event</i></span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="name-td">Pandora DX 90B</td>
              <td class="price-td">9 171.97 Р</td>
              <td>0%</td>
              <td>23</td>
              <td class="price-td">9 171.97 Р</td>
              <td class="date-td">
                <div class="input-group">
                  <input
                    type="text"
                    id="date"
                    class="form-control"
                    placeholder="__.__.____"
                    aria-describedby="data"
                  >
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      id="data"
                    ><i class="material-icons md-dark-blue">event</i></span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="name-td">Pandora DX 90B</td>
              <td class="price-td">9 171.97 Р</td>
              <td>0%</td>
              <td>23</td>
              <td class="price-td">9 171.97 Р</td>
              <td class="date-td">
                <div class="input-group">
                  <input
                    type="text"
                    id="date"
                    class="form-control"
                    placeholder="__.__.____"
                    aria-describedby="data"
                  >
                  <div class="input-group-append">
                    <span
                      class="input-group-text"
                      id="data"
                    ><i class="material-icons md-dark-blue">event</i></span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="calculate-block">
        <div class="calculate-block__wrapper">
          <div class="calculate-block__item">
            <span class="calculate-block__item__title">Сумма:</span>
            <span>9 171.97 Р</span>
          </div>
          <div class="calculate-block__item">
            <span class="calculate-block__item__title">НДС:</span>
            <span>10 393.72 Р</span>
          </div>
          <div class="calculate-block__item">
            <span class="calculate-block__item__title">Сумма с НДС:</span>
            <span>
              <strong>62 362.30 Р</strong>
            </span>
          </div>
          <button class="btn btn-primary-ford-orange button-correct">
            <i class="material-icons">shopping_cart</i>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default {
  name: 'Orders',
  components: {
    Breadcrumbs,
  },
  data: () => ({}),
  computed: {},
  created() {},
  methods: {},
};
</script>
