<template lang="html">
  <div id="viewDiv" ref="map">
    <map-loader :kartLastet="kartLastet" ></map-loader>
    <map-stedsok @valgt-sted="zoomTil"></map-stedsok>
    <map-verktoy :view="kartView" :lukkMeny="lukkMeny" @minPlassering="zoomTil"></map-verktoy>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
import Search from './Stedssok.vue'
import Loader from './Loader.vue'
import Verktoy from './Verktoy.vue'

export default {
  data() {
    return {
      data: 'test',
      kartView: null,
      kartDraw: null,
      baseMaps: null,
      mapLayers: null,
      kartLastet: false,
      lukkMeny: false,
      panActive: false,
      drawComplete: false,
      grafikkLagret: false
    }
  },
  computed: {
    lagraGrafikk() {
      if (this.$store.state.grafikk) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    mapStedsok: Search,
    mapLoader: Loader,
    mapVerktoy: Verktoy
  },
  methods: {
    zoomTil(pos) {
      // console.log(pos);
      loadModules([
        'esri/Graphic',
        'esri/geometry/Point',
        'esri/Viewpoint'
      ]).
      then(([Graphic, Point, Viewpoint])=> {
        var grafikk = new Graphic({
          geometry: new Point({
              x: pos.x,
              y: pos.y,
              spatialReference: {
                wkid: 25833
              }
            }),
          symbol: {
              type: "simple-marker",
              outline: {
                  width: 1.75,
                  color: [255, 0, 0, 1]
              }
          }
        })
        this.kartView.graphics.removeAll()
        this.kartView.graphics.add(grafikk)
        var viewpoint = new Viewpoint({
          targetGeometry: grafikk.geometry,
          scale: 30000,
          heading: 20,
          tilt: 50
        })

        var options = {
          easing: "in-out-cubic",
        }
        this.kartView.goTo(viewpoint, options)
      })
      // zoomTo(pos)
    },
    logView(evt){
      // console.log(this.kartView.toMap({x:evt.clientX, y:evt.clientY}));
      this.lukkMeny = true
    },
    zoomIntoView(evt) {
      alert(evt);
    }
  }
  ,
  created() {
    loadModules([
      'esri/Map',
      'esri/layers/TileLayer',
      'esri/layers/FeatureLayer',
      'esri/layers/MapImageLayer',
      'esri/Basemap',
      'esri/widgets/Compass',
      'esri/layers/ElevationLayer',
      'esri/views/SceneView',
      'esri/Graphic',
      'esri/Viewpoint',
      'esri/geometry/Point',
      'esri/geometry/Polygon',
      'esri/geometry/Circle',
      'esri/layers/GraphicsLayer',
      'esri/symbols/PictureMarkerSymbol',
      'dojo/on',
      'esri/config',
      'esri/core/promiseUtils',
      'esri/widgets/Sketch/SketchViewModel',
      'esri/geometry/Extent'
    ], {
      // use a specific version instead of latest 4.x
      url: 'https://js.arcgis.com/4.7/'
    }).
      then(([
             Map, TileLayer, FeatureLayer, MapImageLayer, Basemap, Compass, ElevationLayer,
             SceneView, Graphic, Viewpoint, Point, Polygon,
             Circle, GraphicsLayer, PictureMarkerSymbol, on,
             esriConfig, promiseUtils, SketchViewModel, Extent
           ]) => {

       esriConfig.request.corsEnabledServers.push("www.norgeskart.no");
       esriConfig.request.corsEnabledServers.push("ws.geonorge.no");
       esriConfig.request.corsEnabledServers.push("www.vegvesen.no");
        // create map with the given options at a DOM node w/ id 'mapNode'

        // Create elevation layers
        let bakke = new ElevationLayer({
          url: 'https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheTerreng/ImageServer'
        });

        let bilder = new TileLayer({
            url: 'https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheBilder/MapServer',
            id: 'Flyfoto',
            visible: true
          });

        let graatone = new TileLayer({
            url: 'https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheGraatone/MapServer',
            id: 'Gråtone',
            visible: false
          });

        let landskap = new TileLayer({
              url: 'https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheLandskap/MapServer',
              id: 'Landskap',
              visible: false
            });

        let tempGrafikk = new GraphicsLayer({
          id: "midlertidig grafikk",
          visible: true
        })

        let baseLayers = [bilder, graatone, landskap]
        let mapLayers = [tempGrafikk]

        let bakgrunnsKart = new Basemap({
          baseLayers: baseLayers,
          title: 'Bakgrunnskart',
          id: 'bakgrunnskart'
        });

        let extent = new Extent ({
          xmax:624096.1043825686,
          xmin:380255.6167015933,
          ymax:7761884.8668109365,
          ymin:7415089.506553549,
          spatialReference: {
            wkid: 25833
          }
        })

        let map = new Map({
          basemap: bakgrunnsKart,
          layers: mapLayers,
          ground: {
            layers: [bakke]
          }
        });

        let view = new SceneView({
          container: this.$refs.map,
          map: map,
          extent: extent
        });

        let compass = new Compass({
          view: view,
          container: document.querySelector('#kompass')
        })

        view.center = [679740.6418199595, 7564951.3128187675];
        view.zoom = 5;




        view.constraints.rotationEnabled = false
        view.ui.remove('zoom', 'top-right')
        view.ui.remove('navigation-toggle', 'top-right')
        view.ui.remove('compass', 'top-right')

        view.when(() => {
          view.on("click", () => {
            view.focus();
          })
          this.$emit('kartLastet', {view: view, lag: mapLayers});
          console.log('Map loaded', view);
          // console.log(sketch);
          this.kartLastet = true
          this.kartView = view;
          this.kartDraw = sketch;
          this.baseMaps = view.basemapView.baseLayerViews.items
          this.mapLayers = view.layerViews.items;
        })
      })
  }
}
</script>

<style lang="css" scoped>
  @import url('https://js.arcgis.com/4.7/esri/css/main.css');

  #viewDiv {
    height: 100vh;
    width: 100%;
    position: relative;
    cursor: pointer;
  }

  #viewDiv:focus {
    outline: 0;
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
