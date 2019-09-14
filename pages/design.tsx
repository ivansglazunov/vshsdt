import '../imports/i18n';

import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import Router from 'next/router';

import { Body } from '../imports/components/body';
import HeaderFacults from '../imports/components/vshsdt/header-facults';
import { theme as defaultTheme } from '../imports/theme';
import { wrapPage } from '../imports/wrap-page';

export default () => {
  return <>
    <ThemeProvider theme={defaultTheme}>
      <Body>
        <HeaderFacults
          screen={'design'}
        />
      </Body>
    </ThemeProvider>
  </>;
};
