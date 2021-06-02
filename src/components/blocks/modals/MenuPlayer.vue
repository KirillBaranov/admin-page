<template>
  <div class="app__menu-player-wrapper" :class="isVisible ? 'active' : ''">
    <div class="app__menu-player-overlay" @click="hide"></div>
    <div class="app__menu-player">
      <div class="menu-player__header d-flex align-items-center justify-content-between">
        <h4 class="menu-player__title">Ник: <span class="primary-color">{{ input }}</span></h4>
        <div class="menu-player__controller" @click="hide">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="26.1924" y="9.2218" width="24" height="1" transform="rotate(135 26.1924 9.2218)" fill="#FD6950"/>
            <rect x="9.22168" y="7.80762" width="24" height="1" transform="rotate(45 9.22168 7.80762)" fill="#FD6950"/>
          </svg>
        </div>
      </div>
      <div class="menu-player__body">
        <div class="menu-player__btn-container">
          <a class="button"
                  :href="`/#/?act=mutes&login=${input}`"
                  v-if="hasPerm( 'mutes' )">
            <button class="button button-primary"
                    @click="go( $event, 'mutes' )">
              Муты
            </button>
          </a>
        </div>

        <div class="menu-player__btn-container">
          <a class="button"
             :href="`/#/?act=bans&login=${input}`"
             v-if="hasPerm( 'bans' )">
            <button class="button button-primary"
                    @click="go( $event, 'bans' )">
              Баны
            </button>
          </a>
        </div>

        <div class="menu-player__btn-container">
          <a class="button"
             :href="`/#/?act=mult&login=${input}`"
             v-if="hasPerm( 'mult' )">
            <button class="button button-primary"
                    @click="go( $event, 'mult' )">
              Мульты
            </button>
          </a>
        </div>
        <div class="menu-player__btn-container">
          <a class="button"
             :href="`/#/?act=perms&login=${input}`"
             v-if="hasPerm( 'perms' )">
            <button class="button button-primary"
                    @click="go( $event, 'perms' )">
              Пермы
            </button>
          </a>
        </div>
        <div class="menu-player__btn-container">
          <a class="button"
             :href="`/#/?act=info&login=${input}`"
             v-if="hasPerm( 'info' )">
            <button class="button button-primary"
                    @click="go( $event, 'info' )">
              Информация
            </button>
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

import PermissionMixin from "../../../mixins/PermissionMixin";

export default {
  name: "MenuPlayer",
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState( 'CheckModule', [
      'input'
    ])
  },
  mixins: [
    PermissionMixin
  ],
  methods: {
    ...mapMutations( 'CheckModule', [
      'updateSelect'
    ]),
    ...mapMutations( 'PlayerModule', [
      'updateVisiblePLayerModal'
    ]),
    go( event, act ) {
      if ( !event.ctrlKey ) {
        let url = `/?act=${act}&login=${this.input}`;

        this.$router.push( url ).catch( err => {} );

        this.hide();
      }
    },
    hide() {
      this.updateVisiblePLayerModal( false );
    },
  },
}
</script>

<style lang="scss" scoped>
  .app__menu-player-wrapper {
    display: none;
    opacity: 0;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    min-height: 100vh;
    padding: 5vh 0;
    z-index: 1000;
    background: rgba( #000, .8 );

    &.active {
      display: block;
      opacity: 1;

      .app__menu-player-overlay {
        opacity: 1;
        z-index: 1;
      }

      .app__menu-player {
        transform: translate( -50%, -50% ) scale( 1 );
      }
    }

    .app__menu-player-overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      opacity: 0;
      background: rgba( var(--main-bg-color), .8 );
      transition: .2s ease-in-out;
    }

    .app__menu-player {
      padding: 37px 37px 41px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate( -50%, -50% ) scale( 0 );
      transition: .2s ease-in-out;
      z-index: 2;
      width: 100%;
      max-width: 432px;
      background: #30363E;
    }
  }

  .menu-player__header {
    padding-bottom: 19px;
    border-bottom: 1px solid rgba(196, 196, 196, 0.5);
    margin-bottom: 48px;
  }

  .menu-player__title {
    font-size: 16px;
    line-height: 19px;
    color: #E2E2E2;

    margin-bottom: 0;

    span {
      color: var(--primary-color);
    }
  }

  .menu-player__controller {
    cursor: pointer;

    svg {
      rect {
        stroke: var( --primary-color );
      }
    }
  }

  .menu-player__btn-container {
    margin-bottom: 19px;

    a {
      width: 100%;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media ( max-width: 480px ) {
    .menu-player__btn-container {
      margin-bottom: 14px;
    }
  }
</style>
