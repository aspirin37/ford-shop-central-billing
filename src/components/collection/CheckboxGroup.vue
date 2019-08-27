<template>
  <div
    class="filter-block__element"
    :class="{'filter-block__element_active': isCheckboxGroupShown}"
  >
    <p
      class="filter-block__element__title"
      @click="isCheckboxGroupShown = !isCheckboxGroupShown"
    >
      {{ filter.alias }}
      <i class="material-icons">keyboard_arrow_down</i>
    </p>
    <div class="filter-block__element__wrapper">
      <transition name="fade">
        <div
          v-if="isCheckboxGroupShown"
          class="filter-block__element__wrapper__content"
        >
          <transition name="collapse">
            <div
              v-if="isResetButtonShown"
              class="filter-block__element__wrapper__content__reset"
              @click="resetFilters"
            >
              <span>сбросить фильтр</span>
            </div>
          </transition>
          <template v-for="(it, i) in filter.values">
            <collection-checkbox
              v-if="i + 1 <= defaultShownItemsCount"
              :key="i"
              :filter="it"
              :loading="loading"
            />
          </template>

          <transition name="collapse-items">
            <div
              v-show="allItemsShown"
              ref="more-items"
              class="filter-block__element__wrapper__content__more-items"
            >
              <template v-for="(it, i) in filter.values">
                <collection-checkbox
                  v-if="i + 1 > defaultShownItemsCount"
                  :key="i"
                  :filter="it"
                  :loading="loading"
                />
              </template>
            </div>
          </transition>
          <div
            v-if="filter.values.length > defaultShownItemsCount"
            class="filter-block__element__wrapper__content__need-more"
          >
            <span
              v-if="!allItemsShown"
              @click="allItemsShown = true"
            >
              показать еще
            </span>
            <span
              v-else
              @click="allItemsShown = false"
            >
              Скрыть
            </span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import CollectionCheckbox from './Checkbox';

export default {
  name: 'CollectionCheckboxGroup',
  components: {
    CollectionCheckbox,
  },
  props: {
    filter: Object,
    position: Number,
    loading: Boolean,
  },
  data: () => ({
    defaultShownItemsCount: 10,
    defaultShownGroupsCount: 1,
    allItemsShown: false,
    isCheckboxGroupShown: false,
  }),
  computed: {
    isResetButtonShown() {
      return this.filter.values.find(it => it.isChecked);
    },
  },
  mounted() {
    this.calculateMoreItemsBlockHeight();
    if (this.position < this.defaultShownGroupsCount) {
      this.isCheckboxGroupShown = true;
    }
  },
  methods: {
    resetFilters() {
      this.filter.values.forEach(it => {
        it.isChecked = false;
        it.isDisabled = false;
      });
    },
    calculateMoreItemsBlockHeight() {
      setTimeout(() => {
        if (!this.$refs['more-items']) {
          return;
        }

        this.$refs['more-items'].style.maxHeight = `${(this.filter.values.length - this.defaultShownItemsCount) * 30 + 60}px`;
      }, 0);
    },
  },
};
</script>
