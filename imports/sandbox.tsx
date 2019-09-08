import { gql } from './use-gql';

export const GET_NODES = gql`{
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
    links_index_of {
      id
      linkId
      nodeId
      listId
      ofNodeId
      depth
    }
    links_index {
      id
      linkId
      nodeId
      listId
      ofNodeId
      depth
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
}`;