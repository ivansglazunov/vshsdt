import Knex from 'knex';

export const RANDOM = `
SELECT array_to_string(array(select substr('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',((random()*(36-1)+1)::integer),1) from generate_series(1,50)),'')
`;

export const IS_ROOT = (nodeId) => `
SELECT
COUNT(li0."id")
FROM
"links_index" as li0
WHERE
li0."ofNodeId" = ${nodeId} AND
li0."nodeId" = ${nodeId} AND
li0."depth" = 0
LIMIT 1
`;

export const WILL_NOT_ROOT = (nodeId) => `
SELECT
COUNT(l0."id")
FROM
"links" as l0
WHERE
l0."targetId" = ${nodeId}
LIMIT 1
`;

export const F_NODE_INSERT_UP = `
  CREATE OR REPLACE FUNCTION nodes__on_insert__function()
  RETURNS TRIGGER AS $trigger$
  BEGIN
    INSERT INTO "links_index"
    ("nodeId", "listId", "ofNodeId", "depth")
    VALUES
    (NEW."id", (${RANDOM}), NEW."id", 0);
    RETURN NEW;
  END;
  $trigger$ language 'plpgsql';
`;

export const F_NODE_INSERT_DOWN = `
  DROP FUNCTION IF EXISTS nodes__on_insert__function;
`;

export const T_NODE_INSERT_UP = `
  CREATE TRIGGER nodes__on_insert__trigger AFTER INSERT ON "nodes" FOR EACH ROW EXECUTE PROCEDURE nodes__on_insert__function();
`;

export const T_NODE_INSERT_DOWN = `
  DROP TRIGGER IF EXISTS nodes__on_insert__trigger ON "nodes";
`;

export const F_LINK_INSERT_UP = `
  CREATE OR REPLACE FUNCTION links__on_insert__function()
  RETURNS TRIGGER AS $trigger$
  DECLARE
  sourceListId RECORD;
  targetOneListId RECORD;
  targetListId RECORD;
  nextListId TEXT;
  BEGIN
  IF (SELECT "indexing" FROM "links_types" WHERE "id" = NEW."typeId")
  THEN
    IF (${IS_ROOT('NEW."targetId"')})
    THEN
      FOR sourceListId
      IN (
        SELECT
        DISTINCT sli0."listId"
        FROM
        "links_index" as sli0
        WHERE
        sli0."ofNodeId" = NEW."sourceId"
      )
      LOOP
        FOR targetListId
        IN (
          SELECT
          DISTINCT tli0."listId",
          tli0."ofNodeId"
          FROM
          "links_index" as tli0
          WHERE
          tli0."nodeId" = NEW."targetId" AND
          tli0."depth" = 0
        )
        LOOP
          ${RANDOM}
          INTO nextListId;

          INSERT INTO "links_index" ("nodeId", "linkId", "ofNodeId", "listId", "depth")
          SELECT
          tli1."nodeId",
          tli1."linkId",
          tli1."ofNodeId",
          nextListId,
          (
            SELECT
            sli1."depth" + tli1."depth" + 1
            FROM
            "links_index" as sli1
            WHERE
            sli1."listId" = sourceListId."listId" AND
            sli1."nodeId" = NEW."sourceId"
          )
          FROM
          "links_index" as tli1
          WHERE
          tli1."listId" = targetListId."listId";

          INSERT INTO "links_index" ("nodeId", "linkId", "ofNodeId", "listId", "depth")
          SELECT
          sli1."nodeId",
          sli1."linkId",
          targetListId."ofNodeId",
          nextListId,
          sli1."depth"
          FROM
          "links_index" as sli1
          WHERE
          sli1."listId" = sourceListId."listId";

          DELETE FROM "links_index"
          WHERE "listId" = targetListId."listId";
        END LOOP;
      END LOOP;
    ELSE
      FOR sourceListId
      IN (
        SELECT
        DISTINCT sli0."listId",
        sli0."depth"
        FROM
        "links_index" as sli0
        WHERE
        sli0."ofNodeId" = NEW."sourceId" AND
        sli0."nodeId" = NEW."sourceId"
      )
      LOOP
        SELECT *
        INTO targetOneListId
        FROM
        "links_index" as toli0
        WHERE
        toli0."ofNodeId" = NEW."targetId" AND
        toli0."nodeId" = NEW."targetId"
        LIMIT 1;

        FOR targetListId
        IN (
          SELECT
          tli2."listId",
          tli2."ofNodeId"
          FROM (
            SELECT
            tli1."listId",
            tli1."ofNodeId",
            COUNT(tli1."id") as "tli1"
            FROM
            "links_index" as tli0,
            "links_index" as tli1
            WHERE
            tli0."listId" = targetOneListId."listId" AND
            tli1."nodeId" = tli0."nodeId" AND
            tli1."depth" = tli0."depth"
            GROUP BY tli1."listId", tli1."ofNodeId"
          ) as tli2,
          (
            SELECT
            COUNT(tli3."id")
            FROM
            "links_index" as tli3
            WHERE
            tli3."listId" = targetOneListId."listId"
          ) as tli3
          WHERE
          tli2."tli1" = tli3."count"
        )
        LOOP
          ${RANDOM}
          INTO nextListId;

          INSERT INTO "links_index" ("nodeId", "linkId", "ofNodeId", "listId", "depth")
          SELECT
          tli1."nodeId",
          tli1."linkId",
          tli1."ofNodeId",
          nextListId,
          ((tli1."depth" - targetOneListId."depth") + sourceListId."depth" + 1)
          FROM
          "links_index" as tli1
          WHERE
          tli1."listId" = targetListId."listId" AND
          tli1."depth" >= targetOneListId."depth";

          INSERT INTO "links_index" ("nodeId", "linkId", "ofNodeId", "listId", "depth")
          SELECT
          sli1."nodeId",
          sli1."linkId",
          targetListId."ofNodeId",
          nextListId,
          sli1."depth"
          FROM
          "links_index" as sli1
          WHERE
          sli1."listId" = sourceListId."listId";
        END LOOP;
      END LOOP;
    END IF;
  END IF;
  RETURN NEW;
  END;
  $trigger$ language 'plpgsql';
`;

