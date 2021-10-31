import type { NextPage } from 'next';
import { useEffect, useState, useRef, useMemo } from 'react';
import useMap from '../hooks/useMap';
import {
  Typography,
  Paper,
  Theme,
  Grid,
  Alert,
  AlertTitle,
  AlertColor,
  Badge,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import MapContainer from '../components/MapContainer';
import mapboxgl from 'mapbox-gl';
import MarkerControl from '../controls/markerControl';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Controls: NextPage = () => {
  const classes = useStyles();
  const { map, mapContainer, isMapInitialized } = useMap();

  useEffect(() => {
    const fullScreenControl = new mapboxgl.FullscreenControl();
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    const markerControl = new MarkerControl();

    if (isMapInitialized && map) {
      map.addControl(fullScreenControl);
      map.addControl(geolocateControl);
      map.addControl(markerControl);
      geolocateControl.on('geolocate', (e) => {
        console.log('geolocate', e);
      });
      geolocateControl.on('outofmaxbounds', (e) => {
        console.log('outofmaxbounds', e);
      });
      geolocateControl.on('trackuserlocationstart', (e) => {
        console.log('trackuserlocationstart', e);
      });
      geolocateControl.on('trackuserlocationend', (e) => {
        console.log('trackuserlocationend', e);
      });
    }

    return () => {
      if (map) {
        map.removeControl(fullScreenControl);
        map.removeControl(geolocateControl);
        map.removeControl(markerControl);
      }
    };
  }, [isMapInitialized]);

  return (
    <>
      <Typography variant="h1">Welcome to Controls!</Typography>
      <MapContainer ref={mapContainer} />
    </>
  );
};

export default Controls;
