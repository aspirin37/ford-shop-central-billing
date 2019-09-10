<template>
  <div class="deal">
    <span class="deal__description">{{ supplier }}</span>
    <table class="deal__table table">
      <thead>
        <tr>
          <th class="table__header article-th">
            Артикул
          </th>
          <th class="table__header name-th">
            Название
          </th>
          <th class="table__header table-cell-width-150">
            Цена (без НДС)
          </th>
          <th class="table__header table-cell-width-100">
            Скидка
          </th>
          <th class="table__header table-cell-width-130">
            Количество
          </th>
          <th class="table__header table-cell-width-180">
            Сумма (без НДС)
          </th>
          <th class="table__header table-cell-width-50"></th>
        </tr>
      </thead>
      <tbody>
        <order-item
          v-for="(it, i) in itemGroup"
          :key="i"
          :item="it"
          :is-single="itemGroup.length === 1"
        />
      </tbody>
      <tfoot>
        <tr>
          <td
            class="balance text-left"
            colspan="3"
          >
            Кредитный остаток:<br> <strong>{{ mockupCreditAmount | currency }}</strong>
          </td>
          <td colspan="2">
            Общее количество: <strong>{{ quantity }}</strong>
          </td>
          <td>Сумма: <strong>{{ price | currency }}</strong></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import OrderItem from '@/components/order/Item.vue';

export default {
  name: 'OrderItemGroup',
  components: {
    OrderItem,
  },
  props: {
    itemGroup: Array,
    supplier: String,
  },
  data: () => ({
    mockupCreditAmount: 3159076,
  }),
  computed: {
    quantity() {
      return this.itemGroup.reduce((acc, it) => {
        acc += it.quantity;
        return acc;
      }, 0);
    },
    price() {
      return this.itemGroup.reduce((acc, it) => {
        acc += it.price.base * it.quantity;
        return acc;
      }, 0);
    },
  },
  created() {},
  methods: {},
};
</script>
