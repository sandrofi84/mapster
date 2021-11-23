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
import { MapboxEvent, EventData } from 'mapbox-gl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      zIndex: 1000,
      position: 'fixed',
      bottom: '0',
      padding: '5px',
      width: '100%',
    },
    grid: {
      width: '100%',
      height: '100%',
    },
    alert: {
      margin: '5px',
      opacity: 0.3,
    },
    alertOpaque: {
      margin: '5px',
      opacity: 1,
    },
  })
);

interface CardState {
  counter: number;
  isOpaque: boolean;
}
interface CardsData {
  load: CardState;
  move: CardState;
  zoom: CardState;
  drag: CardState;
  idle: CardState;
  error: CardState;
}

type CardType = keyof CardsData;

interface EventCard {
  type: CardType;
  message: string;
  severity: AlertColor;
}

const Events: NextPage = () => {
  const classes = useStyles();
  const grid = useRef<HTMLDivElement | null>(null);
  const { map, mapContainer, isMapInitialized } = useMap();
  const [cardsData, setCardsData] = useState<CardsData>({
    load: { counter: 0, isOpaque: false },
    move: { counter: 0, isOpaque: false },
    zoom: { counter: 0, isOpaque: false },
    drag: { counter: 0, isOpaque: false },
    idle: { counter: 0, isOpaque: false },
    error: { counter: 0, isOpaque: false },
  });

  const eventCards: EventCard[] = useMemo(
    () => [
      {
        type: 'load',
        message: 'This is a Load event',
        severity: 'success',
      },
      {
        type: 'move',
        message: 'This is a Move event',
        severity: 'warning',
      },
      {
        type: 'zoom',
        message: 'This is a Zoom event',
        severity: 'warning',
      },
      {
        type: 'drag',
        message: 'This is a Drag event',
        severity: 'warning',
      },
      {
        type: 'idle',
        message: 'This is an Idle event',
        severity: 'info',
      },
      {
        type: 'error',
        message: 'This is an Error event',
        severity: 'error',
      },
    ],
    []
  );

  useEffect(() => {
    const logEvent =
      (type: CardType) => (e: MapboxEvent<undefined> & EventData) => {
        console.log(e);
        setCardsData((prev): CardsData => {
          for (let cardType in prev) {
            if ((prev[cardType as CardType] as CardState).isOpaque)
              (prev[cardType as CardType] as CardState).isOpaque = false;
          }
          prev[type].counter++;
          prev[type].isOpaque = true;

          return {
            ...prev,
          };
        });
      };

    const handleLoad = logEvent('load');
    const handleIdle = logEvent('idle');
    const handleError = logEvent('error');
    const handleZoom = logEvent('zoom');
    const handleMove = logEvent('move');
    const handleDrag = logEvent('drag');

    if (isMapInitialized && map) {
      map.on('load', handleLoad);
      map.on('idle', handleIdle);
      map.on('error', handleError);
      map.on('zoom', handleZoom);
      map.on('move', handleMove);
      map.on('drag', handleDrag);
    }

    return () => {
      if (map) {
        map.off('load', handleLoad);
        map.off('idle', handleIdle);
        map.off('error', handleError);
        map.off('zoom', handleZoom);
        map.off('move', handleMove);
        map.off('drag', handleDrag);
      }
    };
  }, [isMapInitialized]);

  return (
    <>
      <Typography variant="h1">Welcome to Events!</Typography>
      <Paper className={classes.paper} elevation={8}>
        <Grid ref={grid} container flexDirection="row" className={classes.grid}>
          {eventCards.map(({ type, message, severity }: EventCard, i) => (
            <Grid key={i} item xs={2}>
              <Badge
                badgeContent={cardsData[type].counter}
                color="error"
                max={999}
              >
                <Alert
                  severity={severity}
                  className={
                    cardsData[type].isOpaque
                      ? classes.alertOpaque
                      : classes.alert
                  }
                >
                  <AlertTitle>{type.toUpperCase()}</AlertTitle>
                  {message}
                </Alert>
              </Badge>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <MapContainer ref={mapContainer} />
    </>
  );
};

export default Events;
