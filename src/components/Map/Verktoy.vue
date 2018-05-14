<template lang="html">
  <!-- <div id="upperRight" v-if="!lagraGrafikk"> -->
  <div id="upperRight">
    <transition name="fade" mode-out="out-in">
      <button type="button" name="undo" @click="verktoyAktiv=!verktoyAktiv" :Class="{aktiv: verktoyAktiv}" v-if="!verktoyAktiv"><i class="material-icons">build</i></button>
      <button type="button" name="undo" @click="verktoyAktiv=!verktoyAktiv" :Class="{faded: verktoyAktiv}" v-if="verktoyAktiv"><i class="material-icons">close</i></button>
    </transition>
    <transition name="fade" mode-out="out-in">
      <div id="toolbox" v-if="verktoyAktiv">
          <div class="knapperad left">
            <button type="button" @click="test"><i class="material-icons">tab</i></button>
            <button type="button"><i class="material-icons">aspect_ratio</i></button>
            <!-- <button type="button"><i class="material-icons">wallpaper</i></button> -->
            <button type="button" name="undo" @click="finnMeg"><i class="material-icons">gps_fixed</i></button>

          </div>
        <div class="knapperad down">
          <div id="zoom">
            <button type="button" name="zoom-in" @click="zoom('inn')"><i class="material-icons">add</i></button>
            <button type="button" name="zoom-out" @click="zoom"><i class="material-icons">remove</i></button>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
import axios from 'axios'
import {verktoyMixin} from '../../verktoyMixin'

export default {
  mixins: [verktoyMixin],
  props: ['view', 'lukkMeny'],
  data() {
    return {
      verktoyAktiv: false,

    }
  },
  computed: {
    menyAapen () {
      if (this.lukkMeny) {
        this.verktoyAktiv = false;
      }
    },
    lagraGrafikk() {
      if (this.$store.state.grafikk) {
        return true
      } else {
        return false
      }
    },
    uiActive: {
      get() {return this.$store.state.uiActive},
      set(val) {this.$store.commit('oppdaterUiActive', val)}
    }
  },
  methods: {
    zoom(verdi) {

      if (verdi === 'inn') {
        this.view.zoom++
      } else {
        this.view.zoom--
      }
    },
    finnMeg() {
      this.getPreciseLocation()
      .then((response) => {
        this.transformerKoord(response[1], response[0], 84, 23)
        .then((response) =>{
          let pos = {x: response.data.ost, y: response.data.nord}
          this.$emit('minPlassering', pos)
        })
      })
    },
    transformerKoord (x, y, fra, til) {
      const url = "https://ws.geonorge.no/transApi?";
      let options = {
       params: {
         ost: x,
         nord: y,
         fra: fra,
         til: til
       }
     };
     return axios.get(url, options);
   },
   test() {
     alert(this.uiActive.get())
   }
  }
}
</script>

<style lang="css" scoped>
#upperRight{
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  box-sizing: border-box;
}

.knapperad{
  margin: 2px;
  position: relative;
}

.left {
  position: absolute;
  top: -2px;
  left: -89px;
  display: flex;
  align-items: flex-end;
}

.down {
  position: absolute;
  top: 40px;
  left: -2px;
  display: flex;
  flex-flow: column nowrap;
}

#zoom button{
  margin-bottom: 2px;
}

button{
  color: rgb(238, 142, 0);
  margin: 0 2px;
  height: 40px;
  width: 40px;
  border: 2px solid #ecb140;
  border-radius: 4px;
  background-color: rgb(255, 233, 212);
  transition: background-color 0.1s ease-in;
  cursor: pointer;
}

button:hover , .aktiv{
  background-color: #f9c667
}

button:active {
  background-color: #ffffff
}

button:focus{
  outline: 0
}

.right{
  justify-content: flex-end;
}

.fade-enter-active, .fade-leave-active {
transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.faded {
  opacity: 0.5;
}

@media (max-width: 480px) {
  #upperRight{
    top: 1px;
    right: 0px;
  }
}
</style>
