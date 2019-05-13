import MapboxGl from 'mapbox-gl';
MapboxGl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
import { addMakerMode } from 'Entities/mode/enum';
import style from './style.styl';

export default class MapWrapper {
  currentMod = null;
  _eventListeners = {
    addMarker: []
  };
  _makerEl = null;
  _currentMarkers = [];
  _currentLayer = null;
  _currentSource = null;

  constructor(options) {
    options.attributionControl = false;
    options.logoPosition = 'top-right';
    this.map = new MapboxGl.Map(options);
    this.map.addControl(new MapboxGl.AttributionControl(), 'bottom-right');
    this.map.on('load', event => this.onLoad(event));
    this.map.on('error', event => this.onError(event));
    this.map.on('click', event => this.onClick(event));

    this._createMarkerElement();
  }

  _createMarkerElement() {
    this._makerEl = document.createElement('div');
    this._makerEl.className = style.mark;
  }

  _getClearSourceCommand(id) {
    return () => {
      this._currentSource && this.map.removeSource(this._currentSource);
      this._currentSource = id;
    };
  }

  _getClearLayerCommand(id) {
    return () => {
      this._currentLayer && this.map.removeLayer(this._currentLayer);
      this._currentLayer = id;
    };
  }

  onLoad() {

  }

  onError(error) {
    // eslint-disable-next-line no-console
    console.warn('[MapBox]:', error.sourceId, error);
  }

  onClick(event) {
    if (this.currentMod === addMakerMode) {
      this._eventListeners.addMarker.forEach(cb => cb(event));
    }
  }

  updateMarkers(markers) {
    this.clearMarkers();
    if (!markers.length) return;
    // create a HTML element for each feature
    markers
      .map(m => new MapboxGl.Marker(this._makerEl.cloneNode(false)).setLngLat(m))
      .forEach(marker => {
        this._currentMarkers.push(marker);
        marker.addTo(this.map);
      });
  }

  // _currentLayer = null;
  updateLayers(layers) {
    // eslint-disable-next-line no-console
    layers.forEach(layer => {
      const { id: sourceID, ...source } = layer.source;
      let clearOldSource;
      let clearOldLayer;

      // TODO: Better just change data with map.setData()
      if (!this.map.getSource(sourceID)) {
        clearOldSource = this._getClearSourceCommand(sourceID);
        this.map.addSource(sourceID, source);
      }

      if (!this.map.getLayer(layer.layer.id)) {
        clearOldLayer = this._getClearLayerCommand(layer.layer.id);
        this.map.addLayer(layer.layer);
      } else {
        this.map.setPaintProperty(layer.layer.id, 'fill-color', layer.layer.paint['fill-color']);
        this.map.setPaintProperty(layer.layer.id, 'fill-opacity', layer.layer.paint['fill-opacity']);
      }

      if (clearOldSource && clearOldLayer) {
        // *Because we can't add layer before source, and remove source before layer
        clearOldLayer();
        clearOldSource();
      }

    });
  }

  clearMarkers() {
    this._currentMarkers.forEach(m => m.remove());
    this._currentMarkers = [];
  }

  switchMode(newMode) {
    this.currentMod = newMode;
  }

  changePosition() {

  }

  on(eventType, callback) {
    this._eventListeners[eventType].push(callback);
  }
}