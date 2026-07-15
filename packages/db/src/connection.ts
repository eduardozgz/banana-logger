import { createClient } from "@libsql/client";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { migrate as migrateLibsql } from "drizzle-orm/libsql/migrator";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import { migrate as migratePg } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import baseLogger from "@bl/logger";

import { env } from "./env";
import * as pgSchema from "./schema/pg";
import * as sqliteSchema from "./schema/sqlite";

const logger = baseLogger.child({ component: "db" });

// ---------------------------------------------------------------------------
// Dialect selection.
//
// The data-access layer in ./index.ts is written once against the SQLite/libsql
// types. Postgres exposes the same query-builder API (select / insert /
// onConflictDoUpdate / returning / delete) and its schema is defined to produce
// the same row shapes, so we build a dialect-matched (orm, tables) pair and, for
// Postgres, cast it to the SQLite types at this single, isolated boundary.
// Runtime always pairs a Postgres client with Postgres tables (or a libsql
// client with SQLite tables), so the erased casts are behaviourally sound while
// the DAL body stays fully type-checked against the SQLite types.
// ---------------------------------------------------------------------------

type SqliteOrm = ReturnType<typeof createSqlite>["orm"];
type SqliteTables = typeof sqliteSchema.schema;

export type Dialect = "sqlite" | "pg";

export interface Connection {
  /** Drizzle instance, typed as the SQLite/libsql client for the shared DAL. */
  orm: SqliteOrm;
  /** Active dialect's table objects, typed as the SQLite schema. */
  tables: SqliteTables;
  dialect: Dialect;
  /** Close the underlying connection, draining in-flight work (graceful shutdown). */
  close: () => Promise<void>;
  /** Apply the generated migrations for the active dialect. */
  runMigrations: () => Promise<void>;
}

const queryLogger =
  env.LOG_LEVEL === "debug"
    ? {
        logQuery: (query: string, params: unknown[]) =>
          logger.debug(query, { params }),
      }
    : false;

// import.meta.url points at this source file, so ../drizzle/<dialect> resolves
// to the committed migration folders. Only evaluated when runMigrations() is
// called (via `pnpm -F @bl/db migrate` / the smoke script under tsx), never in
// the bundled apps.
const migrationsFolder = (dialect: Dialect) =>
  new URL(`../drizzle/${dialect}`, import.meta.url).pathname;

function createSqlite() {
  // libsql accepts the file: URL directly and ships prebuilt binaries (no native
  // compile step), keeping the self-host story friction-free.
  const client = createClient({ url: env.DATABASE_URL });
  const orm = drizzleLibsql(client, {
    schema: sqliteSchema.schema,
    logger: queryLogger,
  });
  return { client, orm };
}

function createConnection(): Connection {
  const url = env.DATABASE_URL;

  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
    const client = postgres(url);
    const orm = drizzlePg(client, {
      schema: pgSchema.schema,
      logger: queryLogger,
    });
    return {
      orm: orm as unknown as SqliteOrm,
      tables: pgSchema.schema as unknown as SqliteTables,
      dialect: "pg",
      close: () => client.end(),
      runMigrations: () =>
        migratePg(orm, { migrationsFolder: migrationsFolder("pg") }),
    };
  }

  if (url.startsWith("file:") || url === ":memory:") {
    const { client, orm } = createSqlite();
    return {
      orm,
      tables: sqliteSchema.schema,
      dialect: "sqlite",
      close: () => {
        client.close();
        return Promise.resolve();
      },
      runMigrations: () =>
        migrateLibsql(orm, { migrationsFolder: migrationsFolder("sqlite") }),
    };
  }

  throw new Error(
    `Unsupported DATABASE_URL "${url}". Expected a file: (SQLite) or postgres:// URL.`,
  );
}

const globalForDb = globalThis as unknown as {
  connection: Connection | undefined;
};

export const connection = globalForDb.connection ?? createConnection();
if (env.NODE_ENV !== "production") globalForDb.connection = connection;
