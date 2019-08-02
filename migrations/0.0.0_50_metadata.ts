import * as Knex from 'knex';

import { replace } from '../metadata';
import * as metadata0 from '../metadatas/0.0.0_0.json';
import * as metadata1 from '../metadatas/0.0.0_1.json';

export async function up(knex: Knex) {
  await replace(metadata1);
}
export async function down(knex: Knex) {
  await replace(metadata0);
}
