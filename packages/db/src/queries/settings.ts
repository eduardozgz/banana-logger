import { and, count, eq } from "drizzle-orm";

import type { EventType } from "../schema/eventType";
import type { Settings } from "../schema/types";
import { connection } from "../connection";

const orm = connection.orm;
const { settings } = connection.tables;

type SettingsPatch = Partial<Omit<Settings, "id" | "guildId" | "channelId">>;

async function getByGuild(guildId: string): Promise<Settings[]> {
  return orm.select().from(settings).where(eq(settings.guildId, guildId));
}

async function get(
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

// The array-contains filter is done in app code so it works identically on
// SQLite (JSON array) and Postgres (native text[]).
async function getByEvent(
  guildId: string,
  event: EventType,
): Promise<Settings[]> {
  const rows = await getByGuild(guildId);
  return rows.filter((row) => row.watchingEvents.includes(event));
}

async function countByGuild(guildId: string): Promise<number> {
  const [row] = await orm
    .select({ value: count() })
    .from(settings)
    .where(eq(settings.guildId, guildId));
  return row?.value ?? 0;
}

async function patch(
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

// Update-only variant of patch: never inserts, so a check-then-write caller
// can't resurrect a row deleted between the check and the write — the UPDATE
// just matches zero rows and returns undefined. Use this wherever "the row
// must already exist" is part of the contract (e.g. dashboard saves).
async function update(
  guildId: string,
  channelId: string,
  data: SettingsPatch,
): Promise<Settings | undefined> {
  const [row] = await orm
    .update(settings)
    .set(data)
    .where(
      and(eq(settings.guildId, guildId), eq(settings.channelId, channelId)),
    )
    .returning();
  return row;
}

async function ensure(guildId: string, channelId: string): Promise<Settings> {
  const [inserted] = await orm
    .insert(settings)
    .values({ guildId, channelId })
    .onConflictDoNothing()
    .returning();
  if (inserted) return inserted;
  const existing = await get(guildId, channelId);
  if (!existing) throw new Error("settings.ensure: row missing after conflict");
  return existing;
}

async function remove(guildId: string, channelId: string): Promise<void> {
  await orm
    .delete(settings)
    .where(
      and(eq(settings.guildId, guildId), eq(settings.channelId, channelId)),
    );
}

export const settingsQueries = {
  getByGuild,
  get,
  getByEvent,
  countByGuild,
  patch,
  update,
  ensure,
  delete: remove,
};
