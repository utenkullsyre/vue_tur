<template lang="html">
  <transition name="slide">
    <nav id="sidenav" v-if="navAapen">
      <header>
        <h1 id="title">Turur</h1>
        <div class="ikoner">
          <i id="lukknav" class="material-icons" @click="lukkNav" v-if="!gruppeAktiv">close</i>
          <i id="lukkundergruppe" class="material-icons" @click="lukkUndergruppe" v-if="gruppeAktiv">keyboard_arrow_left</i>
        </div>
      </header>
      <app-grupper></app-grupper>

        <!-- bakgrunnsKart -->

        <!-- Kartlag -->
        <!-- Tegnforklaring -->
        <!-- Verktøy -->
        <!-- om -->
    </nav>
  </transition>
</template>

<script>
import Grupper from './Grupper.vue'

export default {
  data() {
    return {
      helvete: true,
      undergruppeOpen: false
    }
  },
  components: {
    appGrupper: Grupper
  },
  computed: {
    navAapen() {
      return this.$store.state.sidenav.sidenavOpen
    },
    gruppeAktiv() {
      return this.$store.getters.aapenUndergruppe
    },
    synligeGrupper() {
      return this.$store.state.sidenav.synligeGrupper
    }
  },
  methods: {
    lukkNav() {
      this.$store.commit('alterSidenav', false)
    },
    lukkUndergruppe() {
      let synligegrupper = ['Bakgrunnskart', 'Kartlag', 'Tegnforklaring', 'Verktøy', 'Om']
      console.log('Før klikk', this.synligeGrupper);
      this.$store.commit('setAktivGruppe','')
      this.$store.commit('setSynligegrupper', synligegrupper)
      console.log('Etter klikk', this.synligeGrupper);
    }
  }
}
</script>

<style lang="css" scoped>
  #sidenav {
    height: 100%;
    width: 350px;
    position: absolute;
    z-index: 100;
    top: 0;
    /* left: -353px; */
    background-color: #bfc8ba;
    overflow-x: hidden;
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgb(101, 101, 101);
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .ikoner i{
    margin: 8px;
    position: relative;
    user-select: none;
  }

  #lukkundergruppe{
    font-size:35px;
    /* top:-8px; */
    /* right:-9px; */
  }

  #lukknav {
    cursor: pointer;
    font-weight: bold;
    font-size: 35px;
    /* top: -5px; */
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
  }

  #lukkNav:active{
    animation: bounce-in .3s ease-out;
  }

  #title {
    margin: 8px;
    font-size: 2em
  }

  #title:before{
    content: '';
    background-image: url(../../assets/fjell.svg);
    background-repeat: no-repeat;
    height: 35px;
    width: 35px;
    padding-left: 10px;
    float: left;
    display: block;
    /* margin: 0 6px 0 6px; */
  }

  @keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-enter-active, .slide-leave-active {
    transition: all .3s ease;
  }
  .slide-enter
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(-353px);
  }

  .slide-leave-to {
      transform: translateX(-353px);
      opacity: 0;
    }

  @media (max-width: 480px) {
    #sidenav{
      width: 100%;
    }
  }
</style>
