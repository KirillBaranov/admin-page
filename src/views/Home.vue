<template>
  <div class="app__page">
    <AppHeader v-if="isAuthenticated"></AppHeader>

    <AppMenuPlayer @hide="AppMenuPlayerHide"
                   :isVisible="isVisiblePlayerModal">
    </AppMenuPlayer>

    <main class="app__check">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <form class="check__form flex-lg-row flex-column">
              <div class="form-group mr-3">
                <div class="app__check-select">
                  <AppSelect id="check__select-options"
                             :items="items"
                             @onChange="onChange"
                             :value="select.title"
                             :placeholder="select.placeholder">
                  </AppSelect>
                </div>
              </div>
              <div class="form-group mr-3">
                <div class="app__check-select" v-if="select.value == 'tps'">
                  <AppSelect id="check__select-servers"
                             :items="getServersList"
                             @onChange="onChangeServer"
                             :value="getCurrentServer"
                             placeholder="Выберите сервер">
                  </AppSelect>
                </div>

                <div class="app__check-select" v-else>
                  <AppTextSelect id="check__select-players"
                                 :items="getPlayersList"
                                 @onInput="onInput"
                                 @onChange="onChangePlayer"
                                 @onOpenMenu="AppMenuPlayerOpen"
                                 @onHideMenu="AppMenuPlayerHide"
                                 :value="input"
                                 placeholder="Начните вводить ник">
                  </AppTextSelect>
                </div>
              </div>

              <div class="form-group mr-3">
                <button class="button button-primary button-next" @click="query" type="button">Вперед</button>
              </div>
            </form>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="output">
              <component :is="components.current" @refresh="query" :result="result"></component>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter v-if="isAuthenticated"></AppFooter>
  </div>
</template>

<script>
import AppHeader from "../components/layouts/AppHeader";
import AppFooter from "../components/layouts/AppFooter";

import AppSelect from "../components/blocks/form/Select";
import AppTextSelect from "../components/blocks/form/RecommendationSelect";
import AppInput from "../components/blocks/form/Input";

import AppMenuPlayer from "../components/blocks/modals/MenuPlayer";

import options  from "../assets/js/configs/checkConfig";
import PermissionMixin from "../mixins/PermissionMixin";

// helpers
import CheckHelperMixin from "../assets/js/helpers/check";

import ApiConfig from "../assets/js/configs/ApiConfig";
import CheckConfig from "../assets/js/configs/checkConfig";

import {json, status} from "../assets/js/helpers/fetch";
import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
import UserStylesMixin from "../mixins/UserStylesMixin";

