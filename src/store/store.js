import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    grafikkLagret: false,
    grafikk: null,
    uiActive: false,
    sidenavOpen: false
  },
  // getters: {
  // },
  mutations: {
    alterSidenav(state, val) {
      state.sidenavOpen = val;
    }
  }
})
