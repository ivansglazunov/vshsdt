import Knex from 'knex';

export const FUNCTION_INSERT = `
  CREATE OR REPLACE functon on-links-insert-function()
  RETURNS TRIGGER AS $trigger$
  DECLARE
    currentLink RECORD;
    parentsCount INT;
  BEGIN
    SELECT DISTINCT ll1."nodeId" FROM
    (
      SELECT
      lli0."listId",
      lli0."nodeId",
      lli0."depth"
      FROM
      "links_lists" as ll0,
      "links_lists_items" as lli0
      WHERE
      ll0."nodeId" = 4 AND
      lli0."listId" = ll0."id"
    ) as p0,
    "links_lists_items" as lli1,
    "links_lists" as ll1
    WHERE
    (
      lli1."depth" = p0."depth" AND
      lli1."nodeId" = p0."nodeId"
    ) AND
    ll1."id" = lli1."listId" AND
    ll1."nodeId" NOT IN (
      SELECT
      lli0."nodeId"
      FROM
      "links_lists" as ll0,
      "links_lists_items" as lli0
      WHERE
      ll0."nodeId" = 4 AND
      lli0."listId" = ll0."id"
    );
  END;
  $trigger$ language 'plpgsql';
`;
export const FUNCTION_DELETE = `
  DROP FUNCTION on-links-insert-function;
`;

export async function up(knex: Knex) {
  // return knex.raw(FUNCTION_INSERT);
};

export async function down(knex: Knex) {
  // return knex.raw(FUNCTION_DELETE);
};
