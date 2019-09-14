import Cookie from 'js-cookie';
import _ from 'lodash';
import Debug from 'debug';
import useInterval from 'use-interval';
import React, { useState, useEffect, useContext } from 'react';
import bcrypt from 'bcryptjs';
import { CREATE_USER_NODE_WITH_PASSWORD, PROVIDE_SELF_ACCESS, provideSelfAccesses } from './gqls';
import ApolloClient from 'apollo-client';
import uniqid from 'uniqid';
import { FIND_USER_PASSWORD } from './gqls';
import { ApolloLink } from 'apollo-link';

const debug = Debug('passports:api.server');

export const isEqualHashAndPassword = ({
  hash, password,
}: {
  hash: string;
  password: string;
}): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const createHashFromPassword = async ({
  password,
}: {
  password: string;
}): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const findByUsername = async ({
  username,
  apolloClient,
}: {
  username: string;
  apolloClient: ApolloClient<any>;
}) => {
  return await apolloClient.query({
    query: FIND_USER_PASSWORD,
    variables: {
      username,
    },
    fetchPolicy: 'no-cache',
  });
};

export const verifyNodeAndPassword = async (
  data: any,
  password: string,
  done: (error: any, result?: { node: any }) => any,
) => {
  // TODO check errors
  if (data.errors && data.errors.length) {
    debug(`verifyNodeAndPassword ${errors[0]}`, { errors: data.errors });
    return done(errors[0]);
  }
  const node = _.get(data, 'data.nodes.0');
  if (!node) {
    debug(`verifyNodeAndPassword ${errors[1]}`, { data });
    return done(errors[1]);
  }
  const isEqualPasswords = await isEqualHashAndPassword({
    hash: _.get(node, 'passport_passwords.0.password'),
    password,
  });
  if (isEqualPasswords) {
    debug('verifyNodeAndPassword done', { node });
    return done(null, node);
  }
  debug(`verifyNodeAndPassword ${errors[2]}`, { node });
  return done(errors[2]);
};

export const signup = async ({
  username,
  password,
  apolloClient,
}: {
  username: string;
  password: string;
  apolloClient: ApolloClient<any>;
}) => {
  const passwordHash = await createHashFromPassword({ password });
  const { data: { returning: { id: nodeId } } } = await apolloClient.mutate({
    mutation: CREATE_USER_NODE_WITH_PASSWORD,
    variables: {
      username,
      password: passwordHash,
      token: uniqid(),
    },
  });
  await provideSelfAccess({
    nodeId,
    apolloClient,
  });
};

// TODO dont work now
export const provideSelfAccess = async ({
  nodeId,
  apolloClient,
}: {
  nodeId: number;
  apolloClient: ApolloClient<any>;
}) => {
  await apolloClient.mutate({
    mutation: PROVIDE_SELF_ACCESS,
    variables: {
      nodeId,
      provideSelfAccesses,
    },
  });
};

export const errors = [
  '!gql',
  '!node',
  '!password',
];
