import { Theme } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import React from 'react';
import classnames from 'classnames';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    textDecoration: 'underline',
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
}));

export const OuterLink = (props) => {
  const classes = useStyle({});

  return <a className={classnames(classes.root, props.className)} {...props}/>;
};
