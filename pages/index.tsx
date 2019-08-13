import { useGql } from '../lib/use-gql';
import { GET_NODES } from '../lib/sandbox';

export default () => {
  const query = useGql(GET_NODES);
  return <pre>{JSON.stringify(query, null, 2)}</pre>;
};
