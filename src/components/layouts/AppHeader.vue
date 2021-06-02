<template>
  <header class="app__header">
    <div class="app__menu" id="menu">
      <div class="app__menu-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="app__menu-header">
                <svg @click="hideMenu" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="44" height="44" rx="22" fill="#FD6950" stroke="#FD6950"/>
                  <rect x="15.6057" y="28.5836" width="18" height="1.5" transform="rotate(-45 15.6057 28.5836)" fill="white"/>
                  <rect x="16.6664" y="15.8557" width="18" height="1.5" transform="rotate(45 16.6664 15.8557)" fill="white"/>
                </svg>
              </div>

              <div class="app__menu-body">
                <ul class="app__menu-list">
                  <li v-if="hasPerm( 'staff7Buttons' )" class="app__menu-item">
                    <router-link to="/">Кунг-фу для упров</router-link>
                  </li>

                  <li v-if="hasPerm( 'staff7Buttons' )" class="app__menu-item">
                    <router-link to="/">Заявки для упров</router-link>
                  </li>

                  <li v-if="hasPerm( 'staff7Buttons' )" class="app__menu-item">
                    <router-link to="/">Трелло для упров</router-link>
                  </li>

                  <li v-if="hasPerm( 'staff7Buttons' )" class="app__menu-item">
                    <router-link to="/">Логи сервера</router-link>
                  </li>

                  <li class="app__menu-item">
                    <router-link to="/">Ушу для админов</router-link>
                  </li>

                  <li class="app__menu-item">
                    <router-link to="/">Онтайм</router-link>
                  </li>

                  <li class="app__menu-item">
                    <router-link to="/">Админка</router-link>
                  </li>

                  <li class="app__menu-item">
                    <router-link to="/settings">Настройки</router-link>
                  </li>
                </ul>

                <div class="app__navigation d-flex d-md-none align-items-center">
                  <span class="app__login">{{ user.login }} </span>
                  <span class="app__staff">({{ staff }})</span>
                  <span class="app__logout">
              <button class="button button-primary button-small" @click="logout">Выйти</button>
            </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-auto col-12">

          <div class="app__hero d-flex justify-content-between align-items-center">
            <button class="button-menu order-md-1 order-2" @click="openMenu">
              <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="44" height="44" rx="22" fill="#FD6950" stroke="#FD6950"/>
                <rect x="13.5" y="16.5" width="18" height="1.5" fill="white"/>
                <rect x="13.5" y="22.5" width="18" height="1.5" fill="white"/>
                <rect x="13.5" y="28.5" width="18" height="1.5" fill="white"/>
              </svg>
            </button>

            <div class="app__hero-logo order-1 order-md-2">
              <router-link to="/">
                <img src="~@/assets/img/logo.svg">
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-auto d-none d-md-block">
          <div class="app__navigation d-flex align-items-center">
            <span class="app__login">{{ user.login }} </span>
            <span class="app__staff">({{ staff }})</span>
            <span class="app__logout">
              <button class="button button-primary button-small" @click="logout">Выйти</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

import { permissions } from "../../assets/js/configs/StaffConfig";

import PermissionMixin from "../../mixins/PermissionMixin";

export default {
  name: "AppHeader",
  watch: {
    '$route': function() {
      this.hideMenu();
    }
  },
  data() {
    return {
      $body: null,
      $menu: null
    }
  },
  methods: {
    ...mapMutations('AuthModule', [
      'logout'
    ]),
    openMenu() {
      this.$menu.forEach( $node => {
        $node.classList.add( 'opened' );
      });

      this.$body.style.overflow = 'hidden';
    },
    hideMenu() {
      this.$menu.forEach( $node => {
        $node.classList.remove( 'opened' );
      });

      this.$body.style.overflow = 'auto';
    }
  },
  mixins: [
    PermissionMixin
  ],
  computed: {
    ...mapState('AuthModule', [
      'user'
    ]),
    staff() {
      const staff = this.user.stuff;

      const item = permissions.find( perm => {
        return perm.title == staff;
      });

      return item.name;
    }
  },
  mounted() {
    this.$menu = document.querySelectorAll( '.app__menu' );
    this.$body = document.querySelector( 'body' );
  },
  beforeDestroy() {
    this.$body.style.overflow = 'auto';
  }
}
</script>

<style lang="scss" scoped>
  .app__header {
    min-height: 60px;
  }

  .app__menu {
    position: fixed;
    top: 0;
    left: 100%;
    right: 0;
    min-height: 100vh;
    width: 100vw;
    opacity: 0;
    z-index: 1000;
    transition: all .3s ease-in-out;
    background: var(--main-bg-color);

    &.opened {
      transform: translate( -100%, 0 );
      opacity: 1;
    }
  }

  .button-menu {
    display: flex;
    align-items: center;
    position: relative;
    top: 5px;

    svg {
      fill: var( --primary-color );
      stroke: var( --primary-color );
      cursor: pointer;

      rect {
        stroke: var( --font-color );

        &:first-child {
          fill: var( --primary-color );
          stroke: var( --primary-color );
        }
      }
    }
  }

  .app__menu-header {
    svg {
      fill: var( --primary-color );
      stroke: var( --primary-color );
      cursor: pointer;

      rect {
        stroke: var( --font-color );

        &:first-child {
          fill: var( --primary-color );
          stroke: var( --primary-color );
        }
      }
    }
  }

  .app__menu-wrapper {
    max-height: 100vh;
    padding: 30px 20px;
    overflow: auto;
  }

  .app__hero {
    color: var( --font-color );
    font-size: 24px;
    font-weight: bold;
    padding: 15px 0;

    .app__hero-logo {
      margin-left: 53px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: -27px;
        display: block;
        width: 1px;
        height: 60px;
        background: rgba( #FFFFFF, .31 );
      }
    }

    button {
      &:focus {
        outline: none;
      }
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  .app__menu-list {
    margin-top: 40px;
    padding-left: 0;
    li {
      margin-bottom: 25px;
      list-style: none;
      a {
        color: var( --font-color );
        font-size: 48px;
        font-family: Montserrat;
        font-weight: 500;
      }
    }
  }

  .app__staff{
    margin-right: 20px;
  }

  .app__navigation {
    width: 100%;
  }
  .app__logout {
    width: 96px;
  }

  @media ( max-width: 768px ) {
    .app__hero {
      .app__hero-logo {
        margin-left: 0;

        &::before {
          display: none;
        }
      }

      img {
        max-width: 180px;
      }
    }

    .app__menu-list {
      li {
        a {
          font-size: 26px;
        }
      }
    }

    .app__navigation {
      margin-top: 50px;
    }
  }
</style>
