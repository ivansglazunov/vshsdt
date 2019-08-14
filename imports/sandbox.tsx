import { gql } from './use-gql';

export const GET_NODES = gql`
  nodes {
    id
    passport_passwords {
      id
      ofId
      username
      password
    }
    sessions {
      id
      ofId
      token
    }
    types {
      id
      ofId
    }
    links_by_source {
      id
      sourceId
      targetId
      lists {
        id
        linkId
        items {
          id
          linkId
          nodeId
        }
      }
      items {
        id
        linkId
        nodeId
      }
    }
    links_by_target {
      id
      sourceId
      targetId
      lists {
        id
        linkId
        items {
          id
          linkId
          nodeId
        }
      }
      items {
        id
        linkId
        nodeId
      }
    }
  }
`;