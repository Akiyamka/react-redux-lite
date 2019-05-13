import { useEffect } from 'react';
import { requestLayer } from 'Entities/layers';
import CheckerWithMemory from '../../../tools/checkerWithMemory';
import store from 'Services/store';

const markersHaveChanges = CheckerWithMemory(markers => markers.map(m => `${m.lng}-${m.lat}`).join('&'));
const shapeHaveChanges = CheckerWithMemory(shape => undefined);

export default function useIsochroneAPI() {
  useEffect(() => {
    return store.subscribe(({ shape, markers }) => {
      if (
        !markersHaveChanges(markers)
        && !shapeHaveChanges(shape)
      ) return;
      
      if (markers && markers.length > 0) {
        requestLayer({
          markers,
          shape,
        });
      }

    });

  }, []);
}