import { randomUUID } from "node:crypto";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import type { EventType } from "./eventType";

// SQLite has no native arrays or enums, so string/enum arrays are stored as JSON
// text columns and the boolean as an integer. The `$type`/`$inferSelect` shapes
// still match packages/db/src/schema/types.ts.

const idColumn = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID());

const jsonArray = <T extends string = string>(name: string) =>
  text(name, { mode: "json" })
    .$type<T[]>()
    .notNull()
    .$defaultFn(() => []);

export const globalSettings = sqliteTable(
  "GlobalSettings",
  {
    id: idColumn(),
    guildId: text("guildId").notNull(),
    ignoredChannels: jsonArray("ignoredChannels"),
    ignoredUsers: jsonArray("ignoredUsers"),
  },
  (t) => [uniqueIndex("GlobalSettings_guildId_key").on(t.guildId)],
);

export const settings = sqliteTable(
  "Settings",
  {
    id: idColumn(),
    guildId: text("guildId").notNull(),
    channelId: text("channelId").notNull(),
    ignoredChannels: jsonArray("ignoredChannels"),
    ignoredUsers: jsonArray("ignoredUsers"),
    watchingEvents: jsonArray<EventType>("watchingEvents"),
    watchChannels: jsonArray("watchChannels"),
    watchUsers: jsonArray("watchUsers"),
  },
  (t) => [
    uniqueIndex("Settings_guildId_channelId_key").on(t.guildId, t.channelId),
  ],
);

export const user = sqliteTable(
  "User",
  {
    id: idColumn(),
    discordUserId: text("discordUserId").notNull(),
    prefersAutosave: integer("prefersAutosave", { mode: "boolean" })
      .notNull()
      .default(false),
  },
  (t) => [uniqueIndex("User_discordUserId_key").on(t.discordUserId)],
);

export const schema = { globalSettings, settings, user };
