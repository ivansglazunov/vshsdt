import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('links_lists', (table) => {
    table.increments('id').primary();
    table
      .integer('nodeId')
      .notNullable()
      .references('id')
      .inTable('nodes');
    table
      .integer('linkId')
      .references('id')
      .inTable('links');
    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('links_lists');
}
