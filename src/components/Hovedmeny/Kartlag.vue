<template lang="html">
  <nav class="gruppe-el" @click="velgGruppe" v-if="gruppeSynlig">
    <span class="gruppe-el-tittel tittel" :data-id=gruppenavn :class="{aapenNav: gruppeAktiv}">Kartlag</span>
    <!-- <transition name="aktivToggle"> -->
      <ul v-if="gruppeAktiv">
        <li data-lag="bratthet" >Helling</i></li>
        <li data-lag="skredhendelse" >Skredhendelser </li>
        <li data-lag="regobs">Snøobservasjoner <img src="../../assets/regobs.png" alt=""></li>
      </ul>
    <!-- </transition> -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      gruppeAapen: true,
      gruppenavn: 'Kartlag'
    }
  },
  computed: {
    gruppeAktiv() {
      return this.$store.getters.sjekkGruppe(this.gruppenavn)
    },
    aktivGruppe(){
      return this.$store.state.sidenav.aktivGruppe
    },
    gruppeSynlig() {
      return this.$store.getters.synligGruppe(this.gruppenavn)
    }
  },
  methods: {
    test() {
      alert(this.gruppeAktiv)
    },
    velgGruppe(evt){
      let valgtgruppe = evt.target.attributes["data-id"].value;
      let aktivgruppe = ''
      if (this.aktivGruppe === valgtgruppe) {
        this.$store.commit('setSynligegrupper', ['Bakgrunnskart', 'Kartlag', 'Tegnforklaring', 'Verktøy', 'Om'])
      } else {
        aktivgruppe = valgtgruppe
        this.$store.commit('setSynligegrupper', [valgtgruppe])
      }
      this.$store.commit('setAktivGruppe', aktivgruppe)
      console.log(this.gruppeSynlig, [valgtgruppe]);
    }
  }
}
</script>

<style lang="css">
  #valgt-bakgrunn{
    font-size: 2em;
    font-style: italic;
  }
</style>
