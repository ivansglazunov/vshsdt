import fs from 'fs';
import Debug from 'debug';

import { initApollo } from './imports/apollo';

const debug = Debug('webhooks');

const dir = fs.readdirSync(`${__dirname}/webhooks`);

export default (app) => {
  debug('init');
  for (let i = 0; i < dir.length; i++){
    debug(`init webhooks/${dir[i]}`);
    require(`./webhooks/${dir[i]}`).default(app, initApollo);
  }
};
