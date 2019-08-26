import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Theme, useMediaQuery, Typography } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

export const Container = ({ children, style = {} }) => {
  const classes = useStyle({});

  return <div className={classes.root} style={style}>
    {children}
  </div>;
};
