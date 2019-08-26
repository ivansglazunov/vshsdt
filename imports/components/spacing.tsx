import { Theme } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import React from 'react';

const useStyle = makeStyles((theme: Theme) => ({
}));

export const Spacing = ({ size = 1 }) => {
  const classes = useStyle({});
  const theme: Theme = useTheme();

  return <div style={{ height: theme.spacing(size) }}/>;
};
