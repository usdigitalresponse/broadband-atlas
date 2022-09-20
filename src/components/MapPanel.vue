<template>
  <div class="map-panel">
    <div id="map" />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapState } from 'vuex';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFuYmFsYW5nYSIsImEiOiJjbDE1cjE0cDc0MHp0M2JwazNsbXA5MDRoIn0.6V1oG3w1m_oB_-KO2ml_BA';

export default {
  mounted() {
    const map = this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-154.693730, 64.412825],
      zoom: 3.75,
      minZoom: 3,
      maxZoom: 10,
    });

    map.on('load', this.mapDidLoad);
    map.on('click', this.didClickMap);
  },
  computed: {
    ...mapState({
      selectedMapView: state => state.selectedMapView,
      selectedTechnology: state => state.selectedTechnology,
    }),
    fillColor() {
      const { selectedMapView } = this;

      let fillColor;

      if (selectedMapView === 'served-blocks') {
        fillColor = [
          'case',
          [
            'all',
            ['>=', ['to-number', ['get', 'fastest_service_speed_down']], 25],
            ['>=', ['to-number', ['get', 'fastest_service_speed_up']], 3],
          ],
          'rgb(147, 255, 133)',
          'rgb(255, 155, 133)',
          // default
          // '#000'
        ];
      } else if (selectedMapView === 'speeds') {
        fillColor = [
          'step',
          ['to-number', ['get', 'fastest_service_speed_down']],
          'blue',
          // HACK to make sure we don't have any zeroes
          0.0000001,
          '#d73027',
          5,
          '#fc8d59',
          10,
          '#fee08b',
          25,
          '#d9ef8b',
          50,
          '#91cf60',
          250,
          '#1a9850',
        ];
      } else if (selectedMapView === 'technologies') {
        const { selectedTechnology } = this;
        const selectedTechnologyCodes = this.$config.fccTechnologyCodes[selectedTechnology];
        
        fillColor = [
          'case',
          [
            'any',
            ...selectedTechnologyCodes.map((code) => {
              return ['in', code, ['get', 'tech_codes']];
            }),
          ],
          'yellow',
          'gray',
        ];
      } else {
        console.error(`fillColor: unhandled map view ${mapView}`);
      }

      return fillColor;
    },
  },
  watch: {
    selectedMapView() {
      this.redrawMap();
    },
    // TODO is is janky to watch this separately from selected map view? merge
    // somehow?
    selectedTechnology() {
      this.redrawMap();
    },
  },
  methods: {
    mapDidLoad() {
      const { map } = this;
      const fillColor = this.fillColor;

      // do stuff so we can add the census block layer below the map labels
      // https://docs.mapbox.com/mapbox-gl-js/example/geojson-layer-in-stack/
      const layers = map.getStyle().layers;
      let firstSymbolId;

      for (const layer of layers) {
        if (layer.type === 'symbol') {
          firstSymbolId = layer.id;
          break;
        }
      }

      map.addLayer(
        {
          id: 'blocks',
          source: {
            type: 'vector',
            tiles: ['https://broadband-atlas-preview-tiles.nyc3.digitaloceanspaces.com/{z}/{x}/{y}.pbf'],
          },
          'source-layer': 'broadband_census_blocks_ak',
          type: 'fill',
          paint: {
            'fill-color': fillColor,
            'fill-outline-color': '#aaa',
          },
        },
        firstSymbolId
      );
    },
    didClickMap(e) {
      const { map } = this;
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['blocks'],
      });

      // TODO filter features by layer id

      if (features.length > 1) {
        console.error(`didClickMap: more than 1 feature selected (count: ${features.length})`);
        return;
      } else if (features.length === 0) {
        // TODO some feedback to user?
        return;
      }

      const [ block ] = features;
      const props = block.properties;

      this.$store.commit('setSelectedBlock', props);

      // fetch providers
      // TEMP turn this off till the DB is working again
      // this.$store.dispatch('fetchProviders');

      // clean up existing layer if there is one
      if (map.getLayer('selected-block')) {
        map.removeLayer('selected-block');
      }

      if (map.getSource('selected-block')) {
        map.removeSource('selected-block');
      }

      map.addLayer({
        id: 'selected-block',
        source: {
          type: 'geojson',
          data: block,
        },
        type: 'line',
        paint: {
          'line-color': 'rgb(255, 0, 0)',
          'line-width': 3,
        },
      });
    },
    redrawMap() {
      const nextFillColor = this.fillColor;
      this.map.setPaintProperty('blocks', 'fill-color', nextFillColor);
    },
  },
};
</script>

<style>
.map-panel {
  flex-grow: 1;
}

#map {
  height: 100%;
}
</style>
