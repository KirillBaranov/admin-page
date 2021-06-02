<template>
  <main class="app app__login">
    <div class="form login__form" :class="error.status == 'error' ? 'form-invalid' : ''">
      <h1 class="login__title">Вход</h1>

      <form class="form__body">
        <div class="form__group-input">
          <label for="login" class="form-label">Логин</label>
          <input type="text"
                 class="form-control"
                 v-model="form.login"
                 placeholder="Ваш логин"
                 id="login">
        </div>

        <div class="form__group-input">
          <label for="password" class="form-label">Пароль</label>
          <input type="password"
                 class="form-control"
                 v-model="form.password"
                 placeholder="Ваш пароль"
                 id="password">
        </div>

        <div class="form__group-input error" v-show="error.status == 'error'">
          {{ error.msg }}
        </div>

        <div class="form__group-input">
          <button class="button button-primary" @click="submit">Отправить</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import UserStylesMixin from "../mixins/UserStylesMixin";

export default {
    name: "Login",
    data() {
      return {
        form: {
          login: 'login1',
          password: 'login1',
          act: 'login'
        },
        msg: ''
      }
    },
    computed: {
      ...mapState( 'AuthModule', [
        'error'
      ])
    },
    mixins: [
      UserStylesMixin
    ],
    methods: {
      ...mapActions( 'AuthModule', [
        'login'
      ]),
      ...mapMutations( 'AuthModule', [
        'init'
      ]),
      submit() {
        const data  = new FormData();

        data.append( 'act', this.form.act );
        data.append( 'login', this.form.login );
        data.append( 'pass', this.form.password );

        this.login( data );
      }
    },
    mounted() {
      document.querySelector( 'title' ).innerText = 'Вход | Админ панель';
    }
}
</script>

<style lang="scss" scoped>
  .app__login {
    width: 100%;
    min-height: 100vh;
    padding: 20px 50px;
  }

  .login__form {
    max-width: 432px;
    width: 100%;
    min-height: 590px;
    padding: 0 36px 52px;

    background: #30363E;

    &.form-invalid {
      input {
        color: var(--primary-color) !important;
      }
    }
  }

  .login__title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;

    margin-top: 48px;

    text-align: center;

    color: var(--secondary-color);

    &::after {
      content: '';
      display: block;
      width: 113px;
      height: 1px;
      background: #C4C4C4;
      margin: 37px auto 0;
    }
  }

  .form__body {
    margin-top: 51px;
    position: relative;
  }

  .form__group-input {
    margin-bottom: 29px;

    &:nth-child(2) {
      margin-bottom: 48px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .form-label {
    display: block;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 18px;

    color: #ECECEC;
  }

  .form-control {
    width: 100%;
    height: 75px;
    border: 1px solid var(--primary-color);
    outline: none;
    background: none;

    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: var(--secondary-color);

    padding: 0 22px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }


  }

  .form__group-input {
    &.error {
      position: absolute;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      margin-top: -35px;
      transition: all .2s ease-in-out;

      color: var(--primary-color);
    }
  }

  @media ( max-width: 460px ) {
    .app__login {
      padding: 20px 10px;
    }

    .login__title {
      margin-top: 5px;
    }

    .login__form {
      padding: 36px 10px;
    }
  }

</style>
