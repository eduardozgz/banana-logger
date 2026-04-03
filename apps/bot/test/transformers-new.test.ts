import type { Guild, GuildAuditLogsEntry } from "discord.js";
import { describe, expect, it } from "vitest";

import type { i18n } from "@bl/i18n";

import type { AuditLogChangeTransformer } from "~/events/guildAuditLogEntryCreate";
import { autoModRuleUpdate } from "~/events/guildAuditLogEntryCreate/autoModRuleUpdate";
import { channelUpdate } from "~/events/guildAuditLogEntryCreate/channelUpdate";
import { roleUpdate } from "~/events/guildAuditLogEntryCreate/roleUpdate";
import { scheduledEventUpdate } from "~/events/guildAuditLogEntryCreate/scheduledEventUpdate";
import { soundboardSoundUpdate } from "~/events/guildAuditLogEntryCreate/soundboardSoundUpdate";
import { threadUpdate } from "~/events/guildAuditLogEntryCreate/threadUpdate";

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

// ── roleUpdate.permissions ─────────────────────────────────

describe("roleUpdate.permissions transformer", () => {
  const get = (key: string) => getFrom(roleUpdate, key);

  it("shows added and removed permissions as diff", () => {
    // SendMessages = 0x800, ManageMessages = 0x2000
    const oldPerms = (0x800).toString();
    const newPerms = (0x800 | 0x2000).toString();
    const result = get("permissions")(
      mockI18n,
      { key: "permissions", old: oldPerms, new: newPerms } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.old).toContain("**Added:**");
    expect(result.old).toContain("ManageMessages");
    expect(result.old).not.toContain("**Removed:**");
  });

  it("shows removed permissions", () => {
    const oldPerms = (0x800 | 0x2000).toString();
    const newPerms = (0x800).toString();
    const result = get("permissions")(
      mockI18n,
      { key: "permissions", old: oldPerms, new: newPerms } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.old).toContain("**Removed:**");
    expect(result.old).toContain("ManageMessages");
  });

  it("shows both added and removed", () => {
    // old: SendMessages (0x800), new: ManageMessages (0x2000)
    const result = get("permissions")(
      mockI18n,
      {
        key: "permissions",
        old: (0x800).toString(),
        new: (0x2000).toString(),
      } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.old).toContain("**Added:**");
    expect(result.old).toContain("**Removed:**");
  });

  it("returns UNKNOWN_VALUE for undefined", () => {
    const result = get("permissions")(
      mockI18n,
      { key: "permissions", old: undefined, new: undefined } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.old).toBe(
      "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
    );
  });
});

// ── autoModRuleUpdate new transformers ─────────────────────

