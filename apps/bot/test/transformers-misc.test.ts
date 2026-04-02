import type { Guild, GuildAuditLogsEntry } from "discord.js";
import { describe, expect, it } from "vitest";

import type { i18n } from "@/i18n";

import type { AuditLogChangeTransformer } from "~/events/guildAuditLogEntryCreate";
import { memberUpdate } from "~/events/guildAuditLogEntryCreate/memberUpdate";
import { roleUpdate } from "~/events/guildAuditLogEntryCreate/roleUpdate";
import { scheduledEventUpdate } from "~/events/guildAuditLogEntryCreate/scheduledEventUpdate";
import { stageInstanceUpdate } from "~/events/guildAuditLogEntryCreate/stageInstanceUpdate";

const mockI18n = {
  t: (key: string) => key,
  language: "en-US",
} as unknown as i18n;

const mockGuild = { id: "123456789" } as Guild;
const mockTarget = null as unknown as GuildAuditLogsEntry["target"];

function getFrom(
  handler: { changesTransformers: Record<string, unknown> },
  key: string,
): AuditLogChangeTransformer {
  const t = handler.changesTransformers[key] as
    | AuditLogChangeTransformer
    | undefined;
  if (!t) throw new Error(`transformer "${key}" not found`);
  return t;
}

// ── roleUpdate ──────────────────────────────────────────────

