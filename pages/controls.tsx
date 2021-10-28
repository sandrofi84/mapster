import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Map from '../components/Map';

const Controls: NextPage = () => {
  return (
    <>
      <Typography variant="h1">Welcome to Controls!</Typography>
      <Map />
    </>
  );
};

export default Controls;
