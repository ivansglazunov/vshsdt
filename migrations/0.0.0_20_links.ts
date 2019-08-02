import * as Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('links', table => {
    table.increments('id').primary();
    table
      .integer('sourceId')
      .notNullable()
      .references('id')
      .inTable('nodes');
    table
      .integer('targetId')
      .notNullable()
      .references('id')
      .inTable('nodes');
    table
      .integer('nodeId')
      .references('id')
      .inTable('nodes');
    table
      .integer('typeId')
      .notNullable()
      .references('id')
      .inTable('links_types');
    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('links');
}
