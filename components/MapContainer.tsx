import React, { forwardRef } from 'react';

const MapContainer = forwardRef((props, ref) => {
  return <div ref={ref} style={{ width: '100vw', height: '500px' }}></div>;
});

export default MapContainer;
