import * as config from '../config';

import gql from 'graphql-tag';
import { useGql } from '../lib/use-gql';

const GET_NODES = `
  nodes {
    id
    props_sessions {
      token
    }
  }
`;

export const Index = () => {
  const query = useGql(GET_NODES);
  return <div>{JSON.stringify(query, null, 2)}</div>
};

export default Index;
