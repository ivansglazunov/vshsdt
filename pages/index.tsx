import { useGql, gql } from '../lib/use-gql';

const GET_NODES = gql`
nodes {
  id
  props {
    nodeId
    id
    passport_passwords {
      id
      propId
    }
    sessions {
      id
      propId
    }
    types {
      id
      propId
    }
  }
  links_by_source {
    id
    sourceId
    targetId
  }
  links_by_target {
    id
    sourceId
    targetId
  }
}
`;

export default () => {
  const query = useGql(GET_NODES);
  return <pre>{JSON.stringify(query, null, 2)}</pre>;
};
