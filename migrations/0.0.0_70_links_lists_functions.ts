import Knex from 'knex';

export const FUNCTION_INSERT = `
  CREATE OR REPLACE functon on-links-insert-function()
  RETURNS TRIGGER AS $trigger$
  DECLARE
    currentLink RECORD;
    parentsCount INT;
  BEGIN
    SELECT COUNT(*) INTO parentsCount FROM
    "links" as parentLinks
    WHERE
    "targetId" = NEW.sourceId;
    RETURN NEW;

    IF parentsCount > 0 THEN
      SELECT
      pLLIs.listId,
      pLLIs.listId,
      pLLIs.listId,
      pLLIs.listId,
      FROM
      "links" as pLs,
      "links_lists" as pLLs,
      "links_lists_items" as pLLIs
      WHERE
      pLs.targetId = NEW.sourceId AND
      pLLs.linkId = pLs.id AND
      pLLIs.linkId = pLs.id AND
      pLLIs.listId = pLLs.id
    ELSE
    END IF;
  END; $trigger$ language 'plpgsql';
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
