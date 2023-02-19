import './style.css';
import Map from 'ol/Map';
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';


const tileLayer = new TileLayer({source: new OSM()});
const view = new View({center: [0, 0], zoom: 2});

const source = new VectorSource({
  url: '/data/geojson/map.geojson',
  format: new GeoJSON()
})
const vectorLayer = new VectorLayer({source: source});

const map = new Map({
  target: 'map',
  layers: [tileLayer, vectorLayer],
  view: view
});

vectorLayer.getSource().on('addfeature', () => {
  let zoomLevel = map.getView().getZoom();
  console.log(zoomLevel);
  let view = map.getView();
  view.fit(vectorLayer.getSource().getExtent());
  view.setResolution(2);
});
