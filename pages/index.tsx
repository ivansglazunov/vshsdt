import * as config from '../config';

import { useGql, gql } from '../lib/use-gql';

const GET_NODES = gql`
  nodes {
    id
    props {
      passport_passwords {
        username
      }
      sessions {
        token
      }
    }
  }
`;

export const Index = () => {
  const query = useGql(GET_NODES);
  return <pre>{JSON.stringify(query, null, 2)}</pre>
};

export default Index;
