import { Grid, Hidden, Theme, Typography, useMediaQuery, Paper } from '@material-ui/core';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/styles';
import React from 'react';

import { goldTheme, theme, darkBackgroundColor } from '../theme';
import { Container } from './container';
import { Spacing } from './spacing';
import classnames from 'classnames';

const useStyle = makeStyles((theme: Theme) => ({
  line: {
    height: 5,
    background: `${darkBackgroundColor}`,
    position: 'relative',
    textAlign: 'center',
  },
  title: {
    display: 'inline-block',
    position: 'relative',
    zIndex: 2,
    marginTop: '-12%',
  },
}));

export const Line = ({ children = null, className = [], ...props }) => {
  const classes = useStyle({});
  return <div className={classnames(className, classes.line)} {...props}>{children}</div>;
};

export const Title = ({ children = null, className = [], style = {}, ...props }) => {
  const classes = useStyle({});
  const theme = useTheme<Theme>();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  
  return <div className={classnames(className, classes.title)}>
    <Paper square elevation={12} style={{
      padding: 34,
      ...style,
    }} {...props}>
      <Typography variant={isSmUp ? 'h4' : 'h5'}>{children}</Typography>
    </Paper>
  </div>;
};
