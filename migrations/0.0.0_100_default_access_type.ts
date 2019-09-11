import Knex from 'knex';

export async function up(knex: Knex) {
  await knex('access_types').insert({ name: 'insert' });
  await knex('access_types').insert({ name: 'update' });
  await knex('access_types').insert({ name: 'delete' });
  await knex('access_types').insert({ name: 'select' });
}

export async function down(knex: Knex) {}