describe("autoModRuleUpdate new transformers", () => {
  const get = (key: string) => getFrom(autoModRuleUpdate, key);

  describe("trigger_metadata", () => {
    it("formats keyword filter", () => {
      const meta = { keyword_filter: ["badword", "spam"] };
      const result = get("trigger_metadata")(
        mockI18n,
        { key: "trigger_metadata", old: null, new: meta } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("Keywords: badword, spam");
    });

    it("formats regex patterns", () => {
      const meta = { regex_patterns: ["\\btest\\b"] };
      const result = get("trigger_metadata")(
        mockI18n,
        { key: "trigger_metadata", old: null, new: meta } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("Regex:");
    });

    it("formats presets", () => {
      const meta = { presets: [1, 2] };
      const result = get("trigger_metadata")(
        mockI18n,
        { key: "trigger_metadata", old: null, new: meta } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("Profanity");
      expect(result.new).toContain("Sexual Content");
    });

    it("formats mention limit", () => {
      const meta = { mention_total_limit: 5 };
      const result = get("trigger_metadata")(
        mockI18n,
        { key: "trigger_metadata", old: null, new: meta } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("Mention limit: 5");
    });

    it("returns fallback for null", () => {
      const result = get("trigger_metadata")(
        mockI18n,
        { key: "trigger_metadata", old: null, new: null } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("actions", () => {
    it("formats block message action", () => {
      const actions = [{ type: 1 }];
      const result = get("actions")(
        mockI18n,
        { key: "actions", old: null, new: actions } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("Block Message");
    });

    it("formats send alert with channel", () => {
      const actions = [{ type: 2, metadata: { channel_id: "123" } }];
      const result = get("actions")(
        mockI18n,
        { key: "actions", old: null, new: actions } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("Send Alert");
      expect(result.new).toContain("123");
    });

    it("formats timeout with duration", () => {
      const actions = [{ type: 3, metadata: { duration_seconds: 60 } }];
      const result = get("actions")(
        mockI18n,
        { key: "actions", old: null, new: actions } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("Timeout");
      expect(result.new).toContain("60s");
    });

    it("returns fallback for empty array", () => {
      const result = get("actions")(
        mockI18n,
        { key: "actions", old: null, new: [] } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("exempt_roles", () => {
    it("formats role IDs as mentions", () => {
      const result = get("exempt_roles")(
        mockI18n,
        {
          key: "exempt_roles",
          old: [],
          new: ["111", "222"],
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("111");
      expect(result.new).toContain("222");
    });

    it("returns none for empty", () => {
      const result = get("exempt_roles")(
        mockI18n,
        { key: "exempt_roles", old: [], new: [] } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toBe("main:eventDataTransformers.common.none");
    });
  });

  describe("exempt_channels", () => {
    it("formats channel IDs as mentions", () => {
      const result = get("exempt_channels")(
        mockI18n,
        {
          key: "exempt_channels",
          old: [],
          new: ["333", "444"],
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("333");
      expect(result.new).toContain("444");
    });
  });
});

// ── channelUpdate new transformers ─────────────────────────

describe("channelUpdate new transformers", () => {
  const get = (key: string) => getFrom(channelUpdate, key);

  describe("permission_overwrites", () => {
    it("shows added overwrites", () => {
      const oldOw: never[] = [];
      const newOw = [{ id: "111", type: 0, allow: "2048", deny: "0" }];
      const result = get("permission_overwrites")(
        mockI18n,
        { key: "permission_overwrites", old: oldOw, new: newOw } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toContain("**Added**");
      expect(result.old).toContain("111");
    });

    it("shows removed overwrites", () => {
      const oldOw = [{ id: "111", type: 1, allow: "0", deny: "2048" }];
      const newOw: never[] = [];
      const result = get("permission_overwrites")(
        mockI18n,
        { key: "permission_overwrites", old: oldOw, new: newOw } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toContain("**Removed**");
    });

    it("shows changed permissions in overwrites", () => {
      const oldOw = [{ id: "111", type: 0, allow: "2048", deny: "0" }];
      const newOw = [{ id: "111", type: 0, allow: "0", deny: "2048" }];
      const result = get("permission_overwrites")(
        mockI18n,
        { key: "permission_overwrites", old: oldOw, new: newOw } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toContain("**Changed**");
      expect(result.old).toContain("Allow removed:");
      expect(result.old).toContain("Deny added:");
    });
  });

  describe("flags", () => {
    it("formats channel flags to names", () => {
      // RequireTag = 16
      const result = get("flags")(
        mockI18n,
        { key: "flags", old: 0, new: 16 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("None");
      expect(result.new).toContain("RequireTag");
    });

    it("returns UNKNOWN_VALUE for undefined", () => {
      const result = get("flags")(
        mockI18n,
        { key: "flags", old: undefined, new: 0 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("available_tags", () => {
    it("formats tag names", () => {
      const tags = [
        { id: "1", name: "Bug" },
        { id: "2", name: "Feature" },
      ];
      const result = get("available_tags")(
        mockI18n,
        { key: "available_tags", old: [], new: tags } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toBe("Bug, Feature");
    });

    it("returns none for empty", () => {
      const result = get("available_tags")(
        mockI18n,
        { key: "available_tags", old: [], new: [] } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toBe("main:eventDataTransformers.common.none");
    });
  });

  describe("default_reaction_emoji", () => {
    it("formats unicode emoji", () => {
      const emoji = { emoji_name: "👍", emoji_id: null };
      const result = get("default_reaction_emoji")(
        mockI18n,
        { key: "default_reaction_emoji", old: null, new: emoji } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toBe("👍");
    });

    it("formats custom emoji by ID", () => {
      const emoji = { emoji_id: "999888", emoji_name: null };
      const result = get("default_reaction_emoji")(
        mockI18n,
        { key: "default_reaction_emoji", old: null, new: emoji } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toContain("999888");
    });

    it("returns none for null", () => {
      const result = get("default_reaction_emoji")(
        mockI18n,
        { key: "default_reaction_emoji", old: null, new: null } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.new).toBe("main:eventDataTransformers.common.none");
    });
  });
});

// ── threadUpdate.flags ─────────────────────────────────────

describe("threadUpdate.flags transformer", () => {
  const get = (key: string) => getFrom(threadUpdate, key);

  it("formats thread flags to names", () => {
    // Pinned = 2
    const result = get("flags")(
      mockI18n,
      { key: "flags", old: 0, new: 2 } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.old).toBe("None");
    expect(result.new).toContain("Pinned");
  });

  it("returns UNKNOWN_VALUE for undefined", () => {
    const result = get("flags")(
      mockI18n,
      { key: "flags", old: undefined, new: 0 } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.old).toBe(
      "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
    );
  });
});

// ── scheduledEventUpdate.recurrence_rule ────────────────────

describe("scheduledEventUpdate.recurrence_rule transformer", () => {
  const get = (key: string) => getFrom(scheduledEventUpdate, key);

  it("formats weekly recurrence with days", () => {
    const rule = {
      start: "2024-01-01",
      frequency: 2, // Weekly
      interval: 1,
      by_weekday: [0, 2, 4], // Mon, Wed, Fri
    };
    const result = get("recurrence_rule")(
      mockI18n,
      { key: "recurrence_rule", old: null, new: rule } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.new).toContain("Weekly");
    expect(result.new).toContain("Monday");
    expect(result.new).toContain("Wednesday");
    expect(result.new).toContain("Friday");
  });

  it("formats daily recurrence with interval", () => {
    const rule = {
      start: "2024-01-01",
      frequency: 3, // Daily
      interval: 2,
    };
    const result = get("recurrence_rule")(
      mockI18n,
      { key: "recurrence_rule", old: null, new: rule } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.new).toContain("Every 2 dailys");
  });

  it("formats monthly with month names", () => {
    const rule = {
      start: "2024-01-01",
      frequency: 1, // Monthly
      interval: 1,
      by_month: [1, 6, 12],
    };
    const result = get("recurrence_rule")(
      mockI18n,
      { key: "recurrence_rule", old: null, new: rule } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.new).toContain("Monthly");
    expect(result.new).toContain("January");
    expect(result.new).toContain("June");
    expect(result.new).toContain("December");
  });

  it("returns none for null", () => {
    const result = get("recurrence_rule")(
      mockI18n,
      { key: "recurrence_rule", old: null, new: null } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.new).toBe("main:eventDataTransformers.common.none");
  });
});

// ── soundboardSoundUpdate.emoji_id ─────────────────────────

describe("soundboardSoundUpdate.emoji_id transformer", () => {
  const get = (key: string) => getFrom(soundboardSoundUpdate, key);

  it("formats emoji ID as formatted emoji", () => {
    const result = get("emoji_id")(
      mockI18n,
      { key: "emoji_id", old: null, new: "999888777" } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.new).toContain("999888777");
  });

  it("returns none for null", () => {
    const result = get("emoji_id")(
      mockI18n,
      { key: "emoji_id", old: null, new: null } as never,
      mockGuild,
      mockTarget,
    );
    expect(result.new).toBe("main:eventDataTransformers.common.none");
  });
});
