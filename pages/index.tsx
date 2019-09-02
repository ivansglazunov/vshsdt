import React, { useContext } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import { initApollo } from '../imports/apollo';
import { useGql } from '../imports/use-gql';
import { GET_NODES } from '../imports/sandbox';
import ApolloClient from 'apollo-client';
import { client } from '../knexfile';
import { wrapPage } from '../imports/wrap-page';
import { Provider, Context } from '../imports/packages/analitics/index';

export const Body = () => {
  const query = useGql(GET_NODES);
  const { trigger } = useContext(Context);
  console.log(trigger);
  return <pre>{JSON.stringify(query, null, 2)}</pre>;
};

const Content = () => {
  return <Provider
    googleAnalitics={'UA-64254068-3'}
    yandexMetrika={53888251}
  >
    <Body/>
  </Provider>;
};

export default wrapPage(Content);