import passport from 'passport';
import ApolloClient from 'apollo-client';
import { Strategy as LocalStrategy } from 'passport-local';
import gql from 'graphql-tag';
import _ from 'lodash';
import uniqid from 'uniqid';
import Debug from 'debug';
import { isEqualHashAndPassword, createHashFromPassword, provideSelfAccess } from './api.server';

export const CREATE_USER_NODE_WITH_PASSWORD = gql`
  mutation CreateUserNodeWithPassword($username: String, $password: String, $token: String) {
    insert_nodes(objects: {passport_passwords: {data: {password: $password, username: $username}}, sessions: {data: {token: $token}}}) {
      returning {
        id
        sessions(where: {token: {_eq: $token}}) {
          token
        }
      }
    }
  }
`;

export const CREATE_GUEST_NODE = gql`
  mutation CreateGuestNode($token: String) {
    insert_nodes(objects: {sessions: {data: {token: $token}}}) {
      returning {
        id
        sessions(where: {token: {_eq: $token}}) {
          token
        }
      }
    }
  }
`;

export const provideSelfAccessTables = {
  'props_types': [1,2,3,4],
  'nodes': [1,2,3,4],
  'links': [1,3,4],
  'links_index': [4],
  'access_types': [1,2,3,4],
  'nodes_props_access': [1,2,3,4],
  'nodes_props_passport_password': [1,2,3,4],
  'nodes_props_sessions': [1,2,3,4],
  'nodes_props_types': [1,2,3,4],
};

export const provideSelfAccesses = _.flatten(_.map(provideSelfAccessTables, (v, k) => {
  return _.map(v, (at) => ({
    tableName: k,
    accessTypeId: at,
  }));
}));

export const PROVIDE_SELF_ACCESS = gql`
  mutation ProvideSelfAccess($nodeId: String, $accesses: nodes_props_access_insert_input) {
    insert_links(objects: {
      sourceId: $nodeId,
      targetId: $nodeId,
      node: {
        data: {
          accesses: {
            data: $accesses
          }
        }
      }
    }) {
      returning {
        id
      }
    }
  }
`;

export const CREATE_PASSWORD_FOR_NODE = gql`
  mutation CreatePasswordForUser($
  username: String, $password: String, $nodeId: Int) {
    insert_nodes_props_passport_passwords(objects: {
      ofId: $nodeId, password: $password, username: $username
    }) {
      returning {
        id
      }
    }
  }
`;

export const FIND_USER_PASSWORD = gql`
  query($username: String) {
    nodes(
      where: { passport_passwords: { username: { _eq: $username } } }
    ) {
      id
      passport_passwords(where: { username: { _eq: $username } }) {
        password
      }
      sessions {
        token
      }
    }
  }
`;
