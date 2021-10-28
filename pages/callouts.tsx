import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Map from '../components/Map';

const Callouts: NextPage = () => {
  return (
    <>
      <Typography variant="h1">Welcome to Callouts!</Typography>
      <Map />
    </>
  );
};

export default Callouts;
