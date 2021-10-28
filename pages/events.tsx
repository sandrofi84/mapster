import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Map from '../components/Map';

const Events: NextPage = () => {
  return (
    <>
      <Typography variant="h1">Welcome to Events!</Typography>
      <Map />
    </>
  );
};

export default Events;
