import * as Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('nodes_props_types', table => {
    table.increments('id').primary();
    table
      .integer('propId')
      .notNullable()
      .references('id')
      .inTable('props');

    table
      .integer('typeId')
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
