import withApollo from 'next-with-apollo';
import fetch from 'node-fetch';
import { InMemoryCache, HttpLink } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink, concat } from 'apollo-link';
import * as Debug from 'debug';

const debug = Debug('apollo');

const GRAPHQL = 'isg-hasura-lerny.herokuapp.com/v1/graphql';

export function initApollo(initialState = {}, token) {
  debug('initApollo', token);

  const headers = token ? {
    'Authorization': `Bearer ${token}`,
  } : {
    'X-Hasura-Admin-Secret': 7777,
  };
  const httpLink = new HttpLink({
    uri: `http://${GRAPHQL}`,
    fetch
  });

  const wsLink = !process.browser
    ? null
    : new WebSocketLink({
      uri: `ws://${GRAPHQL}`,
      options: {
        reconnect: true,
        connectionParams: () => ({
          headers,
        }),
      },
    });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers,
    });

    return forward(operation);
  });

  const link = !process.browser
    ? httpLink
    : split(
        ({ query }) => {
          // TODO wtf is the gql kind operation?
          // const { kind, operation } = getMainDefinition(query);
          // return kind === 'OperationDefinition' && operation === 'subscription';
          return true;
        },
        wsLink,
        httpLink,
      );

  return new ApolloClient({
    ssrMode: true,
    link: concat(authMiddleware, link),
    cache: new InMemoryCache().restore(initialState),
  });
}