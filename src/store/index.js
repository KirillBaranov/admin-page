import Vue from 'vue'
import Vuex from 'vuex'

// modules.
import AuthModule from './modules/auth';
import AnimationModule from './modules/animation';
import CheckModule from "./modules/check";
import PlayerModule from "./modules/player";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AuthModule,
    AnimationModule,
    CheckModule,
    PlayerModule
  }
})
