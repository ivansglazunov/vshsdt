import Knex from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('nodes_props_access', (table) => {
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
      .integer('accessTypeId')
      .notNullable()
      .references('id')
      .inTable('access_types');
    table
      .string('tableName');

    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('nodes_props_access');
}