export const F_LINK_INSERT_DOWN = `
  DROP FUNCTION IF EXISTS links__on_insert__function;
`;

export const T_LINK_INSERT_UP = `
  CREATE TRIGGER links__on_insert__trigger AFTER INSERT ON "links" FOR EACH ROW EXECUTE PROCEDURE links__on_insert__function();
`;

export const T_LINK_INSERT_DOWN = `
  DROP TRIGGER IF EXISTS links__on_insert__trigger ON "links";
`;

export const F_LINK_DELETE_UP = `
  CREATE OR REPLACE FUNCTION links__on_delete__function()
  RETURNS TRIGGER AS $trigger$
  DECLARE
  sourceListId RECORD;
  sourceIgnoreListId RECORD;
  targetListId RECORD;
  nextListId TEXT;
  BEGIN
  IF (SELECT "indexing" FROM "links_types" WHERE "id" = OLD."typeId")
  THEN
    IF (${WILL_NOT_ROOT('OLD."targetId"')})
    THEN
      FOR sourceListId
      IN (
        SELECT
        DISTINCT sl0."listId",
        sl0."depth"
        FROM
        "links_index" as sl0
        WHERE
        sl0."ofNodeId" = OLD."sourceId" AND
        sl0."nodeId" = OLD."sourceId"
      )
      LOOP
        DELETE FROM "links_index"
        WHERE "listId" IN (
          SELECT r."listId" FROM
          (
              SELECT
              tsli0."listId",
              tsli0."ofNodeId",
              (
                  SELECT COUNT(tli1."id")
                  FROM "links_index" as tli1
                  WHERE tli1."listId" = tl1."listId"
              ) as "targetCount",
              COUNT(tsli0."id") as "count"
              FROM
              (
                  SELECT *
                  FROM
                  (
                      SELECT
                      tl0."listId",
                      tl0."ofNodeId",
                      COUNT(tl0."id") as "tl0"
                      FROM
                      "links_index" as sli0,
                      "links_index" as tl0
                      WHERE
                      sli0."listId" = sourceListId."listId" AND
                      tl0."ofNodeId" = OLD."targetId" AND
                      tl0."nodeId" = sli0."nodeId" AND
                      tl0."depth" = sli0."depth"
                      GROUP BY tl0."listId", tl0."ofNodeId"
                  ) as tl0,
                  (
                      SELECT
                      COUNT(sli0."id")
                      FROM
                      "links_index" as sli0
                      WHERE
                      sli0."listId" = sourceListId."listId"
                  ) as sli0
                  WHERE
                  tl0."tl0" = sli0."count"
              ) as tl1,
              "links_index" as tli0,
              "links_index" as tsli0
              WHERE
              tli0."listId" = tl1."listId" AND
              tsli0."nodeId" = tli0."nodeId" AND
              tsli0."depth" = tli0."depth"
              GROUP BY tsli0."listId", tsli0."ofNodeId", tl1."listId"
          ) as r
          WHERE
          r."targetCount" = r."count"
        );
      END LOOP;
    ELSE
      SELECT *
      INTO sourceIgnoreListId
      FROM
      "links_index" as sili0
      WHERE
      sili0."ofNodeId" = OLD."sourceId" AND
      sili0."nodeId" = OLD."sourceId"
      LIMIT 1;

      FOR sourceListId
      IN (
        SELECT
        DISTINCT sl0."listId",
        sl0."depth"
        FROM
        "links_index" as sl0
        WHERE
        sl0."ofNodeId" = OLD."sourceId" AND
        sl0."nodeId" = OLD."sourceId" AND
        sl0."id" != sourceIgnoreListId."id"
      )
      LOOP
        DELETE FROM "links_index"
        WHERE "listId" IN (
          SELECT r."listId" FROM
          (
              SELECT
              tsli0."listId",
              tsli0."ofNodeId",
              (
                  SELECT COUNT(tli1."id")
                  FROM "links_index" as tli1
                  WHERE tli1."listId" = tl1."listId"
              ) as "targetCount",
              COUNT(tsli0."id") as "count"
              FROM
              (
                  SELECT *
                  FROM
                  (
                      SELECT
                      tl0."listId",
                      tl0."ofNodeId",
                      COUNT(tl0."id") as "tl0"
                      FROM
                      "links_index" as sli0,
                      "links_index" as tl0
                      WHERE
                      sli0."listId" = sourceListId."listId" AND
                      tl0."ofNodeId" = OLD."targetId" AND
                      tl0."nodeId" = sli0."nodeId" AND
                      tl0."depth" = sli0."depth"
                      GROUP BY tl0."listId", tl0."ofNodeId"
                  ) as tl0,
                  (
                      SELECT
                      COUNT(sli0."id")
                      FROM
                      "links_index" as sli0
                      WHERE
                      sli0."listId" = sourceListId."listId"
                  ) as sli0
                  WHERE
                  tl0."tl0" = sli0."count"
              ) as tl1,
              "links_index" as tli0,
              "links_index" as tsli0
              WHERE
              tli0."listId" = tl1."listId" AND
              tsli0."nodeId" = tli0."nodeId" AND
              tsli0."depth" = tli0."depth"
              GROUP BY tsli0."listId", tsli0."ofNodeId", tl1."listId"
          ) as r
          WHERE
          r."targetCount" = r."count"
        );
      END LOOP;

      FOR targetListId
      IN (
        SELECT r."listId" FROM
        (
          SELECT
          tsli0."listId",
          tsli0."ofNodeId",
          (
              SELECT COUNT(tli1."id")
              FROM "links_index" as tli1
              WHERE tli1."listId" = tl1."listId"
          ) as "targetCount",
          COUNT(tsli0."id") as "count"
          FROM
          (
              SELECT *
              FROM
              (
                  SELECT
                  tl0."listId",
                  tl0."ofNodeId",
                  COUNT(tl0."id") as "tl0"
                  FROM
                  "links_index" as sli0,
                  "links_index" as tl0
                  WHERE
                  sli0."listId" = sourceIgnoreListId."listId" AND
                  tl0."ofNodeId" = OLD."targetId" AND
                  tl0."nodeId" = sli0."nodeId" AND
                  tl0."depth" = sli0."depth"
                  GROUP BY tl0."listId", tl0."ofNodeId"
              ) as tl0,
              (
                  SELECT
                  COUNT(sli0."id")
                  FROM
                  "links_index" as sli0
                  WHERE
                  sli0."listId" = sourceIgnoreListId."listId"
              ) as sli0
              WHERE
              tl0."tl0" = sli0."count"
          ) as tl1,
          "links_index" as tli0,
          "links_index" as tsli0
          WHERE
          tli0."listId" = tl1."listId" AND
          tsli0."nodeId" = tli0."nodeId" AND
          tsli0."depth" = tli0."depth"
          GROUP BY tsli0."listId", tsli0."ofNodeId", tl1."listId"
        ) as r
        WHERE
        r."targetCount" = r."count"
      )
      LOOP
        DELETE FROM "links_index"
        WHERE
        "listId" = targetListId."listId" AND
        "depth" <= sourceIgnoreListId."depth";
        
        UPDATE "links_index"
        SET
        "depth" = "depth" - sourceIgnoreListId."depth" - 1
        WHERE
        "listId" = targetListId."listId";
      END LOOP;
    END IF;
  END IF;
  RETURN OLD;
  END;
  $trigger$ language 'plpgsql';
`;

