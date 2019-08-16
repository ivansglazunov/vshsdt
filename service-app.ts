import passports from './passports';
import webhooks from './webhooks';
import * as _ from 'lodash';
import * as dotenv from 'dotenv';
import * as Debug from 'debug';

dotenv.config();
const debug = Debug('services');

export default (app) => {
  const mode: string = process.env.MODE || 'passports,webhooks';
  const services = mode.split(',');
  debug('init', { services });

  if (_.includes(services, 'passports')) passports(app);
  if (_.includes(services, 'webhooks')) webhooks(app);
};
