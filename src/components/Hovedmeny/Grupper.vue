<template lang="html">
  <div class="">
    <section-bakgrunnskart></section-bakgrunnskart>
    <section-kartlag></section-kartlag>
    <section-verktoy></section-verktoy>
    <section-om></section-om>
  </div>
</template>

<script>
import Bakgrunnskart from './Bakgrunnskart.vue'
import Kartlag from './Kartlag.vue'
import Verktoy from './Verktoymeny.vue'
import Om from './Om.vue'

export default {

  data() {
    return {

    }
  },
  components: {
    sectionBakgrunnskart: Bakgrunnskart,
    sectionKartlag: Kartlag,
    sectionVerktoy: Verktoy,
    sectionOm: Om
  }
}
</script>

<style lang="css">
  .gruppe-el {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-self: center;
    width: 100%;
    transition: all 0.15s;
    cursor: pointer;
    overflow: hidden;
    user-select: none;
  }
  .tittel {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .tittel:hover {
    background-color: #d1d6ce;
  }
  .aapenNav {
    background-color: #d1d6ce;
    border-bottom: 2px rgb(149, 149, 149) solid;
  }
  .gruppe-el-tittel {
    color: #f9f9f9;
    font-size: 2em;
    width: 100%;
    font-weight: bold;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 1.9em;
    width: 100%;
  }
  li{
    padding: 3px 15px;
    width: 100%;
    transition: all 0.2s;
  }
  li:hover {
    background-color: rgb(217, 217, 217)
  }
</style>
