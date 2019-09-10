import Knex from 'knex';

export async function up(knex: Knex) {
  await knex('links_types').insert({ name: 'nest' });
  await knex('links_types').insert({ name: 'access' });
}

export async function down(knex: Knex) {}
