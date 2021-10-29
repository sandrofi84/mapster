import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;

const useMap = () => {
  const mapContainer = useRef<string | HTMLElement>('');
  const map = useRef<null | mapboxgl.Map>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    setIsMapInitialized(true);
  }, []);

  return { map: map.current, mapContainer, isMapInitialized };
};

export default useMap;
