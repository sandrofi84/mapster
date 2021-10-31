import React from 'react';
import Link from 'next/link';
import { Button, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      position: 'absolute',
      top: '40px',
      left: '20px',
    },
  })
);

const BackToHomeBtn = () => {
  const classes = useStyles();

  return (
    <Button variant="outlined" className={classes.btn}>
      <Link href="/">
        <a>Back</a>
      </Link>
    </Button>
  );
};

export default BackToHomeBtn;
