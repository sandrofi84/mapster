import type { NextPage } from 'next';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
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
import mapboxgl, { Evented, MapboxEvent, MapEventType } from 'mapbox-gl';
import Pin from '../public/pin.svg';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Markers: NextPage = () => {
  const classes = useStyles();
  const { map, mapContainer, isMapInitialized } = useMap();
  const markers = useRef([]);

  const getUsersWithinBoundingBox = useCallback(async (boundingBox) => {
    let users;
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boundingBox }),
      };
      users = await fetch(
        `${process.env.API_URL}/get_users_by_coord`,
        options
      ).then((response) => response.json());
      return users;
    } catch (e) {
      console.log(e);
    }
    return users;
  }, []);

  const createMarkerForUser = useCallback(
    (user) => {
      const {
        location: { coordinates },
      } = user;
      const myPin = document.createElement('img');
      myPin.src = Pin.src;
      myPin.style.width = '25px';
      myPin.style.height = '25px';
      const myMarker = new mapboxgl.Marker({ element: myPin })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h3>${user.name}</h3><p>Age: ${user.age}</p>`)
        )
        .addTo(map);
      return myMarker;
    },
    [map]
  );

  const makeMarkers = useCallback(
    (users) => {
      return users.map(createMarkerForUser);
    },
    [createMarkerForUser]
  );

  const removeCurrentMarkers = useCallback((markers) => {
    if (markers.length > 0) {
      markers.forEach((marker) => marker.remove());
      markers = [];
    }
  }, []);

  useEffect(() => {
    const handleMapRendered = async (e: MapboxEvent) => {
      console.log('Render Happened');
      const map = e.target;
      const boundingBox = map.getBounds().toArray();
      const users = await getUsersWithinBoundingBox(boundingBox);
      removeCurrentMarkers(markers.current);
      const newMarkers = makeMarkers(users);
      markers.current = newMarkers;
    };

    const debounce = (
      fn: (...args: unknown[] | []) => Promise<void>,
      delay = 500
    ) => {
      let timer: NodeJS.Timeout;
      return (...args: unknown[] | []) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    };

    const debouncedHandleMapRendered = debounce(handleMapRendered, 1000);

    if (isMapInitialized && map) {
      map.on('render', debouncedHandleMapRendered);
    }

    return () => {
      if (map) {
        map.off('render', debouncedHandleMapRendered);
      }
    };
  }, [isMapInitialized]);

  return (
    <>
      <Typography variant="h1">Welcome to Markers!</Typography>
      <MapContainer ref={mapContainer} />
    </>
  );
};

export default Markers;
