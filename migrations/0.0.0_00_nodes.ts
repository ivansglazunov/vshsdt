import Knex from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('nodes', (table) => {
    table.increments('id').primary();

    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('nodes');
}
