import * as passport from 'passport';
import { initApollo } from '../imports/apollo';
import ApolloClient from 'apollo-client';
import { Strategy as LocalStrategy } from 'passport-local';
import gql from 'graphql-tag';
import * as _ from 'lodash';
import * as uniqid from 'uniqid';
import * as Debug from 'debug';

const debug = Debug('passports:logout');

export const logoutMiddleware = async (req, res, next) => {
  debug('logoutMiddleware', {});
  req.logout();
  return res.status(200).json({});
};

export default async (app) => {
  const apolloClient = initApollo({}, '_passport');
  debug('init');
  app.get('/_passports/logout', logoutMiddleware);
};
