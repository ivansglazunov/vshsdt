import passport from 'passport';
import { initApollo } from '../imports/apollo';
import gql from 'graphql-tag';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import _ from 'lodash';
import Debug from 'debug';

import { createLead } from '../imports/packages/leads/b24.server';
import { mailer } from '../imports/packages/leads/mailer.server';

const debug = Debug('webhooks:leads');

export const leadsMiddleware = async (req, res, next) => {
  debug('middleware', { body: req.body });
  await createLead(req.body);
  await mailer(req.body);
  res.send({});
};

export default (app, initApollo) => {
  debug('init');
  app.post('/_webhooks/leads', leadsMiddleware);
};
