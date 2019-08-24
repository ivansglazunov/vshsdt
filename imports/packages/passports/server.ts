import * as passport from 'passport';
import ApolloClient from 'apollo-client';
import { Strategy as LocalStrategy } from 'passport-local';
import gql from 'graphql-tag';
import * as _ from 'lodash';
import * as uniqid from 'uniqid';
import * as Debug from 'debug';

const debug = Debug('passports');

export const errors = [
  '!gql',
  '!node',
  '!password',
];

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
        debug('strategy start', { username, password });
        const result = await apolloClient.query({
          query: FIND_USER_PASSWORD,
          variables: {
            username,
          },
        });
        // TODO check errors
        if (result.errors && result.errors.length) {
          debug('strategy errors', { errors: result.errors });
          return done('!gql');
        }
        const node = _.get(result, 'data.nodes.0');
        if (!node) return done('!node');
        // TODO crypt passwords
        if (_.get(node, 'passport_passwords.0.password') === password) {
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
  const apolloClient = initApollo({}, '_passport');
  debug('init');
  passportUse(apolloClient);
  const _signinMiddleware = signinMiddleware(apolloClient);
  app.post('/_passports/signin',_signinMiddleware);
  app.post('/_passports/signup', signupMiddleware(apolloClient, _signinMiddleware));
  app.get('/_passports/signout', signoutMiddleware);
};
