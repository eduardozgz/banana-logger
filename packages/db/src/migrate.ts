import { db, dialect, runMigrations } from "./index";

// Applies the generated SQL migrations against the configured database, picking
// the SQLite or Postgres migrator based on DATABASE_URL. Run via
// `pnpm -F @bl/db migrate` (locally and in the db-utils container on deploy).
async function main() {
  await runMigrations();
  console.info(`Migrations applied (${dialect}).`);
  await db.close();
}

void main();
