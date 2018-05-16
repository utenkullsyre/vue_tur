<template lang="html">
  <nav class="gruppe-el" v-if="gruppeSynlig">
    <span class="gruppe-el-tittel tittel" @click="velgGruppe" :data-id=gruppenavn :class="{aapenNav: gruppeAktiv}">Kartlag</span>
    <!-- <transition name="aktivToggle"> -->
      <ul v-if="gruppeAktiv">
        <li v-for="item,key in kartlag" @click="velgLag" :data-id="key" :class="{inaktiv: !aktiveKartlag.includes(item.id)}"> {{item.id}} </li>
        <!-- <li data-lag="bratthet" >Helling</i></li>
        <li data-lag="skredhendelse" >Skredhendelser </li>
        <li data-lag="regobs">Snøobservasjoner <img src="../../assets/regobs.png" alt=""></li> -->
      </ul>
    <!-- </transition> -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      gruppeAapen: true,
      gruppenavn: 'Kartlag',
      aktiveKartlag: []
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
    },
    kartlag() {
      if(this.$store.state.kart.kartlag) {
        return this.$store.state.kart.kartlag
      } else {
        return {
          navn: ['Grafikk', 'Helling', 'Skredhendelser']
        }
      }
    },
  },
  methods: {
    test() {
      alert(this.gruppeAktiv)
    },
    fjernString(array, el) {
      return array.filter(e => e !== el)
    },
    velgLag(evt) {
      let valgtLag = evt.target.innerText
      if (this.aktiveKartlag.includes(valgtLag)) {
        console.log('Inkluderer');
        this.aktiveKartlag = this.fjernString(this.aktiveKartlag, valgtLag)
        this.kartlag[evt.target.attributes['data-id'].value].visible = false
      } else {
        this.aktiveKartlag.push(valgtLag)
        this.kartlag[evt.target.attributes['data-id'].value].visible = true
      }
      // this.aktiveKartlag = this.kartlag.includes(valgtLag) ? this.fjernString(this.aktiveKartlag, valgtLag) : this.aktiveKartlag.push(valgtLag)
      console.log(this.aktiveKartlag);
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

  .inaktiv {
    color: rgb(159, 159, 159);
    font-style: italic;
  }
</style>
