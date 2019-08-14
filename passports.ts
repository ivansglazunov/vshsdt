import * as fs from 'fs';
import * as Debug from 'debug';

const debug = Debug('passports');

const dir = fs.readdirSync(`${__dirname}/passports`);

export default (app) => {
  debug('init');
  for (let i = 0; i < dir.length; i++){
    debug(`init passports/${dir[i]}`);
    require(`./passports/${dir[i]}`).default(app);
  }
};
