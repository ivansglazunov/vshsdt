import * as Knex from 'knex';

export async function up(knex: Knex) {
  console.log(__filename);
  await knex.schema.createTable('links_lists_items', table => {
    table.increments('id').primary();
    table
      .integer('listId')
      .notNullable()
      .references('id')
      .inTable('links_lists');
    table
      .integer('nodeId')
      .notNullable()
      .references('id')
      .inTable('nodes');
    table
      .integer('linkId')
      .notNullable()
      .references('id')
      .inTable('links');
    table.integer('depth').notNullable();
    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('links_lists_items');
}
