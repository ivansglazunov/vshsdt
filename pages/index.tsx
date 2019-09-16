import '../imports/i18n';

import { ThemeProvider } from '@material-ui/styles';
import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import Slide from 'react-reveal/Slide';

import { Body } from '../imports/components/body';
import HeaderFacults from '../imports/components/vshsdt/header-facults';
import { theme as defaultTheme, styleTheme } from '../imports/theme';
import { wrapPage } from '../imports/wrap-page';
import Test from '../imports/components/vshsdt/test';

export default () => {
  return <>
    <ThemeProvider theme={defaultTheme}>
      <Body>
        <HeaderFacults
          screen={''}
        />
        <ThemeProvider theme={styleTheme}>
          <Test style={{ width: 100, height: 100 }}/>
        </ThemeProvider>
      </Body>
    </ThemeProvider>
  </>;
};
