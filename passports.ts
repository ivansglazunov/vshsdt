import fs from 'fs';
import passport from 'passport';
import Debug from 'debug';

import { initApollo } from './imports/apollo';

const debug = Debug('passports');

const dir = fs.readdirSync(`${__dirname}/passports`);

export default (app) => {
  debug('init');

  for (let i = 0; i < dir.length; i++){
    debug(`init passports/${dir[i]}`);
    require(`./passports/${dir[i]}`).default(app, initApollo);
  }
};
