import { initApollo } from '../apollo';
import gql from 'graphql-tag';
import { assert } from 'chai';
import _ from 'lodash';
import ApolloClient from 'apollo-client';

export const M_PREPARE = gql`
  mutation {
    insert_links_types(objects: { name: "__test" }) {
      returning {
        id
      }
    }
  }
`;

export const M_PREPARE_CLEAR = gql`
  mutation {
    delete_links_types(where: { name: { _eq: "__test" } }) {
      returning {
        id
      }
    }
  }
`;

export const M_CLEAR_LINKS_INDEX = gql`
  mutation {
    delete_links_index(where: {}) {
      returning {
        id
      }
    }
  }
`;

export const M_CLEAR_LINKS = gql`
  mutation {
    delete_links(where: {}) {
      returning {
        id
      }
    }
  }
`;

export const M_CLEAR_NODES = gql`
  mutation {
    delete_nodes(where: {}) {
      returning {
        id
      }
    }
  }
`;

export const M_INSERT_NODES = (count) => gql`
  mutation {
    insert_nodes(objects: ${JSON.stringify(_.times(count, () => ({})))}) {
      returning {
        id
      }
    }
  }
`;

export const M_INSERT_LINK = (sourceId, targetId) => gql`
  mutation($typeId: Int) {
    insert_links(objects: {sourceId: ${sourceId}, targetId: ${targetId}, typeId: $typeId}) {
      returning {
        id
      }
    }
  }
`;

export const M_INSERT_LINK_INDEX = (object) => gql`
  mutation($typeId: Int) {
    insert_links_index(objects: ${JSON.stringify(object)}) {
      returning {
        id
      }
    }
  }
`;

export const GET_ALL = gql`
  {
    nodes {
      id
      links_index {
        id
        inserted
        depth
        deleted
        linkId
        nodeId
      }
    }
    links {
      id
      sourceId
      targetId
    }
    links_index {
      id
      inserted
      depth
      deleted
      linkId
      nodeId
    }
  }
`;

export class API {
  apolloClient?: ApolloClient<any>;
  constructor(apolloClient?) {
    this.apolloClient = apolloClient || initApollo({}, { secret: process.env.HASURA_ADMIN_SECRET });
  }

  prepareLinksTypeId = async (): Promise<number> => {
    const result = await this.apolloClient.mutate({
      mutation: M_PREPARE,
    });
    return result.data.insert_links_types.returning[0].id;
  }
  
  clearLinksTypeId = async (): Promise<void> => {
    await this.apolloClient.mutate({
      mutation: M_PREPARE_CLEAR,
    });
  }

  clearLinksIndex = async (): Promise<void> => {
    await this.apolloClient.mutate({
      mutation: M_CLEAR_LINKS_INDEX,
    });
  }
  
  clearLinks = async (): Promise<void> => {
    await this.apolloClient.mutate({
      mutation: M_CLEAR_LINKS,
    });
  }

  clearNodes = async (): Promise<void> => {
    await this.apolloClient.mutate({
      mutation: M_CLEAR_NODES,
    });
  }

  insertNodes = async (count): Promise<number[]> => {
    const { data: {
      insert_nodes: { returning },
    } } = await this.apolloClient.mutate({
      mutation: M_INSERT_NODES(count),
    });
    return _.map(returning, node => node.id);
  }

  insertLinks = async (sourceId, targetId, typeId): Promise<number> => {
    const { data: {
      insert_links: { returning: [{ id }] },
    } } = await this.apolloClient.mutate({
      mutation: M_INSERT_LINK(sourceId, targetId),
      variables: {
        typeId,
      },
    });
    return id;
  }

  insertIndex = async (object): Promise<number> => {
    const { data: {
      insert_links_index: { returning: [{ id }] },
    } } = await this.apolloClient.mutate({
      mutation: M_INSERT_LINK_INDEX(object),
    });
    return id;
  }

  getAll = async (): Promise<any> => {
    return (await this.apolloClient.query({
      query: GET_ALL,
      fetchPolicy: 'no-cache',
    })).data;
  }
}
