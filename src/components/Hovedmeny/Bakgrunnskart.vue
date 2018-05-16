<template lang="html">
  <nav id="bakgrunnskart" :data-id='gruppenavn' class="gruppe-el" v-if="gruppeSynlig">
    <div class="tittel" :data-id='gruppenavn' :class="{aapenNav:gruppeAktiv}" @click="velgGruppe">
      <span class="gruppe-el-tittel" :data-id='gruppenavn'>Bakgrunn: </span><span id="valgt-bakgrunn" data-id="Bakgrunnskart"> {{ valgtBakgrunnskart }}</span>
    </div>
     <ul v-if="gruppeAktiv">
       <li v-for="item,key in bakgrunnskart" :class="{inaktiv: !(item.id === valgtBakgrunnskart)}" :data-id="item.id" @click="velgBakgrunnskart"> {{ item.id }}</li>
     </ul>
   </nav>
</template>

<script>
export default {
  data() {
    return {
      gruppeAapen: true,
      gruppenavn: 'Bakgrunnskart',
      valgtBakgrunnskart: 'Flyfoto'
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
    },
    bakgrunnskart() {
      if(this.$store.state.kart.bakgrunnslag) {
        return this.$store.state.kart.bakgrunnslag
      } else {
        return {
          navn: ['Landkart', 'Flyfoto', 'Gråtone']
        }
      }
    },

  },
  methods: {
    velgBakgrunnskart(evt) {
      let valgtBakgr = evt.target.innerText
      this.valgtBakgrunnskart = valgtBakgr
      this.bakgrunnskart.map((el)=> {
        if (valgtBakgr === el.id) {
          console.log('test',valgtBakgr,'test2',el.id);
          console.log(el);
          el.visible = true
        } else {
          el.visible = false;
        }
      })
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
    font-size: 1.7em;
    font-style: italic;
  }

  .tittel span{
    user-select: none;
  }

  .inaktiv{
    color: rgb(170, 170, 170);
    font-style: italic;
  }

  li:hover {
    color: black
  }
</style>
