import { gql } from './use-gql';

export const GET_NODES = gql`{
  nodes {
    id
    types {
      id
      ofId
    }
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
    accesses {
      id
      ofId
      accessTypeId
      access_type {
        name
      }
      tableName
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
      nodeId
    }
    links_by_target {
      id
      sourceId
      targetId
      nodeId
    }
  }
}`;