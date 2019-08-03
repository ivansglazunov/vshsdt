import * as passport from 'passport';
import { initApollo } from '../../lib/with-apollo';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

const bearerMiddleware = async (req, res, next) => {
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

export default app => {
  app.post('/hasura-bearer', bearerMiddleware);
};
