import * as Knex from 'knex';

export async function up(knex: Knex) {
  console.log(__filename);
  await knex.schema.createTable('nodes_types', table => {
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
  await knex.schema.dropTable('nodes_types');
}
