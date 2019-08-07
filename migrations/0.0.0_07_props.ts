import * as Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('props', table => {
    table.increments('id').primary();

    table
      .integer('typeId')
      .references('id')
      .inTable('props_types');
    table
      .integer('nodeId')
      .notNullable()
      .references('id')
      .inTable('nodes');

    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('props');
}
