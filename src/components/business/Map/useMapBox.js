import { useState, useEffect, useRef } from 'react';
import MapWrapper from './MapWrapper';

export default function useMapBox(options, mountPoint) {
  const [loadedAndReadyMap, setLoadedAndReadyMap] = useState(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mountPoint) return;
    options.container = mountPoint;
    mapInstance.current = new MapWrapper(options);
    mapInstance.current.map.on('load', () => setLoadedAndReadyMap(mapInstance.current));
    return () => mapInstance.current.destroy();
  }, [mountPoint]);

  return loadedAndReadyMap;
}