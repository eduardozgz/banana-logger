/**
 * Config-cache invalidation smoke test — verifies the Redis pub/sub path that
 * drops a guild's cached config across pods. A cached entry must NOT reflect a
 * direct DB write until an invalidation is published, then it must reload.
 *
 * Requires a reachable Redis (REDIS_URL) and uses a throwaway SQLite db.
 * Run: `pnpm -F @bl/bot smoke:cache`
 */
import { db, runMigrations } from "@bl/db";
import { publishConfigInvalidation } from "@bl/redis";

import {
  getGuildConfig,
  startConfigCacheInvalidation,
  stopConfigCacheInvalidation,
} from "~/services/configCache";

let failures = 0;
function check(name: string, cond: boolean) {
  if (cond) {
    console.log(`  ✓ ${name}`);
  } else {
    failures++;
    console.error(`  ✗ ${name}`);
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(
  predicate: () => Promise<boolean>,
  timeoutMs = 2000,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await predicate()) return true;
    await delay(20);
  }
  return false;
}

async function main() {
  await runMigrations();
  await startConfigCacheInvalidation();

  const guildId = "cache-guild-1";

  console.log("\nCold read populates the cache");
  check("fresh guild has no settings", (await getGuildConfig(guildId)).settings.length === 0);

  console.log("\nDirect DB write is not seen while the entry is cached (serves stale)");
  // db.settings.ensure is the raw DAL — it deliberately does NOT invalidate, so
  // the cache should keep serving the previous (empty) config.
  await db.settings.ensure(guildId, "chan-Z");
  check(
    "cache still serves the stale (empty) config",
    (await getGuildConfig(guildId)).settings.length === 0,
  );

  console.log("\nPublishing an invalidation drops the entry, next read reloads");
  await publishConfigInvalidation(guildId);
  check(
    "after invalidation the reload sees the new channel",
    await waitFor(
      async () => (await getGuildConfig(guildId)).settings.length === 1,
    ),
  );

  console.log(
    failures === 0 ? "\nALL PASSED ✓" : `\n${failures} CHECK(S) FAILED ✗`,
  );
  await stopConfigCacheInvalidation();
  db.close();
  process.exit(failures === 0 ? 0 : 1);
}

void main();
