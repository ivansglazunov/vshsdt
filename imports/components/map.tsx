import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Theme, useMediaQuery, Typography } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

export const MyMap = ({}) => {
  const classes = useStyle({});

  return <YMaps>
    <Map defaultState={{ center: [55.809856, 37.638899], zoom: 15 }} width="100%" height="100%">
      <Placemark geometry={[55.811897, 37.63642]} />
    </Map>
  </YMaps>;
};
