import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('access_types', (table) => {
    table.increments('id').primary();

    table
      .text('name')
      .notNullable()
      .unique();

    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('access_types');
}
