import { migrate } from "drizzle-orm/libsql/migrator";

import { db } from "./index";

// Applies the generated SQL migrations against the configured database. Run via
// `pnpm -F @bl/db migrate` (locally and in the db-utils container on deploy).
async function main() {
  await migrate(db.$client, {
    migrationsFolder: new URL("../drizzle/sqlite", import.meta.url).pathname,
  });
  console.info("Migrations applied.");
  db.close();
}

void main();