export default {
  name: "Home",
  data() {
    return {
      options,
      components: {
        default: () => import( '../components/blocks/templates/Default.template.vue' ),
        current: () => import( '../components/blocks/templates/Default.template.vue' ),
        error: () => import( '../components/blocks/templates/Error.template.vue' ),
        list: {
          tps: () => import( '../components/blocks/templates/Tps.template.vue' ),
          perms: () => import( '../components/blocks/templates/Perms.template.vue'),
          bansadm: () => import( '../components/blocks/templates/Bansadm.template.vue' ),
          info: () => import( '../components/blocks/templates/Info.template.vue' ),
          bans: () => import( '../components/blocks/templates/Bans.template.vue' ),
          mutes: () => import( '../components/blocks/templates/Mutes.template.vue' ),
          mult: () => import( '../components/blocks/templates/Mult.template.vue' ),
          online: () => import( '../components/blocks/templates/Online.template.vue' ),
          mscreen: () => import( '../components/blocks/templates/Mscreen.template.vue' ),
          clear: () => import( '../components/blocks/templates/Clear.template.vue' ),
          tpspawn: () => import( '../components/blocks/templates/Tpspawn.template.vue' ),
        }
      },
      result: {},
      AppMenuPlayer: {
        isVisible: false
      }
    }
  },
  components: {
    AppHeader,
    AppFooter,
    AppSelect,
    AppInput,
    AppTextSelect,
    AppMenuPlayer
  },
  watch: {
    select( after, before ) {
      if ( after.value == 'tps' && ( this.getServersList && this.getServersList.length == 0 ) ) {
        this.fetchServersList();
      }

      else if ( before.value == 'tps' && after.value != 'tps' ) {
        this.clear();
      }

      this.components.current = this.components.default;
    },
    '$route.params': function() {
      this.startHome( 'router' );
      this.start();
    }
  },
  computed: {
    placeholder() {
      return this.select.title && this.select.title != 'Выберите пункт' && ApiConfig[this.select.value].placeholder
        ? ApiConfig[this.select.value].placeholder : 'Начните вводить...';
    },
    items() {
      return this.options.filter( item => {
        return this.hasPerm( item.value );
      });
    },
    ...mapGetters( 'AuthModule', [
      'isAuthenticated'
    ]),
    ...mapState( 'CheckModule', [
      'select',
      'input',
    ]),
    ...mapState( 'PlayerModule', [
      'isVisiblePlayerModal'
    ]),
    ...mapGetters( 'CheckModule', [
      'getServersList',
      'getCurrentServer',
      'getPlayersList',
      'getCurrentPlayer',
    ])
  },
  mixins: [
    PermissionMixin,
    CheckHelperMixin,
    UserStylesMixin
  ],
  methods: {
    ...mapMutations( 'AuthModule', [
      'logout'
    ]),
    ...mapMutations( 'CheckModule', [
      'updateInput',
      'updateSelect',
      'updateServers',
      'updateCurrentServer',
      'updatePlayers',
      'updateCurrentPlayer',
      'clear',
      'updateTime'
    ]),
    ...mapActions( 'CheckModule', [
      'fetchServersList',
      'fetchRecommendationList',
    ]),
    AppMenuPlayerOpen() {
      this.AppMenuPlayer.isVisible = true;
    },
    AppMenuPlayerHide() {
      this.AppMenuPlayer.isVisible = false;
    },
    startHome( type = 'default' ) {
      const query = this.$router.history.current.query;

      if ( query && query.act && query.act != '' ) {
        if ( !this.isIllegalAct( query.act ) ) { // if act param is ok

          if ( type != 'default' ) {
            this.onInput( query.login );

            if ( query.act == 'tps' ) {
              this.onChangeServer( {
                name: query.login
              });
            }

            // find name value by index;
            const item = CheckConfig.find( item => {
              return item.value == query.act;
            });

            this.onChange(  {
              name: item.name,
              value: query.act
            } );
          }

          this.query();
        }

        else {
          this.components.current = this.components.error;
        }
      }

      else {
        this.clear();
      }
    },
    query() {
      try {
        if ( ( this.input != '' || this.select.value == 'online' ) && this.select.value != '' ) {
          const url = this.select.value == 'online' ?
                      ApiConfig[ this.select.value ].url :
                      ApiConfig[ this.select.value ].url + this.input;

          this.updateTime( {
            key: 'start',
            value: Date.now()
          } );

          const query = fetch( url, {
            method: 'post'
          });

          query.then( response => status( response ) )
            .then( response => json( response ) )
            .then( data => {
              if ( data.error == '' && ( data.result && data.result.length != 0 ) ) {
                this.components.current = this.components.list[ this.select.value ];
                this.result = data;

                let url = `/?act=${this.select.value}`;
                    url = this.input != '' ? url + `&login=${this.input}` : url;

                this.$router.push( url ).catch( err => {});

                this.updateTime( {
                  key: 'end',
                  value: Date.now()
                });
              }

              else if ( !data.result.success ) {
                console.error( 'Ошибка при выполнении запроса.' );

                this.components.current = this.components.error;

                return false;
              }

              else {
                this.logout();
              }

            })
            .catch( error => {
              throw error;
            });
        }
      }

      catch ( e ) {
        console.error( e );
      }
    },
    onChange( item ) {
      this.updateSelect( { title: item.name, value: item.value } );

      this.query();
    },
    onChangeServer( item ) {
      this.updateCurrentServer( item.name );
      this.updateInput( item.name );

      this.query();
    },
    onChangePlayer( item ) {
      this.updateCurrentPlayer( item.login );
      this.updateInput( item.login );

      this.fetchRecommendationList();

      this.query();
    },
    onInput( value ) {
     this.updateInput( value );

      this.components.current = this.components.default;

      if ( this.select.value != 'tps' || this.select.value != 'online' ) {
        this.fetchRecommendationList();
      }
    }
  },
  mounted() {
    document.querySelector( 'title' ).innerText = 'Админ панель';

    this.startHome( 'router' );
    this.start();
  },
  beforeDestroy() {
    this.clear();
  }
}
</script>

<style lang="scss" scoped>
  .app__page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .app__check {
    min-height: calc( 100vh - 75px - 89px - 60px );
    margin-bottom: 60px;
  }

  .check__form {
    margin-top: 75px;
    display: flex;

    .app__check-select {
      max-width: 328px;
      width: 100%;
      height: 75px;
    }

    .form-group {
      margin-right: 5px;
    }

    button {
      min-width: 100px;
    }

    .button-next {
      width: 168px;
      height: 75px;

      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
    }

    .check__input {
      width: 100%;
      height: 75px;
    }
  }

  @media ( max-width: 1024px ) {
    .check__form {
      .form-group {
        margin-right: 0;
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }

        button {
          width: 100%;
          max-width: 328px;
        }
      }
    }
  }

  @media ( max-width: 576px ) {
    .check__form {
      margin-top: 20px;
    }
  }

  @media ( max-width: 480px ) {
    .check__form, {
      .app__check-select, .button-next {
        height: 50px;
      }

      .button-next {
        font-size: 16px;
      }
    }
  }
</style>
