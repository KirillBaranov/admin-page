export default {
  namespaced: true,
  state: () => ({
    select: {
      title: '',
      value: '',
      placeholder: 'Выберите пункт'
    },
    input: '',
    helpers: {
      servers: {
        current: '',
        list: []
      },
      players: {
        current: '',
        list: []
      }
    },
    time: {
      start: 0,
      end: 0
    }
  }),

  getters: {
    getServersList: state => {
      return state.helpers.servers.list;
    },
    getCurrentServer: state => {
      return state.helpers.servers.current;
    },
    getPlayersList: state => {
      return state.helpers.players.list;
    },
    getCurrentPlayer: state => {
      return state.helpers.players.current;
    },
    getQueryTime: state => {
      return (state.time.end - state.time.start) < 0 ? 0 : state.time.end - state.time.start;
    }
  },

  mutations: {
    clear: state => {
      state.input = '';
      state.select = {
        title: '',
        value: '',
        placeholder: 'Выберите пункт'
      };

      state.helpers.servers.current = '';

      state.helpers.players.current = '';
      state.helpers.players.list    = [];
    },
    updateSelect: ( state, payload ) => {
      if ( payload ) {
        state.select = payload;
      }
    },
    updateInput: ( state, payload = '' ) => {
      if ( payload || payload == '' ) {
        state.input = payload;
      }
    },
    updateServers: ( state, payload ) => {
      if ( payload ) {
        state.helpers.servers.list = payload;
      }
    },
    updateCurrentServer: ( state, payload ) => {
      if ( payload ) {
        state.helpers.servers.current = payload;
      }
    },
    updatePlayers: ( state, payload ) => {
      if ( payload ) {
        state.helpers.players.list = payload;
      }
    },
    updateCurrentPlayer: ( state, payload ) => {
      if ( payload ) {
        state.helpers.players.current = payload;
      }
    },
    updateTime: ( state, payload ) => {
      state.time[ payload.key ] = payload.value;
    }
  },

  actions: {
    fetchServersList: ( { commit } ) => {
      const url = 'https://mips-admin.kaboom2.net/api/?act=servers';

      const query = fetch( url, {
        method: 'post'
      });

      query.then( response => {
        try {
          response.json().then( result => {
            if ( result.error != '' ) {
              console.error( 'Query to API was rejected or wrongly read.' );

              return false;
            }

            commit( 'updateServers', result.result );
          });
        }

        catch ( e ) {
          throw e;
        }
      })

      query.catch( e => {
        console.error( e );
      });
    },
    fetchRecommendationList: ( { commit, state } ) => {
      if ( state.input || state.input == '' ) {
        const url = `https://mips-admin.kaboom2.net/api/?act=info&login=${state.input}`;

        const query = fetch( url, {
          method: 'post'
        });

        query.then( response => {
          try {
            response.json().then( result => {
              if ( result.error != '' ) {
                console.error( 'Query to API was rejected or wrongly read.' );

                return false;
              }

              commit( 'updatePlayers', result.result );
            });
          }

          catch ( e ) {
            throw e;
          }
        })

        query.catch( e => {
          console.error( e );
        });
      }
    }
  }
}
