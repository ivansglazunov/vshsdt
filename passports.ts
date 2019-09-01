import fs from 'fs';
import passport from 'passport';
import Debug from 'debug';

import { initApollo } from './imports/apollo';

import local from './passports/local';

const debug = Debug('passports');

export default (app) => {
  debug('init');
  local(app, initApollo);
};
