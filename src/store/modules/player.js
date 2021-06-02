export default {
  namespaced: true,
  state: () => ({
    isVisiblePlayerModal: false
  }),
  mutations: {
    updateVisiblePLayerModal: ( state, payload ) => {
      state.isVisiblePlayerModal = payload;
    }
  }
}
