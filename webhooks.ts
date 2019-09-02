import fs from 'fs';
import Debug from 'debug';

import { initApollo } from './imports/apollo';

import hasuraBearer from './webhooks/hasura-bearer';
import leads from './webhooks/leads';

const debug = Debug('webhooks');

export default (app) => {
  debug('init');
  hasuraBearer(app, initApollo);
  leads(app, initApollo);
};
