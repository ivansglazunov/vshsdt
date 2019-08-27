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
    links_lists {
      id
      linkId
      nodeId
      items {
        id
        linkId
        nodeId
        listId
      }
    }
    links_lists_items {
      id
      linkId
      nodeId
      listId
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