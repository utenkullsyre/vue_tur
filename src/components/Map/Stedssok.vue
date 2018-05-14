<template lang="html">
  <!-- <div id="sokInfo" v-if="!lagraGrafikk"> -->
  <div id="sokInfo" >
    <!-- Stedssøk input -->
    <div id="search">
      <i class="material-icons">menu</i>
      <input type="text" placeholder="Søk på stedsnavn" v-model="stedsNavn" @keyup="stedSok">
      <!-- <input type="text" placeholder="Søk på stedsnavn" :value="stedsNavn" @keyup="stedSok"> -->
    </div>

    <!-- Stedssøk resultat -->
    <div id="searchResult" v-if="stedsNavn.length > 0">
      <ul>
        <li v-for="item in resultat" :data-x="item.x" :data-y="item.y" @click="zoomTilSted">{{ item.navn }}, {{ item.type }} i {{ item.kommune }}</li>
      </ul>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      stedsNavn: '',
      resultat: [],
      valgtSted: false
    }
  },
  props: ['pos'],
  computed: {
    lagraGrafikk() {
      if (this.$store.state.grafikk) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    resetSok() {
      this.stedsNavn = '';
      this.valgtSted = true;
    },
    stedSok(evt) {
      if(evt.target.value.length>0){
        var url = "https://ws.geonorge.no/SKWS3Index/v2/ssr/sok?"
        if(evt.target.value.split(",")[1]){
          var inputNavn = evt.target.value.split(",")[0];
          var inputEkstra = evt.target.value.split(",")[1];
        } else {
          var inputNavn = evt.target.value;
          var inputEkstra = "";
        }
        var options = {
            params: {
              navn: inputNavn + "*",
              fylkeKommuneNavnListe: inputEkstra,
              eksakteForst:true,
              antPerSide:15,
              epsgKode:25833,
            },
            responseType: 'xml'
          };
          axios.get(url, options)
          .then((response) => {
            // console.log(response);
            this.resultat = response.data.stedsnavn.map((el)=>{
              return {
                navn: el.stedsnavn,
                type: el.navnetype,
                kommune: el.kommunenavn,
                fylke: el.fylkesnavn,
                x: el.aust,
                y: el.nord
              };
            });
            // console.log(this.resultat);
          });
      }
    },
    zoomTilSted(evt) {
      let pos = {
        x: parseInt(evt.target.attributes["data-x"].value),
        y: parseInt(evt.target.attributes["data-y"].value)
      };
      this.$emit('valgt-sted', pos)
      this.resetSok();

    }
  }
}
</script>

<style lang="css" scoped>
  #search {
    display: flex;
    flex-flow: row nowrap;
    float:left;
    margin: 10px;
    position: absolute;
    top:0;
    left:0;
    height: 40px;
    border: 2px solid #ecb140;
    border-radius: 4px;
    background-color: rgb(255, 233, 212);
    overflow: hidden;
    padding-left: 5px;
    transition: width 0.2s;
  }

  #search i {
    margin: auto;
    font-size: 32px;
    transition: all 0.3s;
    user-select: none;
    position: relative;
    left:0px;
    box-sizing: border-box;
  }

  #search i:hover {
    font-weight: bold;
  }

  #search i:active{
    color: rgb(200, 200, 200);
    animation: scale 0.8s ease-out;
  }

  #search i:focus{
    animation: scale 0.8s ease-out;
  }

  @keyframes scale {
    50% {
      -webkit-transform: scale(1.5, 1.5);
              transform: scale(1.5, 1.5);
      opacity: 0;
    }
    99% {
      -webkit-transform: scale(0.001, 0.001);
              transform: scale(0.001, 0.001);
      opacity: 0;
    }
    100% {
      -webkit-transform: scale(0.001, 0.001);
              transform: scale(0.001, 0.001);
      opacity: 1;
    }
  }

  input[type=text] {
    position: relative;
    border: none;
    top:0;
    /* left:30px; */
    width: 30px;
    height: 40px;
    box-sizing: border-box;
    font-size: 1.5em;
    font-family: 'Rambla', sans-serif;
    background-color: rgb(255, 233, 212);
    background-image: url(../../assets/searchicon.png);
    background-position: 10px 9px;
    background-repeat: no-repeat;
    padding: 5px 0px 5px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
    max-width: 400px;
    outline:none;
  }


  input[type=text]:focus {
      width: 400px;
  }

  input:active {
    box-shadow: 1px 1px 3px rgb(186, 165, 148)
  }

  #sokInfo{
    position: absolute;
    left: 0px;
    z-index: 10;
    width: 400px;
  }

  #searchResult{
    position: relative;
    left: 10px;
    top: 51px;
    /* padding: 5px 3px 5px 3px; */
    border: 2px solid #ecb140;
    width: 440px;
    background-color: rgb(255, 233, 212);
    box-sizing: border-box;
    max-height: 200px;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    overflow-y: scroll;
  }

  #searchResult .closebtn{
    position: absolute;
    right: 7px;
    top: -17px;
    text-decoration: none;
    color: black;
    font-size: 3.5em;
  }

  #searchResult ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  #searchResult ul li{
    text-align: left;
    font-size: 1.2em;
    padding: 5px 0 5px 5px;
    margin:0
  }

  #searchResult ul li:hover{
    background-color: rgb(242, 189, 138);
  }


  #sokResultat{
    position: absolute;
    top: 45px;
    background-color: white;
    border-radius: 4px;
    max-height: 0px;
  }

  @media (max-width: 480px) {
    #search{
      top:0;
      left:0;
      margin:0;
    }

    input[type=text]:focus {
        width: 99%;
    }

    input[type=text] {
      margin:1px;
      transition: none;
    }

    #sokInfo{
      position: absolute;
      z-index: 10 ;
      width: 100%
    }



    #searchResult{
      position: relative;
      left: 0px;
      top: 42px;
      width: 100%;
    }
  }
</style>
