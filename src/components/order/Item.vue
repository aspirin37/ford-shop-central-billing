<template>
  <tr :class="{'is-single': isSingle}">
    <td class="article-td py-2">
      {{ item.articul }}
    </td>
    <td class="name-td py-2">
      {{ item.name }}
    </td>
    <td class="price-td py-2">
      {{ item.price.base | currency }}
    </td>
    <td class="py-2">
      0%
    </td>
    <td class="amount-td-enabled py-2">
      <input
        v-model.number="item.quantity"
        type="number"
        :min="min"
        :max="max"
        @input="validateInput"
      >
      <div class="arrow-block">
        <button
          class="arrow-block__top"
          type="button"
          :disabled="item.quantity === max"
          @click="increase"
        >
          <arrow-top-icon />
        </button>
        <button
          :disabled="item.quantity === min"
          class="arrow-block__bottom"
          type="button"
          @click="decrease"
        >
          <arrow-bottom-icon />
        </button>
      </div>
    </td>
    <td class="price-td py-2">
      {{ item.quantity * item.price.base | currency }}
    </td>
    <td class="delete-td py-2">
      <button type="button">
        <i
          class="material-icons"
          @click="removeItem"
        >cancel</i>
      </button>
    </td>
  </tr>
</template>

<script>
import ArrowTopIcon from '@/components/svg/ArrowTop.vue';
import ArrowBottomIcon from '@/components/svg/ArrowBottom.vue';

export default {
  name: 'OrderItem',
  components: {
    ArrowTopIcon,
    ArrowBottomIcon,
  },
  props: {
    item: Object,
    isSingle: Boolean,
  },
  data: () => ({
    min: 0,
    max: 99,
  }),
  destroyed() {
    if (!this.item.quantity) {
      this.$store.commit('removeItemFromCart', this.item);
    }
  },
  methods: {
    increase() {
      if (this.item.quantity === this.max) {
        return;
      }

      this.$store.commit('changeItemsQuantityInCart', {
        item: this.item,
        quantity: 1,
      });
    },
    decrease() {
      if (this.item.quantity === this.min) {
        return;
      }

      this.$store.commit('changeItemsQuantityInCart', {
        item: this.item,
        quantity: -1,
      });
    },
    removeItem() {
      this.$store.commit('removeItemFromCart', this.item);
    },
    validateInput() {
      if (this.item.quantity < this.min) {
        this.item.quantity = this.min;
      }

      if (this.item.quantity > this.max) {
        this.item.quantity = this.max;
      }
    },
  },
};
</script>
