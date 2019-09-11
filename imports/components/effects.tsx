import { Theme } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import React from 'react';
import Slide from 'react-reveal/Slide';

const useStyle = makeStyles((theme: Theme) => ({
}));

export const InsideSlide = ({ divProps = {}, revealProps = {}, children }) => {
  const classes = useStyle({});
  const theme: Theme = useTheme();

  return <div style={{ width: '100%', height: '100%', overflow: 'hidden' }} {...divProps}>
    <Slide {...revealProps}>
      {children}
    </Slide>
  </div>;
};
