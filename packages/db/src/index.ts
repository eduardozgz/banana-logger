import { and, count, eq } from "drizzle-orm";

import type { EventType } from "./schema/eventType";
import type { GlobalSettings, Settings, User } from "./schema/types";
import { connection } from "./connection";

export type { Dialect } from "./connection";

// ---------------------------------------------------------------------------
// Data-access layer. Dialect-agnostic: the connection (./connection.ts) hands us
// a dialect-matched (orm, tables) pair, this layer returns the shared row types,
// and the array-contains "watching this event" filter is done in app code so it
// works identically on SQLite and Postgres.
// ---------------------------------------------------------------------------

const orm = connection.orm;
const { settings, globalSettings, user } = connection.tables;

/** The active dialect ("sqlite" | "pg"). */
export const dialect = connection.dialect;

/** Apply the generated migrations for the active dialect. */
export const runMigrations = connection.runMigrations;

async function settingsGetByGuild(guildId: string): Promise<Settings[]> {
  return orm.select().from(settings).where(eq(settings.guildId, guildId));
}

async function settingsGet(
  guildId: string,
  channelId: string,
): Promise<Settings | undefined> {
  const [row] = await orm
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
  const [row] = await orm
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
  const [row] = await orm
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
  const [inserted] = await orm
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
  await orm
    .delete(settings)
    .where(
      and(eq(settings.guildId, guildId), eq(settings.channelId, channelId)),
    );
}

async function globalSettingsGet(
  guildId: string,
): Promise<GlobalSettings | undefined> {
  const [row] = await orm
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
  const [row] = await orm
    .insert(globalSettings)
    .values({ guildId, ...data })
    .onConflictDoUpdate({ target: globalSettings.guildId, set: data })
    .returning();
  if (!row) throw new Error("globalSettings.patch: no row returned");
  return row;
}

async function userGet(discordUserId: string): Promise<User | undefined> {
  const [row] = await orm
    .select()
    .from(user)
    .where(eq(user.discordUserId, discordUserId));
  return row;
}

async function userPatch(
  discordUserId: string,
  data: Partial<Omit<User, "id" | "discordUserId">>,
): Promise<User> {
  const [row] = await orm
    .insert(user)
    .values({ discordUserId, ...data })
    .onConflictDoUpdate({ target: user.discordUserId, set: data })
    .returning();
  if (!row) throw new Error("user.patch: no row returned");
  return row;
}

async function userDelete(discordUserId: string): Promise<void> {
  await orm.delete(user).where(eq(user.discordUserId, discordUserId));
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
  /** The raw Drizzle instance, for advanced use. */
  $client: orm,
  /** Close the underlying connection (called on graceful shutdown). */
  close: connection.close,
};
