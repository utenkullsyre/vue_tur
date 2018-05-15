<template lang="html">
  <nav class="gruppe-el" @click="velgGruppe" v-if="gruppeSynlig">
    <span class="tittel gruppe-el-tittel" :data-id=gruppenavn :class="{aapenNav: gruppeAktiv}">Verktøy</span>
    <!-- <ul v-if="gruppeAktiv">
      <li @click="delKart">Del kart</li>
      <li class="ikke-implementert">Måle</li>
      <li @click="hentData">Hent skreddata</li>
      <li @click="groupElState.gpxLoad = !groupElState.gpxLoad" name="gps">Last opp spor</li>
        <ul v-if="groupElState.gpxLoad">
          <p>Her kan du laste opp en gps-fil(.gpx) for å vise den i terrenget</p>
          <div class="upload-btn-wrapper">
            <button class="btn">Last opp ditt spor</button>
            <input type="file" name="myfile" id="upload-file"@change="leggTilFil"/>
          </div>
          <p><small>Det legges ikke til noe informsjon på opplastet spor utover plassering i terrenget</small></p> -->

          <!-- <input type="file" id="upload-file"@change="leggTilFil"/> -->
        <!-- </ul>
        <li @click="finnMeg">Finn meg</li>
    </ul> -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      gruppeAapen: true,
      gruppenavn: 'Verktøy'
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
