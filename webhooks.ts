import fs from 'fs';
import Debug from 'debug';

import { initApollo } from './imports/apollo';

import hasuraBearer from './webhooks/hasura-bearer';

const debug = Debug('webhooks');

export default (app) => {
  debug('init');
  hasuraBearer(app, initApollo);
};
