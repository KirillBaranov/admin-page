<template>
  <div class="app__page">
    <AppHeader v-if="isAuthenticated"></AppHeader>

    <main class="app_settings">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 class="app__page-title">Настройки</h1>
          </div>
        </div>

        <div class="row" v-if="share">
          <div class="col-12">
            <div class="app__page-settings-confirm">
              <div class="settings-wrapper__confirm-text">
                Вы перешли по ссылке с настройками, чтобы применить их - нажмите сохранить. <br>
                Если вы не хотите их применять - просто нажмите отменить.
              </div>
              <div class="settings-wrapper__btn-row">
                <button @click="reject" class="button button-primary-outline">Отменить</button>
                <button @click="save" class="button button-primary">Применить</button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="app__page-settings-wrapper">
              <div class="settings-wrapper__grid">
                <div class="grid__row">
                  <p class="settings-wrapper__col-title">Основные</p>

                  <div class="settings-wrapper__col-list">
                    <div class="settings-wrapper__col-item">
                      <label for="primary-color__picker">Цвет кнопок/обводок</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.general.primaryColor" id="primary-color__picker">

                        <input type="text" @change="update" v-model="styles.user.general.primaryColor" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="background-color__picker">Цвет фона</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.general.backgroundColor" id="background-color__picker">

                        <input type="text" @change="update" v-model="styles.user.general.backgroundColor" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="text-color__picker">Цвет текста</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.general.textColor" id="text-color__picker">

                        <input type="text" @change="update" v-model="styles.user.general.textColor" maxlength="7">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid__row" v-if="hasPerm( 'tps' )">
                  <p class="settings-wrapper__col-title">TPS</p>

                  <div class="settings-wrapper__col-list">
                    <div class="settings-wrapper__col-item">
                      <label for="tps__good">TPS больше 17</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.tps.good" id="tps__good">

                        <input type="text" @change="update" v-model="styles.user.tps.good" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="tps__ok">TPS больше 14</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.tps.ok" id="tps__ok">

                        <input type="text" @change="update" v-model="styles.user.tps.ok" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="tps__warning">TPS больше 10</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.tps.warning" id="tps__warning">

                        <input type="text" @change="update" v-model="styles.user.tps.warning" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="tps__good">TPS меньше 10</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.tps.danger" id="danger__good">

                        <input type="text" @change="update" v-model="styles.user.tps.danger" maxlength="7">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid__row" v-if="hasPerm( 'logs' )">
                  <p class="settings-wrapper__col-title">Логи</p>

                  <div class="settings-wrapper__col-list">
                    <div class="settings-wrapper__col-item">
                      <label for="logs__time">Время</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.logs.timeColor" id="logs__time">

                        <input type="text" @change="update" v-model="styles.user.logs.timeColor" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="logs__text">Текст</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.logs.textColor" id="logs__text">

                        <input type="text" @change="update" v-model="styles.user.logs.textColor" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="logs__mute">В муте</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.logs.muteColor" id="logs__mute">

                        <input type="text" @change="update" v-model="styles.user.logs.muteColor" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="logs__local">Локал</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.logs.localColor" id="logs__local">

                        <input type="text" @change="update" v-model="styles.user.logs.localColor" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="logs__global">Глобал</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.logs.globalColor" id="logs__global">

                        <input type="text" @change="update" v-model="styles.user.logs.globalColor" maxlength="7">
                      </div>
                    </div>

                    <div class="settings-wrapper__col-item">
                      <label for="logs__commands">Команды</label>

                      <div class="settings-wrapper__col-item-input">
                        <input type="color" @change="update" v-model="styles.user.logs.commandColor" id="logs__commands">

                        <input type="text" @change="update" v-model="styles.user.logs.commandColor" maxlength="7">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="settings-wrapper__footer">
                <div class="settings-wrapper__btn-row">
                  <button @click="reset" class="button button-primary-outline">Сбросить</button>
                  <button @click="save" class="button button-primary">Сохранить</button>
                </div>
              </div>

              <div class="settings-wrapper__additional">
                <div class="settings-wrapper__btn-row">
                  <div class="settings-wrapper__btn">
                    <div class="settings-wrapper__btn-advice"
                         :class="show ? 'active' : ''"
                         v-html="advice">
                    </div>
                    <button @click="settingsExport"
                            @mouseleave="show = false"
                            class="button button-primary">
                      Экспорт настроек
                    </button>
                  </div>
                </div>
              </div>
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

