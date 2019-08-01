import * as config from '../config';

import gql from 'graphql-tag';
import { useGql } from '../lib/use-gql';

const GET_NODES = `
  nodes {
    id
  }
`;

export const Index = () => {
  // const query = useGql(GET_NODES);
  return <div>{JSON.stringify(config)}</div>
};

export default Index;
