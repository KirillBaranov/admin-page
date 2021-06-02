export default {
  namespaced: true,
  state: () => ({
      show: false
  }),

  getters: {
  },

  mutations: {
    showLayer( state ) {
      state.show = true;
    },
    hideLayer( state ) {
      state.show = false;
    }
  },

  actions: {
  }
}
