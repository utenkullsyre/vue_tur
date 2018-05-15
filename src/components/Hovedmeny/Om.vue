<template lang="html">
  <nav class="gruppe-el" @click="velgGruppe" v-if="gruppeSynlig">
    <span class="tittel gruppe-el-tittel" :data-id=gruppenavn :class="{aapenNav: gruppeAktiv}">Om</span>
    <!-- <transition name="aapne"> -->
      <div id="om" class="underelement" v-if="gruppeAktiv">
        <h3>--|| Denne siden er under arbeid ||--</h3>
        <ul>
          <li class="ikke-implementert">Sidelosen</li>
          <li class="ikke-implementert">Hjelpedokumentasjon</li>
          <li class="ikke-implementert">Kreds</li>
        </ul>
        <p>Mye av funksjonaliteten er ikke ferdig enda. Men mye av det fungerer også, så slapp av.</p>
        <p>Stedsdata hentes fra kartverket sine api'er, snøobservasjoner fra regObs sin api og skredhendelser fra NVE sine data</p>
        <p>For å visualisere kartdata bruker jeg ESRI sitt javascript API Arcgis JS. </p>
        <p>Skal legge til ordentlig kred-seksjon for dette om litt, med en nærmere beskrivelse</p>
      </div>
    <!-- </transition> -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      gruppeAapen: true,
      gruppenavn: 'Om'
    }
  },
  computed: {
    valgtBakgrunn() {
      return this.$store.state.kart.valgtBakgrunnskart
    },
    aktivGruppe(){
      return this.$store.state.sidenav.aktivGruppe
    },
    gruppeAktiv() {
      return this.$store.getters.sjekkGruppe(this.gruppenavn)
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

  .tittel span{
    user-select: none;
  }
</style>
