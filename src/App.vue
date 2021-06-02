<template>
  <div class="app shrine-login" id="app">
    <div class="app__body">
      <transition name="app__swipe-animation">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

import AppHeader from "./components/layouts/AppHeader";

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  methods: {
    ...mapMutations( 'AuthModule', [
      'auth',
      'logout'
    ])
  },
  mounted() {
    try {
      const SESSION         = localStorage.getItem( 'user' ) ? JSON.parse( localStorage.getItem( 'user' ) ) : false;

      const isAuthenticated = SESSION && SESSION.success ? SESSION.success : false;

      if ( isAuthenticated ) {
        return this.auth( SESSION );
      }
    }

    catch ( e ) {
      console.error( e );

      this.logout();
    }
  }
}

</script>

<style lang="scss">
  @import "assets/scss/style";

  // change page animation.
  //.app__swipe-animation-enter-active {
  //  transition: all .4s ease;
  //}
  //.app__swipe-animation-leave-active {
  //  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  //}
  //.app__swipe-animation-enter, .app__swipe-animation-leave-to {
  //  transform: scale( 0 );
  //  opacity: 0;
  //}
</style>
