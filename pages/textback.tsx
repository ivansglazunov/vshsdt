import React, { useContext } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import { initApollo } from '../imports/apollo';
import { useGql } from '../imports/use-gql';
import { GET_NODES } from '../imports/sandbox';
import ApolloClient from 'apollo-client';
import { client } from '../knexfile';
import { wrapPage } from '../imports/wrap-page';

import { TextBackComponent } from '../imports/packages/leads/textback.client';
import textbackConfig from '../imports/textback.config';

export const Content = () => {
  return <div>
    <div style={{ width: 150 }}>
      <TextBackComponent {...textbackConfig}/>
    </div>
  </div>;
};

export default wrapPage(Content);