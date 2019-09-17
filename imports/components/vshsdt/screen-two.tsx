import {useTheme, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
}));

export const ScreenTwo = ({
  ...props
}) => {
  const classes = useStyles({});
  const theme = useTheme();
//   const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return <>
    <div className={classes.root} {...props}></div>
  </>;
};
