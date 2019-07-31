require('ts-node/register');
import config from './config';

export const client = 'pg';

export const connection = config.POSTGRES;

export const migrations = {
  directory: __dirname + '/migrations',
};
