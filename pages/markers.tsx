import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Map from '../components/Map';

const Markers: NextPage = () => {
  return (
    <>
      <Typography variant="h1">Welcome to Markers!</Typography>
      <Map />
    </>
  );
};

export default Markers;
