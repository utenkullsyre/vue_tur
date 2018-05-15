<template lang="html">
  <transition name="slide">
    <nav id="sidenav" v-if="navAapen">
      <header>
        <h1 id="title">Turur</h1>
        <i id="lukknav" class="material-icons" @click="lukkNav">close</i>
      </header>
    </nav>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      helvete: true
    }
  },
  computed: {
    navAapen() {
      return this.$store.state.sidenavOpen
    }
  },
  methods: {
    lukkNav() {
      this.$store.commit('alterSidenav', false)
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

  #lukknav {
    margin: 8px;
    cursor: pointer;
    font-size: 35px;
    font-weight: bold;
    user-select: none;
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