import UserStylesMixin from "../mixins/UserStylesMixin";
import PermissionMixin from "../mixins/PermissionMixin";

export default {
  name: "Settings",
  components: {
    AppHeader,
    AppFooter
  },
  mixins: [
    UserStylesMixin,
    PermissionMixin
  ],
  watch: {
    '$route.params': function() {
      this.share = this.$router.history.current.query.share ? true : false;
    }
  },
  data() {
    return {
      advice: 'Ссылка успешно скопирована!',
      show: false,
      share: false,
    }
  }, //не устал?

  mounted() {
    this.share = this.$router.history.current.query.share ? true : false;
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

  .app_settings {
    min-height: calc( 100vh - 75px - 89px - 60px );
    margin-bottom: 60px;
    padding-top: 81px;

    label {
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      color: #ECECEC;
      margin-bottom: 24px;
    }

    input[type='text'] {
      border: 1px solid var( --primary-color );
      background: none;
      width: 139px;
      height: 43px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: #FFFFFF;
      padding: 0 13px;

      &:focus {
        outline: none;
      }
    }

    input[type='color'] {
      border: 1px solid var( --primary-color );
      background: none;
      padding: 0;
      width: 53px;
      height: 43px;
      outline: none;
      appearance: none;
      margin-right: 8px;
    }
  }

  .settings-wrapper__grid {
    .grid__row {
      margin-bottom: 50px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .settings-wrapper__footer {
    margin-top: 95px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(217, 217, 217, 0.59);
  }

  .settings-wrapper__confirm-text {
    margin-bottom: 30px;
  }

  .app__page-settings-confirm {
    margin-bottom: 70px;
  }

  .settings-wrapper__btn-row {
    display: flex;

    button {
      display: inline-flex;
      padding: 13px 33px;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      color: #FFFFFF;
      width: auto;
      margin: 0 12px 0 0;

      &.button-primary-outline {
        border: 1px solid var( --primary-color );
      }
    }
  }

  .settings-wrapper__btn {
    position: relative;

    button {
      margin: 0;
    }

    .settings-wrapper__btn-advice {
      position: absolute;
      z-index: -1;
      opacity: 0;
      bottom: calc(100% + 14px);
      left: 50%;
      width: 200px;
      padding: 10px 20px;
      background: #363636;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #fff;
      transform: translate(-50%, 10px);
      transition: all .1s ease-in-out;
      text-align: center;

      &::after {
        content: "";
        position: absolute;
        top: 100%;
        background: #363636;
        width: 14px;
        height: 14px;
        left: 50%;
        display: block;
        transform: translate(-50%) rotate( 45deg );
      }

      &.active {
        z-index: 10;
        opacity: 1;
        transform: translate( -50%, 0 );
      }
    }
  }

  .settings-wrapper__additional {
    margin-top: 45px;
  }

  .app__page-title {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: var(--secondary-color);
    margin-bottom: 55px;
  }

  .settings-wrapper__col-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: var( --font-color );

    margin-bottom: 33px;
  }

  .settings-wrapper__col-item-input {
    display: flex;
    align-items: center;
  }

  .app__page-settings-wrapper {
    border: 1px solid var( --primary-color );
    padding: 46px 49px;
  }

  .settings-wrapper__col-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 30px;
  }

  @media ( max-width: 1280px ) {
    .settings-wrapper__col-list {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media ( max-width: 1024px ) {
    .settings-wrapper__col-list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media ( max-width: 576px ) {
    .app__page-settings-wrapper {
      padding: 35px 15px;
    }

    .app_settings {
      padding-top: 35px;
    }

    .settings-wrapper__col-list {
      grid-template-columns: 1fr;
    }

    .settings-wrapper__btn-row {
      flex-direction: column;
      button {
        width: 100%;
        display: block;
        margin: 0;

        &:first-child {
          margin-bottom: 20px;
        }

        &.button-primary {
          min-height: 0;
        }
      }
    }
  }

  @media ( max-width: 480px ) {
    .settings-wrapper__btn-row {
      button {
        font-size: 16px;
      }
    }
  }

</style>
