import * as Knex from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('nodes', table => {
    table.increments('id').primary();
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('nodes');
}
