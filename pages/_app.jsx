import App, { Container } from 'next/app';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { ApolloProvider } from 'react-apollo-hooks';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import withApollo from '../lib/withApollo';

const theme = createMuiTheme();

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
            }}>
            <ApolloProvider client={apollo}>
              <CssBaseline />
              <Component {...pageProps} />
            </ApolloProvider>
          </div>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
