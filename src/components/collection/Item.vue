<template>
  <div class="product-element">
    <a
      href="javascript:void(0);"
      class="product-element__link"
    >
      <div class="product-element__image-block">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFDIc5BnwE-QMqIraFBcoHhDL34cRxI9IIrqME8hWS_udsfG5Rew"
          class="product-element__image-block__image"
        >
      </div>
      <div class="product-element__info">
        <p class="product-element__info__title">
          {{ item.name }}
        </p>
        <p class="product-element__info__article">Артикул</p>
        <p class="product-element__info__description">Тестовое описание товара, которое занимает
          порядочно места. На скринах тестового портала описание полностью дублирует название
        </p>
      </div>
    </a>
    <div class="product-element__price">
      <div class="product-element__price-info">
        <span class="product-element__price-info__title">Цена (без НДС):</span>
        <span class="product-element__price-info__total bold">{{ item.price.base | currency }}</span>
      </div>
      <div class="product-element__price-info">
        <span class="product-element__price-info__title">Цена (с НДС):</span>
        <span class="product-element__price-info__total">{{ item.price.withNds | currency }}</span>
      </div>
      <div class="product-element__price-info">
        <span class="product-element__price-info__title">МЦП (с НДС)*:</span>
        <span class="product-element__price-info__total">{{ item.price.maximumClientPrice | currency }}</span>
      </div>
    </div>
    <div class="product-element__buy">
      <div class="product-element__amount">
        <input
          v-model.number="total"
          class="product-element__amount__value"
          type="number"
          :min="min"
          :max="max"
          @input="validateInput"
          @keyup.enter="changeItemsQuantityInCart"
        >
        <div class="arrow-block">
          <button
            class="arrow-block__top"
            :disabled="total === max"
            @click="increase"
          >
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
          </button>
          <button
            class="arrow-block__bottom"
            :disabled="total === min"
            @click="decrease"
          >
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
          </button>
        </div>
      </div>
      <button
        class="btn btn-primary-ford-orange"
        :disabled="!total || total < 0"
        @click="changeItemsQuantityInCart"
      >
        <i class="material-icons">shopping_cart</i>
        В корзину
      </button>

      <router-link
        v-if="addedToCart"
        to="/basket"
        class="amount-block"
      >
        <span class="amount-block__text">Добавлено:</span>
        <span class="amount-block__value">{{ addedToCart }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CollectionItem',
  props: {
    item: Object,
  },
  data: () => ({
    total: 0,
    min: 0,
    max: 99,
  }),
  computed: {
    ...mapGetters(['getCartItem']),
    addedToCart() {
      const cartItem = this.getCartItem(this.item.guid);
      return cartItem ? cartItem.quantity : null;
    },
  },
  methods: {
    increase() {
      if (this.total < this.max) {
        this.total++;
      }
    },
    decrease() {
      if (this.total > this.min) {
        this.total--;
      }
    },
    changeItemsQuantityInCart() {
      const payload = {
        item: this.item,
        quantity: this.total,
      };
      this.$store.commit('changeItemsQuantityInCart', payload);
      this.total = 0;
    },
    validateInput() {
      if (this.total < this.min) {
        this.total = this.min;
      }

      if (this.total > this.max) {
        this.total = this.max;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.arrow-block button {
  border: none;
  background: none;
  outline: none;
}
</style>
