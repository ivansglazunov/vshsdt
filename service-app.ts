import passport from './passports';
import webhooks from './webhooks';
import * as _ from 'lodash';
import * as Debug from 'debug';

const debug = Debug('services');

export default (app) => {
  const mode: string = process.env.MODE || 'passport,webhooks';
  const services = mode.split(',');
  debug('init', { services });

  if (_.includes(services, 'passport')) passport(app);
  if (_.includes(services, 'webhooks')) webhooks(app);
};
