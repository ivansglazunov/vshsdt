import * as passport from 'passport';
import { initApollo } from '../imports/apollo';
import gql from 'graphql-tag';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import * as _ from 'lodash';
import * as Debug from 'debug';

export const ANONYMOUS_USER_ID = 1;

const debug = Debug('webhooks:hasura-bearer');

export const FIND_TOKEN = gql`
  query($token: String) {
    nodes(where: { sessions: { token: { _eq: $token } } }) {
      id
    }
  }
`;

export const bearerMiddleware = async (req, res, next) => {
  passport.authenticate('bearer', (error, user, info) => {
    debug('middleware', { user });
    if (error) {
      return res.status(401).json({ error: error.toString() });
    }
    if (user) {
      res.status(200).json({
        'X-Hasura-Role': 'user',
        'X-Hasura-User-Id': `${user.id}`,
      });
    } else {
      res.status(200).json({
        'X-Hasura-Role': 'anonymous',
        'X-Hasura-User-Id': `${ANONYMOUS_USER_ID}`,
      });
    }
  })(req, res, next);
};

export const passportUse = (apolloClient) => {
  passport.use(
    new BearerStrategy(async (token, done) => {
      debug('passport', { token });
      const result = await apolloClient.query({
        query: FIND_TOKEN,
        variables: {
          token,
        },
      });
      // TODO check errors
      if (result.errors && result.errors.length) {
        return done(result.errors);
      }
      const node = _.get(result, 'data.nodes.0');
      if (!node) return done('!node');
      return done(null, node);
    }),
  );
};

export default (app) => {
  const apolloClient = initApollo({}, '_bearer');
  debug('init');
  passportUse(apolloClient);
  app.get('/webhooks/hasura-bearer', bearerMiddleware, (req, res) => {
    res.json({ abc: 123 });
  });
  console.log('webhook bearer');
};
