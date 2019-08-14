import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';

import React from 'react';
import Cookie from 'js-cookie';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { initApollo } from '../imports/apollo';
import { getDataFromTree } from '@apollo/react-ssr';

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
  static async getInitialProps({ Component, ctx: { req: { cookies } } }) {
    const token = process.browser ? Cookie.get('token') : cookies ? cookies.token : undefined;
    const apolloClient = initApollo({}, token);
    try {
      await getDataFromTree(CreateComponent(Component, {}, apolloClient));
    } catch (error) {
      console.log({ error: await error });
    }
    Head.rewind();
    const apolloState = apolloClient.extract();
    return {
      token,
      apolloState,
    };
  }
  constructor(props) {
    super(props);
    if (typeof window === 'object') {
      this.apolloClient = initApollo(window.__APOLLO_STATE__, props.token);
    } else {
      global.__APOLLO_STATE__ = props.apolloState;
      props.apolloState;
      this.apolloClient = initApollo(props.apolloState, props.token);
    }
  }
  render() {
    const { Component, pageProps } = this.props;

    return CreateComponent(Component, pageProps, this.apolloClient);
  }
}
