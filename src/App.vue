<template>
  <div id="app">
    <app-map></app-map>
    <app-nav></app-nav>
  </div>
</template>

<script>
import Map from './components/Map/Map.vue'
import Sidenav from './components/Hovedmeny/Sidemeny.vue'

export default {
  name: 'app',
  components: {
    appMap: Map,
    appNav: Sidenav
  },
  data () {
    return {

    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Rambla');

#app {
  font-family: 'Rambla', Helvetica, Arial, sans-serif;
  height: 100%;
  width: 100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
