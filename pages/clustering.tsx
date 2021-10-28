import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Map from '../components/Map';

const Clustering: NextPage = () => {
  return (
    <>
      <Typography variant="h1">Welcome to Clustering!</Typography>
      <Map />
    </>
  );
};

export default Clustering;
