import * as Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('nodes_props_types', (table) => {
    table.increments('id').primary();
    table
      .integer('typeId')
      .references('id')
      .inTable('props_types');
    table
      .integer('ofId')
      .notNullable()
      .references('id')
      .inTable('nodes');

    table
      .integer('nodeTypeId')
      .notNullable()
      .references('id')
      .inTable('nodes_types');

    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('nodes_props_types');
}
