import { Grid, Hidden, Theme, Typography, useMediaQuery, Paper } from '@material-ui/core';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/styles';
import React from 'react';

import { goldTheme, theme, darkBackgroundColor } from '../theme';
import { Container } from './container';
import { Spacing } from './spacing';
import classnames from 'classnames';
import Flip from 'react-reveal/Flip';

const useStyle = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
  },
}));

export const Partners = ({ className = [], ...props }) => {
  const classes = useStyle({});

  return <Grid container justify="space-around" alignItems="center">
    <Grid item xs={6} sm={3} style={{ padding: '2%' }}>
      <Flip top delay={100}>
        <img src={require('../../images/logo-mhpi.png?resize&size=200')} className={classes.image}/>
      </Flip>
    </Grid>
    <Grid item xs={6} sm={3} style={{ padding: '2%' }}>
      <Flip top delay={100}>
        <img src={require('../../images/logo-moscow.png?resize&size=200')} className={classes.image}/>
      </Flip>
    </Grid>
    <Grid item xs={6} sm={3} style={{ padding: '2%' }}>
      <Flip top delay={100}>
        <img src={require('../../images/logo-white.png?resize&size=200')} className={classes.image}/>
      </Flip>
    </Grid>
    <Grid item xs={6} sm={3} style={{ padding: '2%' }}>
      <Flip top delay={100}>
        <img src={require('../../images/logo-garderob.png?resize&size=200')} className={classes.image}/>
      </Flip>
    </Grid>
  </Grid>;
};
