import { randomUUID } from "node:crypto";
import { boolean, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";

import type { EventType } from "./eventType";

// Postgres has native arrays and booleans, so string/enum arrays map to text[]
// and the boolean to a real boolean. Table names, column names and the resulting
// row shapes stay identical to the SQLite schema (and to
// packages/db/src/schema/types.ts), so the shared data-access layer treats both
// dialects the same. Surrogate ids are app-generated UUID strings, exactly like
// SQLite, to keep the two backends behaviourally interchangeable.

const idColumn = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID());

const textArray = <T extends string = string>(name: string) =>
  text(name)
    .array()
    .$type<T[]>()
    .notNull()
    .$defaultFn(() => []);

export const globalSettings = pgTable(
  "GlobalSettings",
  {
    id: idColumn(),
    guildId: text("guildId").notNull(),
    ignoredChannels: textArray("ignoredChannels"),
    ignoredUsers: textArray("ignoredUsers"),
  },
  (t) => [uniqueIndex("GlobalSettings_guildId_key").on(t.guildId)],
);

export const settings = pgTable(
  "Settings",
  {
    id: idColumn(),
    guildId: text("guildId").notNull(),
    channelId: text("channelId").notNull(),
    ignoredChannels: textArray("ignoredChannels"),
    ignoredUsers: textArray("ignoredUsers"),
    watchingEvents: textArray<EventType>("watchingEvents"),
    watchChannels: textArray("watchChannels"),
    watchUsers: textArray("watchUsers"),
  },
  (t) => [
    uniqueIndex("Settings_guildId_channelId_key").on(t.guildId, t.channelId),
  ],
);

export const user = pgTable(
  "User",
  {
    id: idColumn(),
    discordUserId: text("discordUserId").notNull(),
    prefersAutosave: boolean("prefersAutosave").notNull().default(false),
  },
  (t) => [uniqueIndex("User_discordUserId_key").on(t.discordUserId)],
);

export const schema = { globalSettings, settings, user };
