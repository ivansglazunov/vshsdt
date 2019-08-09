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

export default () => {
  const query = useGql(GET_NODES);
  return <pre>{JSON.stringify(query, null, 2)}</pre>;
};
