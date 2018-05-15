import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    grafikkLagret: false,
    grafikk: null,
    uiActive: false,
    sidenav: {
      sidenavOpen: false,
      undergruppeOpen: false,
      aktivGruppe: '',
      synligeGrupper: ['Bakgrunnskart', 'Kartlag', 'Tegnforklaring', 'Verktøy', 'Om']
    },
    kart: {
      valgtBakgrunnskart: 'Flyfoto',
      bakgrunnslag: null,
      kartlag: null,
      view: null,
      map: null,
    }
  },
  getters: {
    sjekkGruppe: (state) => (val) => {
      return state.sidenav.aktivGruppe === val
    },
    aapenUndergruppe(state) {
      return state.sidenav.aktivGruppe.length > 0
    },
    synligGruppe: (state) => (val) => {
      return state.sidenav.synligeGrupper.includes(val)
    }
  },
  mutations: {
    alterSidenav(state, val) {
      state.sidenav.sidenavOpen = val;
    },
    setAktivGruppe(state, gruppenavn) {
      state.sidenav.aktivGruppe = gruppenavn
    },
    setMap(state, map) {
      state.kart.map = map
    },
    setKartlag(state, kartlag) {
      state.kart.kartlag = kartlag
    },
    setView(state, view) {
      state.kart.view = view
    },
    setBakgrunnslag(state, bakgrunnslag) {
      state.kart.bakgrunnslag = bakgrunnslag
    },
    setSynligegrupper(state, synligegrupper) {
      state.sidenav.synligeGrupper = synligegrupper
    }
    // aktivtBakgrunnskart(state, val) {
    //   state.sidenav.
    // }
  }
})
