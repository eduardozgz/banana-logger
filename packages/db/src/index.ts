import { createClient } from "@libsql/client";
import { and, count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";

import baseLogger from "@bl/logger";

import type { EventType } from "./schema/eventType";
import type { GlobalSettings, Settings, User } from "./schema/types";
import { env } from "./env";
import * as schema from "./schema/sqlite";

const logger = baseLogger.child({ component: "db" });

// ---------------------------------------------------------------------------
// Connection (SQLite). Postgres is selected by a postgres:// DATABASE_URL and
// wired in a sibling module; today the default self-host path is SQLite.
// ---------------------------------------------------------------------------

function createDb() {
  if (!env.DATABASE_URL.startsWith("file:")) {
    throw new Error(
      `Unsupported DATABASE_URL "${env.DATABASE_URL}". Expected a file: (SQLite) URL.`,
    );
  }

  // libsql accepts the file: URL directly and ships prebuilt binaries (no
  // native compile step), keeping the self-host story friction-free.
  const libsql = createClient({ url: env.DATABASE_URL });

  return drizzle(libsql, {
    schema,
    logger:
      env.LOG_LEVEL === "debug"
        ? { logQuery: (query, params) => logger.debug(query, { params }) }
        : false,
  });
}

const globalForDb = globalThis as unknown as {
  drizzle: ReturnType<typeof createDb> | undefined;
};

const client = globalForDb.drizzle ?? createDb();
if (env.NODE_ENV !== "production") globalForDb.drizzle = client;

// ---------------------------------------------------------------------------
// Data-access layer. Dialect-agnostic: returns the shared row types, and the
// array-contains "watching this event" filter is done in app code so it works
// identically on SQLite and Postgres.
// ---------------------------------------------------------------------------

const { settings, globalSettings, user } = schema;

async function settingsGetByGuild(guildId: string): Promise<Settings[]> {
  return client.select().from(settings).where(eq(settings.guildId, guildId));
}

async function settingsGet(
  guildId: string,
  channelId: string,
): Promise<Settings | undefined> {
  const [row] = await client
    .select()
    .from(settings)
    .where(
      and(eq(settings.guildId, guildId), eq(settings.channelId, channelId)),
    );
  return row;
}

async function settingsGetByEvent(
  guildId: string,
  event: EventType,
): Promise<Settings[]> {
  const rows = await settingsGetByGuild(guildId);
  return rows.filter((row) => row.watchingEvents.includes(event));
}

async function settingsCountByGuild(guildId: string): Promise<number> {
  const [row] = await client
    .select({ value: count() })
    .from(settings)
    .where(eq(settings.guildId, guildId));
  return row?.value ?? 0;
}

type SettingsPatch = Partial<Omit<Settings, "id" | "guildId" | "channelId">>;

async function settingsPatch(
  guildId: string,
  channelId: string,
  data: SettingsPatch,
): Promise<Settings> {
  const [row] = await client
    .insert(settings)
    .values({ guildId, channelId, ...data })
    .onConflictDoUpdate({
      target: [settings.guildId, settings.channelId],
      set: data,
    })
    .returning();
  if (!row) throw new Error("settings.patch: no row returned");
  return row;
}

async function settingsEnsure(
  guildId: string,
  channelId: string,
): Promise<Settings> {
  const [inserted] = await client
    .insert(settings)
    .values({ guildId, channelId })
    .onConflictDoNothing()
    .returning();
  if (inserted) return inserted;
  const existing = await settingsGet(guildId, channelId);
  if (!existing) throw new Error("settings.ensure: row missing after conflict");
  return existing;
}

async function settingsDelete(
  guildId: string,
  channelId: string,
): Promise<void> {
  await client
    .delete(settings)
    .where(
      and(eq(settings.guildId, guildId), eq(settings.channelId, channelId)),
    );
}

async function globalSettingsGet(
  guildId: string,
): Promise<GlobalSettings | undefined> {
  const [row] = await client
    .select()
    .from(globalSettings)
    .where(eq(globalSettings.guildId, guildId));
  return row;
}

type GlobalSettingsPatch = Partial<Omit<GlobalSettings, "id" | "guildId">>;

async function globalSettingsPatch(
  guildId: string,
  data: GlobalSettingsPatch,
): Promise<GlobalSettings> {
  const [row] = await client
    .insert(globalSettings)
    .values({ guildId, ...data })
    .onConflictDoUpdate({ target: globalSettings.guildId, set: data })
    .returning();
  if (!row) throw new Error("globalSettings.patch: no row returned");
  return row;
}

async function userGet(discordUserId: string): Promise<User | undefined> {
  const [row] = await client
    .select()
    .from(user)
    .where(eq(user.discordUserId, discordUserId));
  return row;
}

async function userPatch(
  discordUserId: string,
  data: Partial<Omit<User, "id" | "discordUserId">>,
): Promise<User> {
  const [row] = await client
    .insert(user)
    .values({ discordUserId, ...data })
    .onConflictDoUpdate({ target: user.discordUserId, set: data })
    .returning();
  if (!row) throw new Error("user.patch: no row returned");
  return row;
}

async function userDelete(discordUserId: string): Promise<void> {
  await client.delete(user).where(eq(user.discordUserId, discordUserId));
}

export const db = {
  settings: {
    getByGuild: settingsGetByGuild,
    get: settingsGet,
    getByEvent: settingsGetByEvent,
    countByGuild: settingsCountByGuild,
    patch: settingsPatch,
    ensure: settingsEnsure,
    delete: settingsDelete,
  },
  globalSettings: {
    get: globalSettingsGet,
    patch: globalSettingsPatch,
  },
  user: {
    get: userGet,
    patch: userPatch,
    delete: userDelete,
  },
  /** The raw Drizzle client, for migrations / advanced use. */
  $client: client,
  /** Close the underlying connection (called on graceful shutdown). */
  close: () => {
    client.$client.close();
  },
};

// ---------------------------------------------------------------------------
// Error mapping (kept from the Prisma version's public surface).
// ---------------------------------------------------------------------------

export class NotFoundError extends Error {}
export class ConflictError extends Error {}

/** True for a unique-constraint violation on SQLite or Postgres. */
export function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const code = (error as { code?: unknown }).code;
  // better-sqlite3: SQLITE_CONSTRAINT_UNIQUE / _PRIMARYKEY; Postgres: 23505.
  return (
    code === "SQLITE_CONSTRAINT_UNIQUE" ||
    code === "SQLITE_CONSTRAINT_PRIMARYKEY" ||
    code === "23505"
  );
}

export const handleDBError = (error: unknown): never => {
  if (isUniqueViolation(error)) throw new ConflictError();
  throw error;
};
