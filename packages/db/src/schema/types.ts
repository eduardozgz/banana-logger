import type { EventType } from "./eventType";

// Dialect-agnostic row shapes. Both the SQLite and Postgres schemas are defined
// to infer these exact types, so the rest of the app never sees a dialect.

export interface GlobalSettings {
  id: string;
  guildId: string;
  ignoredChannels: string[];
  ignoredUsers: string[];
}

export interface Settings {
  id: string;
  guildId: string;
  channelId: string;
  ignoredChannels: string[];
  ignoredUsers: string[];
  watchingEvents: EventType[];
  watchChannels: string[];
  watchUsers: string[];
}

export interface User {
  id: string;
  discordUserId: string;
  prefersAutosave: boolean;
}
