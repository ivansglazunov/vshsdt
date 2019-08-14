import withApollo from 'next-with-apollo';
import { InMemoryCache, HttpLink } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink, concat } from 'apollo-link';

const HASURA_ADMIN_SECRET = '7777';
const GRAPHQL = 'isg-hasura-lerny.herokuapp.com/v1/graphql';

export function initApollo(initialState = {}) {
  const httpLink = new HttpLink({
    uri: `http://${GRAPHQL}`,
  });

  const wsLink = !process.browser
    ? null
    : new WebSocketLink({
      uri: `ws://${GRAPHQL}`,
      options: {
        reconnect: true,
        ...(HASURA_ADMIN_SECRET
          ? {
            connectionParams: () => ({
              headers: {
                'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
              },
            }),
          } : {}),
      },
    });

  const authMiddleware = new ApolloLink((operation, forward) => {
    if (HASURA_ADMIN_SECRET) {
      operation.setContext({
        headers: {
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
      });
    }

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

export default withApollo(
  ({ initialState }) => {
    if (typeof window === 'object') {
      // @ts-ignore
      return initApollo(window.__APOLLO_STATE__);
    }
    return initApollo(initialState);
  },
  {
    getDataFromTree: 'ssr',
  },
);
