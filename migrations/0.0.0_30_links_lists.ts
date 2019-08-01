import * as Knex from 'knex';

export async function up(knex: Knex) {
  console.log(__filename);
  await knex.schema.createTable('links_lists', table => {
    table.increments('id').primary();
    table
      .integer('linkId')
      .notNullable()
      .references('id')
      .inTable('links');
    table
      .timestamp('inserted', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted', { useTz: true });
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('links_lists');
}
