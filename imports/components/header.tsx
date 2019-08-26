import { Grid, Hidden, Theme, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import React from 'react';

import { goldTheme, theme } from '../theme';
import { Container } from './container';
import { Spacing } from './spacing';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '50vh',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    paddingTop: 64,
    paddingBottom: 64,
  },
  logo: {
    width: 300,
  },
  school: {
    float: 'right',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export const Header = ({}) => {
  const classes = useStyle({});

  const school = <ThemeProvider theme={goldTheme}>
    <div className={classes.school}>
      <img className={classes.logo} src={require('../../images/logo.png?resize&size=300')}/>
      <Typography variant="h5">Высшая Школа Стилистики<br/>Дизайна и Технологий</Typography>
      <Typography variant="body2">Российское академическое онлайн образование</Typography>
    </div>
  </ThemeProvider>;

  const content = <>
    <Typography variant="h2">День<br/>открытых<br/>дверей</Typography>
    <Spacing size={7}/>
    <Typography variant="body1">
      Мы приглашаем всех желающих,<br/>погрузится в индустрию моды,<br/>стилистики и имиджмейкинга,<br/>узнать о старте новых уникальных программ.
    </Typography>
  </>;

  return <div className={classes.root}>
    <Container>
      <Hidden implementation="css" mdUp>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12}>{school}</Grid>
          <Grid item xs={12}>{content}</Grid>
        </Grid>
      </Hidden>
      <Hidden implementation="css" smDown>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={7}>{content}</Grid>
          <Grid item xs={5}>{school}</Grid>
        </Grid>
      </Hidden>
    </Container>
  </div>;
};
