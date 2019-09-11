import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import _ from 'lodash';

export const fontFamily = 'Helvetica, sans-serif';
export const darkBackgroundColor = '#171717';
export const goldColor = 'rgb(209, 181, 108)';

export const theme = createMuiTheme({
  typography: {
    fontFamily,
    h1: {
      fontFamily,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily,
      fontWeight: 'bold',
    },
    h5: {
      fontFamily,
      fontWeight: 'bold',
    },
    h6: {
      fontFamily,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontFamily,
    },
    subtitle2: {
      fontFamily,
    },
    body1: {
      fontFamily,
    },
    body2: {
      fontFamily,
    },
    button: {
      fontFamily,
    },
    caption: {
      fontFamily,
    },
    overline: {
      fontFamily,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 0,
      },
    },
    MuiTab: {
      root: {
        minWidth: 0,
      },
    },
    MuiList: {
      root: {
        fontFamily,
      },
    },
  },
});

export const lightTheme = theme => createMuiTheme(_.merge({}, theme, { palette: { type: 'light' } }));

export const darkTheme = theme => createMuiTheme(_.merge(
  {},
  theme,
  {
    palette: {
      type: 'dark',
      background: {
        paper: darkBackgroundColor,
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          color: '#fff',
        },
      },
      MuiList: {
        root: {
          fontFamily,
          color: '#fff',
        },
      },
    },
  },
));

export const goldTheme = theme => createMuiTheme(_.merge(
  {},
  theme,
  {
    palette: {
      type: 'dark',
      common: {
        white: goldColor,
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          fontFamily,
          color: goldColor,
        },
      },
    },
  },
));
