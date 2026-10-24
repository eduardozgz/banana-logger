import { connection } from "./connection";
import { globalSettingsQueries } from "./queries/globalSettings";
import { settingsQueries } from "./queries/settings";
import { userQueries } from "./queries/user";

export type { Dialect } from "./connection";

/** The active dialect ("sqlite" | "pg"). */
export const dialect = connection.dialect;

/** Apply the generated migrations for the active dialect. */
export const runMigrations = connection.runMigrations;

// Data-access layer. Dialect-agnostic: the connection (./connection.ts) hands
// each query module a dialect-matched (orm, tables) pair and the queries return
// the shared row types, so call sites are identical on SQLite and Postgres.
export const db = {
  settings: settingsQueries,
  globalSettings: globalSettingsQueries,
  user: userQueries,
  /** The raw Drizzle instance, for advanced use. */
  $client: connection.orm,
  /** Close the underlying connection (called on graceful shutdown). */
  close: connection.close,
};
