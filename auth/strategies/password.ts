import * as passport from 'passport';
import { initApollo } from '../../lib/with-apollo';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

const signinMiddleware = apolloClient => async (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return res.status(400).json({ error: error.toString() });
    }
    if (user) {
      res.status(200).json(user.getUser());
    }
  })(req, res, next);
};

const CREATE_NODE_PASSWORD = gql`
  mutation($username: String, $password: String) {
    insert_nodes(
      objects: {
        props_passport_passwords: {
          data: { password: $password, username: $username }
        }
      }
    ) {
      returning {
        id
      }
    }
  }
`;

const signupMiddleware = (
  apolloClient: ApolloClient<any>,
  _signinMiddleware,
) => async (req, res, next) => {
  const result = await apolloClient.query({
    query: CREATE_NODE_PASSWORD,
    variables: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  console.log(result);
  _signinMiddleware(req, res, next);
};

export default app => {
  const apolloClient = initApollo();
  const _signinMiddleware = signinMiddleware(apolloClient);
  app.post('/signin', _signinMiddleware);
  app.post('/signup', signupMiddleware(apolloClient, _signinMiddleware));
};
