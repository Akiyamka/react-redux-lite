import { useEffect } from 'react';
import CheckerWithMemory from '../../../tools/checkerWithMemory';
import store, { dispatch } from 'Services/store';
import { setLayer } from 'Entities/layers';

export const createIsochroneURL = uuid => `${process.env.ISOCHRONE_ENDPOINT}/isochrone/${uuid}/{z}/{x}/{y}`;

function createSteps({ colors, min, max, current, isHaveShape }) {
  const colorsExceptLast = colors.slice(0, isHaveShape ? undefined : -1); // last color not used

  return colorsExceptLast.reduce((acc, color, i) => {
    acc.push(i * (current / colorsExceptLast.length - 1));
    acc.push(color);
    return acc;
  }, []);
  // 0, '#1a9641',
  // 25, '#a6d96a',
  // 50, '#ffffc0',
  // 75, '#fdae61',
  // 100, '#d7191c',
}

function createMapBoxTileLayer(id, legend) {
  if (!id || !legend) return null;
  const tileURL = createIsochroneURL(id);
  const colorSteps = createSteps(legend);
  return {
    id,
    layer: {
      id: `${id}-layer`,
      source: `${id}-source`,
      'source-layer': 'isochrone',
      type: 'fill',
      paint: {
        'fill-antialias': false,
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'min'],
          ...colorSteps
        ],
        'fill-opacity': { // 0.5 when got shape
          property: 'min',
          stops: [
            [0, 0.5],
            [Math.round(legend.current), 0],
          ],
          type: 'interval'
        }
      }
    },
    source: {
      id: `${id}-source`,
      type: 'vector',
      tiles: [tileURL],
    },
  };
}

const legendHaveChanges = CheckerWithMemory(val => JSON.stringify(val));
const taskHaveChanges = CheckerWithMemory(val => val.id + val.status);
let lastCreatedLegend;
let lastID;

export default function useMapBoxLayers() {
  useEffect(() => {
    return store.subscribe(({ legend, task }) => {
      const legendChanged = legend && legendHaveChanges(legend);
      const taskChanged = task && taskHaveChanges(task);
      if (!legendChanged && !taskChanged) return;
      let layerLegend;
      let taskId;

      if (legend && legendChanged) {
        layerLegend = legend;
        lastCreatedLegend = legend;
      } else {
        layerLegend = lastCreatedLegend;
      }

      if (task && taskChanged) {
        if (task && task.status === false) {
          taskId = lastID;
        } else {
          taskId = task.id;
          lastID = task.id;
        }
      } else {
        taskId = lastID;
      }

      if (!layerLegend || !taskId) return;
      const layer = task && createMapBoxTileLayer(taskId, layerLegend);
      dispatch(setLayer)(layer);
    });

  }, []);
}

