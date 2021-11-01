import type { NextPage } from 'next';
import { useEffect, useCallback } from 'react';
import useMap from '../hooks/useMap';
import { Typography, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import MapContainer from '../components/MapContainer';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Clustering: NextPage = () => {
  const classes = useStyles();
  const { map, mapContainer, isMapInitialized } = useMap();

  const getDatasource = useCallback(async () => {
    let datasource;
    try {
      datasource = await fetch(
        `${process.env.API_URL}/get_map_datasource`
      ).then((response) => response.json());
      return datasource;
    } catch (e) {
      console.log(e);
    }
    return datasource;
  }, []);

  useEffect(() => {
    const handleMapLoad = async (e) => {
      const map = e.target;
      const datasource = await getDatasource();
      console.log(datasource);
      map.addSource('users', {
        type: 'geojson',
        data: datasource,
        cluster: true,
        //clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterMinPoints: 1,
        clusterRadius: 40, // Radius of each cluster when clustering points (defaults to 50)
      });
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'users',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750

          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#F77A52',
            100,
            '#f7b052',
            750,
            '#f7d952',
          ],
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2,
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            13,
            100,
            16,
            750,
            22,
          ],
        },
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'users',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#ffffff',
        },
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'users',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#F77A52',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });

      // inspect a cluster on click
      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        const clusterId = features[0].properties.cluster_id;
        map
          .getSource('users')
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });
    };

    if (isMapInitialized && map) {
      map.on('load', handleMapLoad);
    }

    return () => {
      if (map) {
        map.on('load', handleMapLoad);
      }
    };
  }, [isMapInitialized]);

  return (
    <>
      <Typography variant="h1">Welcome to Clustering!</Typography>
      <MapContainer ref={mapContainer} />
    </>
  );
};

export default Clustering;
