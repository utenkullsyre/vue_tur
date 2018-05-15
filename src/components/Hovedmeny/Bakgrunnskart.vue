<template lang="html">
  <nav id="bakgrunnskart" :data-id=gruppenavn class="gruppe-el" v-if="gruppeSynlig">
    <div class="tittel" :data-id=gruppenavn :class="{aapenNav:gruppeAktiv}" @click="velgGruppe">
      <span class="gruppe-el-tittel" :data-id=gruppenavn>Bakgrunnskart: </span><span id="valgt-bakgrunn" data-id="Bakgrunnskart"> {{ valgtBakgrunn }}</span>
    </div>
     <ul v-if="gruppeAktiv">
       <li data-id="landskap">Landkart</li>
       <li data-id="bilder">Flyfoto</li>
       <li data-id="graatone">Gråtone</li>
     </ul>
   </nav>
</template>

<script>
export default {
  data() {
    return {
      gruppeAapen: true,
      gruppenavn: 'Bakgrunnskart'
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
