<template>
  <main id="basket-page">
    <div class="container">
      <div class="top-block">
        <div class="top-block__title">
          <h2 class="top-block__title__text">
            Корзина
          </h2>
        </div>
      </div>
      <breadcrumbs :links="['Личный кабинет', 'Корзина']" />
      <transition
        mode="out-in"
        name="fade"
      >
        <h3
          v-if="!cart.items.length"
          class="empty-basket"
        >
          Корзина пуста
        </h3>
        <transition-group
          v-else
          name="fade-list"
          class="position-relative"
          tag="div"
        >
          <item-group
            v-for="(items, supplier) in cartSeparatedBySuppliers"
            :key="`key-${supplier}`"
            :item-group="items"
            :supplier="supplier"
            class="w-100"
          />
          <div
            key="calculate-block"
            class="calculate-block"
          >
            <div class="calculate-block__wrapper">
              <div class="calculate-block__item">
                <span class="calculate-block__item__title">Сумма:</span>
                <span>{{ cart.priceBase | currency }}</span>
              </div>
              <div class="calculate-block__item">
                <span class="calculate-block__item__title">НДС:</span>
                <span>{{ (cart.priceWithNds - cart.priceBase) | currency }}</span>
              </div>
              <div class="calculate-block__item">
                <span class="calculate-block__item__title">Сумма с НДС:</span>
                <span>
                  <strong>{{ cart.priceWithNds | currency }}</strong>
                </span>
              </div>
              <button class="btn btn-primary-ford-orange button-correct">
                <i class="material-icons">shopping_cart</i>
                Оформить заказ
              </button>
            </div>
          </div>
        </transition-group>
      </transition>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import itemGroup from '@/components/order/ItemGroup';

export default {
  name: 'Basket',
  components: {
    Breadcrumbs,
    itemGroup,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['cart']),
    cartSeparatedBySuppliers() {
      return this.cart.items.reduce((acc, it) => {
        if (!acc[it.supplier]) {
          acc[it.supplier] = [];
        }
        acc[it.supplier].push(it);
        return acc;
      }, {});
    },
  },
  created() {},
  methods: {},
};
</script>
