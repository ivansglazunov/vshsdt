import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Theme, useMediaQuery, Typography } from '@material-ui/core';
import Vivus from 'vivus';

let _i = 0;

const defaultCallback = () => {};

export const Draw = ({ style = {}, callback = defaultCallback, ...props }) => {
  const [i] = useState(_i++);

  useEffect(() => {
    new Vivus(`vivus-${i}`, props, callback);
  }, []);

  return <div
    id={`vivus-${i}`}
    style={style}
  />;
};
