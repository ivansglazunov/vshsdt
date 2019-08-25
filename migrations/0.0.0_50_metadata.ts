import Knex from 'knex';

import { replace } from '../metadata';
import metadata0 from '../metadatas/0.0.0_0.json';
import metadata1 from '../metadatas/0.0.0_1.json';

export async function up(knex: Knex) {
  await replace(metadata1);
}
export async function down(knex: Knex) {
  await replace(metadata0);
}
