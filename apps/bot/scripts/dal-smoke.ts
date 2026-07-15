/**
 * DAL smoke test — mimics the Discord config commands end-to-end through the bot
 * services (which sit on the @bl/db data-access layer) against a real database,
 * asserting the DAL behaves as the commands expect. Handy for verifying the
 * SQLite/Postgres backends without a running bot.
 *
 * Run: `pnpm -F @bl/bot smoke:db`      (throwaway SQLite file, auto-cleaned)
 *  or: `pnpm -F @bl/bot smoke:db:pg`   (an EMPTY Postgres DB via DATABASE_URL)
 *
 * It asserts against a fixed set of ids and has no teardown, so the Postgres
 * variant expects a fresh/empty database (drop & recreate, or a throwaway
 * container). The SQLite variant deletes its temp file for you.
 */
import type { Guild, GuildTextBasedChannel } from "discord.js";

import { db, runMigrations } from "@bl/db";
import { EventType } from "@bl/db/client";

import { ALL_EVENTS_CHOICE } from "~/Constants";
import GlobalSettingsService from "~/services/GlobalSettingsService";
import SettingsService from "~/services/SettingsService";

let failures = 0;
function check(name: string, cond: boolean) {
  if (cond) {
    console.log(`  ✓ ${name}`);
  } else {
    failures++;
    console.error(`  ✗ ${name}`);
  }
}

// Minimal discord.js stand-ins — the services only read `.id` / `.guild.id`.
const guild = { id: "guild-1" } as unknown as Guild;
const otherGuild = { id: "guild-2" } as unknown as Guild;
const channelA = { id: "chan-A", guild } as unknown as GuildTextBasedChannel;
const channelB = { id: "chan-B", guild } as unknown as GuildTextBasedChannel;

async function main() {
  // Apply migrations to whatever DATABASE_URL points at (dialect chosen by the
  // connection layer).
  await runMigrations();

  console.log("\n/config show on a fresh channel (no row yet)");
  let a = await SettingsService.get(channelA, guild);
  check("fresh channel has no events", a.events.length === 0);
  check(
    "getByEventName does not create a row (no write-on-read)",
    (await SettingsService.getByEventName(EventType.guildUpdateName, guild))
      .length === 0,
  );

  console.log("\n/config toggle-log guildUpdateName");
  a = await SettingsService.get(channelA, guild);
  check("toggle reports added", (await a.toggleEvent(EventType.guildUpdateName)));
  a = await SettingsService.get(channelA, guild);
  check("event persisted", a.events.includes(EventType.guildUpdateName));

  console.log("\nLogService hot path — getByEventName");
  const watching = await SettingsService.getByEventName(
    EventType.guildUpdateName,
    guild,
  );
  check("exactly one channel watches it", watching.length === 1);
  check("it is channel A", watching[0]?.channelId === "chan-A");
  check(
    "an unrelated event matches nothing",
    (await SettingsService.getByEventName(EventType.roleCreate, guild))
      .length === 0,
  );

  console.log("\n/config toggle-log guildUpdateName again (off)");
  a = await SettingsService.get(channelA, guild);
  check("toggle reports removed", !(await a.toggleEvent(EventType.guildUpdateName)));
  check(
    "no channel watches it anymore",
    (await SettingsService.getByEventName(EventType.guildUpdateName, guild))
      .length === 0,
  );

  console.log("\n/config toggle-log all (enable everything on channel B)");
  const b = await SettingsService.get(channelB, guild);
  check("enabling all reports added", await b.toggleEvent(ALL_EVENTS_CHOICE));
  const allCount = Object.values(EventType).length;
  check(
    `all ${allCount} events enabled`,
    (await SettingsService.get(channelB, guild)).events.length === allCount,
  );

  console.log("\nGuild isolation");
  check(
    "channel B (guild-1) now watches guildUpdateName",
    (await SettingsService.getByEventName(EventType.guildUpdateName, guild)).some(
      (s) => s.channelId === "chan-B",
    ),
  );
  check(
    "guild-2 sees nothing",
    (await SettingsService.getByEventName(EventType.guildUpdateName, otherGuild))
      .length === 0,
  );

  console.log("\n/globalconfig toggle-ignore-user + inheritance");
  const gs = await GlobalSettingsService.get(guild);
  check("toggleIgnoreUser reports added", await gs.toggleIgnoreUser("user-1"));
  check(
    "global ignored user persisted",
    (await GlobalSettingsService.get(guild)).ignoredUsers.includes("user-1"),
  );
  check(
    "channel settings inherit the global ignored user",
    (await SettingsService.get(channelB, guild)).ignoredUsers.includes("user-1"),
  );

  console.log("\nUser accounts — prefersAutosave boolean round-trip (user router)");
  const created = await db.user.patch("discord-user-1", {
    prefersAutosave: true,
  });
  check("user.patch returns prefersAutosave=true", created.prefersAutosave);
  check(
    "user.get reads the boolean back",
    (await db.user.get("discord-user-1"))?.prefersAutosave === true,
  );
  const flipped = await db.user.patch("discord-user-1", {
    prefersAutosave: false,
  });
  check("upsert-update flips the boolean to false", flipped.prefersAutosave === false);
  await db.user.delete("discord-user-1");
  check(
    "user.delete removes the row",
    (await db.user.get("discord-user-1")) === undefined,
  );

  console.log(
    failures === 0
      ? "\nALL PASSED ✓"
      : `\n${failures} CHECK(S) FAILED ✗`,
  );
  await db.close();
  process.exit(failures === 0 ? 0 : 1);
}

void main();
