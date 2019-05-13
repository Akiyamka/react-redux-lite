import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/react';
import { actions } from 'Services/store';
import Watcher from './../../../tools/watcher';
const watcher = new Watcher();
import useMapBox from './useMapBox';
import useIsochroneAPI from './useIsochroneAPI';
import useMapBoxLayers from './useMapBoxLayers';
import style from './style.styl';

function Map({ markers, mode, position, layers, addMarker }) {
  const [mapEl, setMapEl] = useState(null);
  const componentMounted = useCallback(setMapEl, []);
  const map = useMapBox({
    zoom: 5,
    minZoom: 1,
    maxZoom: 22,
    bearing: 0,
    pitch: 0,
    style: process.env.MAPBOX_STYLE,
    center: position || [31.4037194, 33.9607027]
  }, mapEl);

  useIsochroneAPI();
  useMapBoxLayers();

  if (map) { // map loaded. Now u can use map interface (MapWrapper.js)
    /**
     * When change - trigger callback when props value change.
     * Pass [] for call callback only once when map loaded.
     * Pass function to third argument for set custom change-detector function
     */
    watcher.setCallbacks([
      watcher.whenChange([markers ], () => map.updateMarkers(markers)),
      watcher.whenChange([layers  ], () => map.updateLayers(layers)),
      watcher.whenChange([mode    ], () => map.switchMode(mode)),
      watcher.whenChange([position], () => map.changePosition(position)),
      watcher.whenChange([],         () => map.on('addMarker', e => addMarker(e.lngLat))),
    ]);
  }

  return <div className={style.map} ref={componentMounted}></div>;
}

Map.propTypes = {
  markers: PropTypes.array,
  mode: PropTypes.string,
  position: PropTypes.array,
  layers: PropTypes.array,
  addMarker: PropTypes.func
};

export default connect(['markers', 'mode', 'layers'], actions)(Map);

