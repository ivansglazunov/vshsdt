import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('nodes_props_passport_passwords', (table) => {
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

    table.text('username').notNullable();
    table.text('password').notNullable();

    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('nodes_props_passport_passwords');
}
