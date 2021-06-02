import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations( 'CheckModule', [
      'updateInput'
    ]),
    ...mapMutations( 'PlayerModule', [
      'updateVisiblePLayerModal'
    ]),
    openVisibilityPlayerModal( login ) {
      this.updateInput( login );

      this.updateVisiblePLayerModal( true );
    },
    hideVisibilityPlayerModal() {
      this.updateVisiblePLayerModal( false );
    },
  }
}
