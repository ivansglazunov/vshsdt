import * as React from 'react';
import { useGql } from '../imports/use-gql';
import { GET_NODES } from '../imports/sandbox';

export default () => {
  const query = useGql(GET_NODES);
  return <pre>{JSON.stringify(query, null, 2)}</pre>;
};
