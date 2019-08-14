import * as passport from 'passport';
import { initApollo } from '../imports/apollo';
import ApolloClient from 'apollo-client';
import { Strategy as LocalStrategy } from 'passport-local';
import gql from 'graphql-tag';
import * as _ from 'lodash';
import * as uniqid from 'uniqid';
import * as Debug from 'debug';

const debug = Debug('passports:password');

export const CREATE_NODE_PASSWORD_AND_SESSION = gql`
  mutation CreateNodeWithPasswordAndSession($username: String, $password: String, $token: String) {
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

export const signinMiddleware = apolloClient => (req, res, next) => {
  passport.authenticate('local', async (error, user, info) => {
    debug('signinMiddleware', { user });
    if (error) {
      return res.status(400).json({ error: error.toString() });
    }
    if (user) {
      delete user.passport_passwords;
      return res.status(200).json(user);
    }
  })(req, res, next);
};

export const signupMiddleware = (
  apolloClient: ApolloClient<any>,
  _signinMiddleware,
) => async (req, res, next) => {
  debug('signupMiddleware', { body: req.body });
  await apolloClient.mutate({
    mutation: CREATE_NODE_PASSWORD_AND_SESSION,
    variables: {
      username: req.body.username,
      password: req.body.password,
      token: uniqid(),
    },
  });
  _signinMiddleware(req, res, next);
};

export const passportUse = (apolloClient) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        debug('passport', { username, password });
        const result = await apolloClient.query({
          query: FIND_USER_PASSWORD,
          variables: {
            username,
          },
        });
        // TODO check errors
        if (result.errors && result.errors.length) {
          return done(result.errors);
        }
        const node = _.get(result, 'data.nodes.0');
        if (!node) return done('!node');
        if (_.get(node, 'passport_passwords.0.password') === password) {
          // TODO hide node password !!!
          return done(null, node);
        }
        return done('!password');
      },
    ),
  );
};

export default async (app) => {
  const apolloClient = initApollo({}, '_passport');
  debug('init');
  passportUse(apolloClient);
  const _signinMiddleware = signinMiddleware(apolloClient);
  app.post('/_passport/signin',_signinMiddleware);
  app.post('/_passport/signup', signupMiddleware(apolloClient, _signinMiddleware));
};