export const F_LINK_DELETE_DOWN = `
  DROP FUNCTION IF EXISTS links__on_delete__function;
`;

export const T_LINK_DELETE_UP = `
  CREATE TRIGGER links__on_delete__trigger AFTER DELETE ON "links" FOR EACH ROW EXECUTE PROCEDURE links__on_delete__function();
`;

export const T_LINK_DELETE_DOWN = `
  DROP TRIGGER IF EXISTS links__on_delete__trigger ON "links";
`;

export async function up(knex: Knex) {
  await knex.raw(F_NODE_INSERT_UP);
  await knex.raw(T_NODE_INSERT_UP);
  await knex.raw(F_LINK_INSERT_UP);
  await knex.raw(T_LINK_INSERT_UP);
  await knex.raw(F_LINK_DELETE_UP);
  await knex.raw(T_LINK_DELETE_UP);
};

export async function down(knex: Knex) {
  await knex.raw(T_NODE_INSERT_DOWN);
  await knex.raw(F_NODE_INSERT_DOWN);
  await knex.raw(T_LINK_INSERT_DOWN);
  await knex.raw(F_LINK_INSERT_DOWN);
  await knex.raw(T_LINK_DELETE_DOWN);
  await knex.raw(F_LINK_DELETE_DOWN);
};
