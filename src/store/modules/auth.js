import router from '../../router/index.js';

import { status, json } from "../../assets/js/helpers/fetch";

export default {
  namespaced: true,
  state: () => ({
    token: null,
    api: {
      url: 'https://mips-admin.kaboom2.net/api/'
    },
    user: null,
    error: {
      status: 'ok',
      msg: ''
    },
  }),

  getters: {
    isAuthenticated: state => {
      return state.user && state.user.success;
    },
    getStaff: state => {
      return state.user && state.user.stuff ? state.user.stuff : false;
    }
  },

  mutations: {
    auth: ( state, payload ) => {
      state.user = payload;
    },
    logout: state => {
       state.user = null;

      localStorage.removeItem( 'user' );

      router.push( '/login' );
    },
    fallback( state, { status, msg } ) {
      state.error = {
        status,
        msg
      }
    },
    fallbackClear( state ) {
      state.error = {
        status: 'ok',
        msg: ''
      }
    }
  },

  actions: {
    login: ( { state, commit  }, payload ) => {
      try {
        const query = fetch( state.api.url, {
          method: 'post',
          body: payload
        })

        query.then( response => status( response ) )
        .then( response => json( response ) )
        .then( data => {
            if ( !data.result.success ) {
              commit( 'fallback', {
                status: 'error',
                msg: data.result.error
              });

              return false;
            }

            localStorage.setItem( 'user', JSON.stringify( data.result ) );
            localStorage.setItem( 'lastQueryTime', data.time );

            commit( 'auth', data.result );

            commit( 'fallbackClear' );

            router.push( '/' );
          })
          .catch( error => {
            console.log('error', error)
          });
      }

      catch (e) {
        console.error( 'Ошибка прохождения аутентификации.' );
      }
    },
  }
}
