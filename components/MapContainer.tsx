import React, { forwardRef } from 'react';

const MapContainer = forwardRef<HTMLDivElement>((props, ref) => {
  return <div ref={ref} style={{ width: '100vw', height: '500px' }}></div>;
});

MapContainer.displayName = 'MapContainer';

export default MapContainer;
