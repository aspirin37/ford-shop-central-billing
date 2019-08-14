<template>
  <header
    v-if="user"
    @click="hideMenuOnExactLinkClick"
  >
    <div class="header align-items-center">
      <div class="container">
        <div class="row">
          <div class="col d-flex flex-grow-0 align-items-center justify-content-start">
            <div
              class="header__logo"
              data-navigation
            >
              <router-link
                class="header__logo__link"
                to="user-list"
              >
                <img
                  class="header__logo__image"
                  src="@/assets/BlobServer.png"
                  alt="Ford Sollers SVO"
                >
              </router-link>
            </div>
            <div
              class="current-system"
              data-navigation
              menu-id="system"
              @click="toggleMainMenu"
            >
              <div class="current-system__block cb">
                CB
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="header__menu"
              data-navigation
            >
              <span
                class="header__menu__one_multiple"
                menu-id="catalog"
                @click="toggleMainMenu"
              >
                Каталог
              </span>
            </div>
          </div>
          <div class="col-2">
            <div
              class="header__wrapper__profile"
              data-navigation
            >
              <div
                menu-id="profile"
                class="header__profile"
                @click="toggleMainMenu"
              >
                <span class="header__profile__name">
                  {{ user.name || user.email }}
                </span>
                <div class="header__profile__image-block">
                  <i
                    style="font-size: 40px;"
                    class="material-icons md-light"
                  >account_circle</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition
      name="fade"
      mode="in-out"
    >
      <div
        v-show="isMenuShown"
        id="deepMenu"
        class="deep-menu central-billing"
      >
        <div class="container">
          <div
            data-navigation
            class="row"
          >
            <div class="col position-static">
              <div
                v-show="shownSubMenuId === 'catalog'"
                menu-id="catalog"
                class="deep-menu__block central-billing"
              >
                <div
                  v-if="catalog"
                  class="container"
                >
                  <div class="central-billing__wrapper">
                    <div
                      v-for="it in catalog"
                      :key="it.alias"
                      :sub-catalog-type="it.alias"
                      class="central-billing__item"
                      :class="{'active': selectedSubCatalog && it.alias === selectedSubCatalog.alias}"
                      @click="selectSubCatalog(it)"
                    >
                      <div class="central-billing__item__wrapper-icon">
                        <i class="material-icons">{{ it.icon }}</i>
                      </div>
                      {{ it.name }}
                    </div>
                  </div>
                  <transition
                    name="fade"
                    mode="in-out"
                  >
                    <div
                      v-if="selectedSubCatalog"
                      class="central-billing__deep__wrapper"
                    >
                      <div class="central-billing__deep__item">
                        <span class="central-billing__deep__item__title">
                          {{ selectedSubCatalog.name }}
                        </span>
                        <div class="central-billing__deep__item__links-block">
                          <router-link
                            v-for="(it, i) in selectedSubCatalog.collections"
                            :key="i"
                            class="central-billing__deep__item__link"
                            :to="{name: 'Collection', params: { alias: it.alias, id: it.guid }}"
                          >
                            {{ it.name }}
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div
                v-show="shownSubMenuId === 'profile'"
                menu-id="profile"
                class="deep-menu__block menu"
              >
                <a href="/front-users/profile?from=central-billing">
                  <i class="material-icons">account_circle</i>
                  Профиль
                </a>
                <a
                  class="text-danger"
                  href="javascript:void(0);"
                  @click="logOut"
                >
                  <i class="material-icons">subdirectory_arrow_left</i>
                  Выход
                </a>
              </div>
              <div
                v-show="shownSubMenuId==='profile'"
                class="container"
              >
                <div class="deep-menu__block link">
                  <a
                    href="/svo-orders"
                    class="deep-menu__block__link svo"
                  >
                    <p class="deep-menu__block__link__title">SVO</p>
                    <p class="deep-menu__block__link__text">Система для формирования заказов с опциями</p>
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="deep-menu__block__link central active"
                  >
                    <p class="deep-menu__block__link__title">Central-Billing</p>
                    <p class="deep-menu__block__link__text">Система для работы с закупками поставщиков</p>
                  </a>
                  <a
                    href="/front-users"
                    class="deep-menu__block__link um"
                  >
                    <p class="deep-menu__block__link__title">User Management</p>
                    <p class="deep-menu__block__link__text">Система для работы с пользователями</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppHeader',
  data: () => ({
    shownSubMenuId: null,
    selectedSubCatalog: null,
    catalog: null,
  }),
  computed: {
    ...mapState(['isMenuShown', 'user']),
  },
  mounted() {
    document.addEventListener('click', this.outOfHeaderClickHandler);
    this.getCatalog();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.outOfHeaderClickHandler);
  },
  methods: {
    ...mapMutations(['hideMenu', 'showMenu', 'toggleMenu', 'setUser']),
    outOfHeaderClickHandler(evt) {
      const navigation = Array.from(document.querySelectorAll('[data-navigation]'));
      let isNavigationClicked = false;

      navigation.forEach(it => {
        if (it.contains(evt.target)) {
          isNavigationClicked = true;
        }
      });

      if (!isNavigationClicked) {
        this.hideMenu();
        this.selectedSubCatalog = null;
      }
    },
    toggleMainMenu(evt) {
      const prevSubMenuShown = this.shownSubMenuId;
      let target = evt.currentTarget;

      this.shownSubMenuId = target.getAttribute('menu-id');

      if (this.shownSubMenuId === 'system') {
        this.shownSubMenuId = 'profile';
        target = document.querySelector('[menu-id="profile"]');
      }

      this.toggleMenu();
      this.selectedSubCatalog = null;

      if (!this.isMenuShown && prevSubMenuShown !== this.shownSubMenuId) {
        this.showMenu();
      }

      // Задаем позицию для подменю
      const LeftCoord = target.getBoundingClientRect().left;
      const MenuId = target.getAttribute('menu-id');

      if (!target.classList.contains('active')) {
        Array.from(document.querySelectorAll('.deep-menu__block')).forEach(it => {
          const itemMenuId = it.getAttribute('menu-id');
          if (itemMenuId === MenuId && itemMenuId !== 'catalog') {
            it.style.left = `${LeftCoord}px`;
          }
        });
      }
    },
    hideMenuOnExactLinkClick(evt) {
      if (evt.target.classList.contains('router-link-exact-active')) {
        this.hideMenu();
        this.selectedSubCatalog = null;
      }
    },
    async getCatalog() {
      const { collections } = await this.$http.get(`collections/${process.env.VUE_APP_CB_ROOT_ID}`);
      this.catalog = collections;
    },
    logOut() {
      this.setUser(null);
      window.location.href = '/front-users/sign-in';
      localStorage.clear();
    },
    selectSubCatalog({ alias, name, collections }) {
      this.selectedSubCatalog = {
        alias,
        name,
        collections,
      };
    },
  },
};
</script>
