require('ts-node/register');
require('dotenv').config();

export const client = 'pg';

export const connection = `${process.env.POSTGRES}?ssl=true`;

export const migrations = {
  directory: `${__dirname}/migrations`,
  disableTransactions: true,
};
