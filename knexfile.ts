require('ts-node/register');
import config from './config';

export const client = 'pg';

export const connection = `${config.POSTGRES}?ssl=true`;

export const migrations = {
  directory: __dirname + '/migrations',
  disableTransactions: true,
};
