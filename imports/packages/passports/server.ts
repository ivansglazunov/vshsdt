import passport from 'passport';
import ApolloClient from 'apollo-client';
import { Strategy as LocalStrategy } from 'passport-local';
import gql from 'graphql-tag';
import _ from 'lodash';
import uniqid from 'uniqid';
import Debug from 'debug';
import { isEqualHashAndPassword, createHashFromPassword, errors } from './api.server';
import { CREATE_USER_NODE_WITH_PASSWORD, FIND_USER_PASSWORD } from './gqls';

const debug = Debug('passports:server');

export const signinMiddleware = apolloClient => (req, res, next) => {
  passport.authenticate('local', async (error, user, info) => {
    debug('signinMiddleware', { error, user });
    if (error) {
      const code = _.includes(errors, error) ? 200 : 400;
      return res.status(code).json({ error });
    }
    if (user) {
      return res.status(200).json({
        node: {
          ...user,
          password_password: undefined,
        }
      });
    }
  })(req, res, next);
};

export const signupMiddleware = (
  apolloClient: ApolloClient<any>,
  _signinMiddleware,
) => async (req, res, next) => {
  debug('signupMiddleware', { body: req.body });
  const password = await createHashFromPassword({ password: req.body.password });
  await apolloClient.mutate({
    mutation: CREATE_USER_NODE_WITH_PASSWORD,
    variables: {
      password,
      username: req.body.username,
      token: uniqid(),
    },
  });
  _signinMiddleware(req, res, next);
};

export const passportUse = (apolloClient: ApolloClient<any>) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        debug('strategy start', { username, password });
        const result = await apolloClient.query({
          query: FIND_USER_PASSWORD,
          variables: {
            username,
          },
          fetchPolicy: 'no-cache',
        });
        // TODO check errors
        if (result.errors && result.errors.length) {
          debug('strategy errors', { errors: result.errors });
          return done('!gql');
        }
        const node = _.get(result, 'data.nodes.0');
        if (!node) return done('!node');
        // TODO crypt passwords
        const isEqualPasswords = await isEqualHashAndPassword({
          hash: _.get(node, 'passport_passwords.0.password'),
          password,
        });
        if (isEqualPasswords) {
          debug('strategy done', { node });
          return done(null, node);
        }
        debug('strategy !password', { node });
        return done('!password');
      },
    ),
  );
};

export const signoutMiddleware = async (req, res, next) => {
  debug('signoutMiddleware', {});
  req.logout();
  return res.status(200).json({});
};

export default async (app, initApollo) => {
  const apolloClient = initApollo({}, { secret: process.env.HASURA_ADMIN_SECRET });
  debug('init');
  passportUse(apolloClient);
  const _signinMiddleware = signinMiddleware(apolloClient);
  app.post('/_passports/signin',_signinMiddleware);
  app.post('/_passports/signup', signupMiddleware(apolloClient, _signinMiddleware));
  app.get('/_passports/signout', signoutMiddleware);
};
