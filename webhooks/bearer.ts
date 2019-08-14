import * as passport from 'passport';
import { initApollo } from '../lib/with-apollo';
import gql from 'graphql-tag';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import * as _ from 'lodash';

export const bearerMiddleware = async (req, res, next) => {
  passport.authenticate('bearer', (error, user, info) => {
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
        'X-Hasura-User-Id': `${user.id}`,
      });
    }
  })(req, res, next);
};

export const FIND_TOKEN = gql`
  query($token: String) {
    nodes(where: { props: { sessions: { token: { _eq: $token } } } }) {
      id
    }
  }
`;

export const passportUse = (apolloClient) => {
  passport.use(
    new BearerStrategy(async (token, done) => {
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
  const apolloClient = initApollo();
  passportUse(apolloClient);
  app.get('/webhooks/hasura-bearer', bearerMiddleware, (req, res) => {
    res.json({ abc: 123 });
  });
  console.log('webhook bearer');
};
