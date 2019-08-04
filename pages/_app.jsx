import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo-hooks';

import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import withApollo, { initApollo } from '../lib/with-apollo';
import { getDataFromTree } from 'react-apollo';

const theme = createMuiTheme();

function CreateComponent(Component, pageProps, apolloClient) {
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
          <ApolloProvider client={apolloClient}>
            <CssBaseline />
            <Component {...pageProps} />
          </ApolloProvider>
        </div>
      </ThemeProvider>
    </Container>
  );
}

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  static async getInitialProps({ Component }) {
    const apolloClient = initApollo();
    try {
      await getDataFromTree(CreateComponent(Component, {}, apolloClient));
    } catch (error) {
      await error;
    }
    Head.rewind();
    const apolloState = apolloClient.extract();
    return {
      apolloState,
    };
  }
  constructor(props) {
    super(props);
    if (typeof window === 'object') {
      console.log('_app', window.__APOLLO_STATE__);
      this.apolloClient = initApollo(window.__APOLLO_STATE__);
    } else {
      global.__APOLLO_STATE__ = props.apolloState;
      props.apolloState;
      this.apolloClient = initApollo(props.apolloState);
    }
  }
  render() {
    const { Component, pageProps } = this.props;

    return CreateComponent(Component, pageProps, this.apolloClient);
  }
}
