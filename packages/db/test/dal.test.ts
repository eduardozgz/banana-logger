import { beforeAll, describe, expect, it } from "vitest";

import { db, runMigrations } from "../src/index";
import { EventType } from "../src/schema/eventType";

// Runs against an in-memory libsql db (DATABASE_URL=:memory: in vitest.config).
// The `it` blocks share that db and run in order, modelling a sequence of writes.
beforeAll(async () => {
  await runMigrations();
});

describe("settings DAL", () => {
  it("reads empty for an unknown guild/channel", async () => {
    expect(await db.settings.get("g1", "c1")).toBeUndefined();
    expect(await db.settings.getByGuild("g1")).toEqual([]);
    expect(await db.settings.countByGuild("g1")).toBe(0);
  });

  it("patch inserts, then updates the same row", async () => {
    const inserted = await db.settings.patch("g1", "c1", {
      watchingEvents: [EventType.guildUpdateName],
    });
    expect(inserted.guildId).toBe("g1");
    expect(inserted.channelId).toBe("c1");
    expect(inserted.watchingEvents).toEqual([EventType.guildUpdateName]);
    expect(inserted.ignoredUsers).toEqual([]);

    const updated = await db.settings.patch("g1", "c1", {
      watchingEvents: [EventType.guildUpdateName, EventType.roleCreate],
    });
    expect(updated.id).toBe(inserted.id);
    expect(updated.watchingEvents).toEqual([
      EventType.guildUpdateName,
      EventType.roleCreate,
    ]);
    expect(await db.settings.countByGuild("g1")).toBe(1);
  });

  it("getByEvent filters by the watched-events array", async () => {
    expect(
      (await db.settings.getByEvent("g1", EventType.roleCreate)).map(
        (s) => s.channelId,
      ),
    ).toEqual(["c1"]);
    expect(
      await db.settings.getByEvent("g1", EventType.guildUpdateIcon),
    ).toEqual([]);
  });

  it("ensure is idempotent and leaves existing rows untouched", async () => {
    const existing = await db.settings.ensure("g1", "c1");
    expect(existing.watchingEvents).toEqual([
      EventType.guildUpdateName,
      EventType.roleCreate,
    ]);

    const created = await db.settings.ensure("g1", "c2");
    expect(created.watchingEvents).toEqual([]);
    expect(await db.settings.countByGuild("g1")).toBe(2);
  });

  it("isolates guilds", async () => {
    await db.settings.patch("g2", "c1", {
      watchingEvents: [EventType.guildUpdateName],
    });
    expect(
      (await db.settings.getByEvent("g1", EventType.guildUpdateName)).map(
        (s) => s.channelId,
      ),
    ).toEqual(["c1"]);
    expect(
      (await db.settings.getByEvent("g2", EventType.guildUpdateName)).map(
        (s) => s.channelId,
      ),
    ).toEqual(["c1"]);
    expect(await db.settings.countByGuild("g2")).toBe(1);
  });

  it("deletes a channel", async () => {
    await db.settings.delete("g1", "c2");
    expect(await db.settings.get("g1", "c2")).toBeUndefined();
    expect(await db.settings.countByGuild("g1")).toBe(1);
  });
});

describe("globalSettings DAL", () => {
  it("patch/get round-trips the arrays", async () => {
    expect(await db.globalSettings.get("gs1")).toBeUndefined();
    const gs = await db.globalSettings.patch("gs1", {
      ignoredUsers: ["u1", "u2"],
    });
    expect(gs.ignoredUsers).toEqual(["u1", "u2"]);
    expect(gs.ignoredChannels).toEqual([]);
    expect((await db.globalSettings.get("gs1"))?.ignoredUsers).toEqual([
      "u1",
      "u2",
    ]);
  });
});

describe("user DAL", () => {
  it("round-trips the prefersAutosave boolean and deletes", async () => {
    const created = await db.user.patch("discord-1", { prefersAutosave: true });
    expect(created.prefersAutosave).toBe(true);
    expect((await db.user.get("discord-1"))?.prefersAutosave).toBe(true);

    const off = await db.user.patch("discord-1", { prefersAutosave: false });
    expect(off.prefersAutosave).toBe(false);

    await db.user.delete("discord-1");
    expect(await db.user.get("discord-1")).toBeUndefined();
  });
});
