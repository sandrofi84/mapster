import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;

const Map = () => {
  const mapContainer = useRef<string | HTMLElement>('');
  const map = useRef<null | mapboxgl.Map>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  return (
    <div ref={mapContainer} style={{ width: '100vw', height: '500px' }}></div>
  );
};

export default Map;
