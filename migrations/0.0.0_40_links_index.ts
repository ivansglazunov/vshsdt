import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('links_index', (table) => {
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
      .integer('ofNodeId')
      .notNullable()
      .references('id')
      .inTable('nodes');
    table
      .text('listId')
      .notNullable();
    table.integer('depth').notNullable();

    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('links_index');
}