describe("roleUpdate transformers", () => {
  const get = (key: string) => getFrom(roleUpdate, key);

  describe("color", () => {
    it("formats as hex color", () => {
      const result = get("color")(
        mockI18n,
        { key: "color", old: 0xff0000, new: 0x00ff00 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("#ff0000");
      expect(result.new).toBe("#00ff00");
    });

    it("pads short hex values", () => {
      const result = get("color")(
        mockI18n,
        { key: "color", old: 0x0000ff, new: 0x000001 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("#0000ff");
      expect(result.new).toBe("#000001");
    });

    it("returns UNKNOWN_VALUE for 0 (no color)", () => {
      const result = get("color")(
        mockI18n,
        { key: "color", old: 0, new: 0xff0000 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("hoist", () => {
    it("translates boolean via common", () => {
      const result = get("hoist")(
        mockI18n,
        { key: "hoist", old: false, new: true } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("main:eventDataTransformers.common.false");
      expect(result.new).toBe("main:eventDataTransformers.common.true");
    });
  });

  describe("mentionable", () => {
    it("uses role-specific transformer", () => {
      const result = get("mentionable")(
        mockI18n,
        { key: "mentionable", old: false, new: true } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.roleUpdateMentionable.false",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.roleUpdateMentionable.true",
      );
    });
  });

  describe("icon_hash", () => {
    it("produces CDN URLs for role icons", () => {
      const targetWithId = { id: "999" } as GuildAuditLogsEntry["target"];
      const result = get("icon_hash")(
        mockI18n,
        { key: "icon_hash", old: "abc", new: "def" } as never,
        mockGuild,
        targetWithId,
      );
      expect(result.old).toContain("cdn.discordapp.com");
      expect(result.old).toContain("999");
      expect(result.old).toContain("abc");
      expect(result.new).toContain("def");
    });
  });

  describe("changes map", () => {
    it("covers all expected keys", () => {
      const keys = Object.keys(roleUpdate.changesMap);
      expect(keys).toEqual(
        expect.arrayContaining([
          "name",
          "color",
          "hoist",
          "mentionable",
          "permissions",
          "icon_hash",
        ]),
      );
    });
  });
});

// ── memberUpdate ────────────────────────────────────────────

describe("memberUpdate transformers", () => {
  const get = (key: string) => getFrom(memberUpdate, key);

  describe("deaf", () => {
    it("translates deaf status", () => {
      const result = get("deaf")(
        mockI18n,
        { key: "deaf", old: false, new: true } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.memberUpdateDeaf.false",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.memberUpdateDeaf.true",
      );
    });

    it("returns UNKNOWN_VALUE for undefined", () => {
      const result = get("deaf")(
        mockI18n,
        { key: "deaf", old: undefined, new: true } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("mute", () => {
    it("translates mute status", () => {
      const result = get("mute")(
        mockI18n,
        { key: "mute", old: true, new: false } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.memberUpdateMute.true",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.memberUpdateMute.false",
      );
    });
  });

  describe("communication_disabled_until", () => {
    it("formats timeout as relative time", () => {
      const result = get("communication_disabled_until")(
        mockI18n,
        {
          key: "communication_disabled_until",
          old: null,
          new: "2025-01-01T00:00:00.000Z",
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("main:eventDataTransformers.common.none");
      expect(result.new).toContain("<t:"); // Discord timestamp format
    });
  });

  describe("avatar_hash", () => {
    it("produces avatar URLs", () => {
      const targetWithId = {
        id: "111",
        discriminator: "0",
      } as GuildAuditLogsEntry["target"];
      const result = get("avatar_hash")(
        mockI18n,
        { key: "avatar_hash", old: null, new: "abc123" } as never,
        mockGuild,
        targetWithId,
      );
      expect(result.old).toContain("cdn.discordapp.com");
      expect(result.new).toContain("abc123");
    });
  });

  describe("changes map", () => {
    it("covers all expected keys", () => {
      const keys = Object.keys(memberUpdate.changesMap);
      expect(keys).toEqual(
        expect.arrayContaining([
          "nick",
          "deaf",
          "mute",
          "avatar_hash",
          "communication_disabled_until",
        ]),
      );
    });
  });
});

// ── scheduledEventUpdate ────────────────────────────────────

describe("scheduledEventUpdate transformers", () => {
  const get = (key: string) => getFrom(scheduledEventUpdate, key);

  describe("status", () => {
    it("translates all status values", () => {
      for (const [num, expected] of [
        [1, "scheduledEventUpdateStatus.1"],
        [2, "scheduledEventUpdateStatus.2"],
        [3, "scheduledEventUpdateStatus.3"],
        [4, "scheduledEventUpdateStatus.4"],
      ] as const) {
        const result = get("status")(
          mockI18n,
          { key: "status", old: undefined, new: num } as never,
          mockGuild,
          mockTarget,
        );
        expect(result.new).toBe(`main:eventDataTransformers.${expected}`);
      }
    });

    it("returns Unknown for unexpected value", () => {
      const result = get("status")(
        mockI18n,
        { key: "status", old: 99, new: 1 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("Unknown");
    });
  });

  describe("entity_type", () => {
    it("translates entity types", () => {
      const result = get("entity_type")(
        mockI18n,
        { key: "entity_type", old: 1, new: 3 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.scheduledEventUpdateEntityType.1",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.scheduledEventUpdateEntityType.3",
      );
    });
  });

  describe("privacy_level", () => {
    it("translates privacy level", () => {
      const result = get("privacy_level")(
        mockI18n,
        { key: "privacy_level", old: 2, new: 2 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.scheduledEventUpdatePrivacyLevel.2",
      );
    });
  });

  describe("channel_id", () => {
    it("formats as channel mention or None", () => {
      const result = get("channel_id")(
        mockI18n,
        { key: "channel_id", old: null, new: "123" } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("None");
      expect(result.new).toContain("123");
    });
  });

  describe("image_hash", () => {
    it("produces CDN URLs for event images", () => {
      const targetWithId = { id: "888" } as GuildAuditLogsEntry["target"];
      const result = get("image_hash")(
        mockI18n,
        { key: "image_hash", old: null, new: "img123" } as never,
        mockGuild,
        targetWithId,
      );
      expect(result.old).toBe("None");
      expect(result.new).toContain("img123");
      expect(result.new).toContain("guild-events");
    });
  });

  describe("changes map", () => {
    it("covers all expected keys", () => {
      const keys = Object.keys(scheduledEventUpdate.changesMap);
      expect(keys).toEqual(
        expect.arrayContaining([
          "name",
          "description",
          "channel_id",
          "location",
          "status",
          "entity_type",
          "privacy_level",
          "image_hash",
        ]),
      );
    });
  });
});

// ── stageInstanceUpdate ─────────────────────────────────────

describe("stageInstanceUpdate transformers", () => {
  const get = (key: string) => getFrom(stageInstanceUpdate, key);

  describe("privacy_level", () => {
    it("maps known levels", () => {
      const result = get("privacy_level")(
        mockI18n,
        { key: "privacy_level", old: 1, new: 2 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.stageInstanceUpdatePrivacyLevel.1",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.stageInstanceUpdatePrivacyLevel.2",
      );
    });

    it("returns Unknown for unexpected value", () => {
      const result = get("privacy_level")(
        mockI18n,
        { key: "privacy_level", old: 99, new: 2 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("Unknown");
    });
  });

  describe("changes map", () => {
    it("covers all expected keys", () => {
      const keys = Object.keys(stageInstanceUpdate.changesMap);
      expect(keys).toEqual(expect.arrayContaining(["topic", "privacy_level"]));
    });
  });
});
