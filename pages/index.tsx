import '../imports/i18n';

import { useTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

import { Body } from '../imports/components/body';
import { darkTheme, theme as defaultTheme } from '../imports/theme';

export const start = new Date(2019, 8, 11, 18, 30);
export const end = new Date(2019, 8, 11, 19);

export default () => {
  const theme = useTheme();

  return <>
    <ThemeProvider theme={defaultTheme}>
      <Body>
        <ThemeProvider theme={darkTheme}>
          Coming soon
        </ThemeProvider>
      </Body>
    </ThemeProvider>
  </>;
};
