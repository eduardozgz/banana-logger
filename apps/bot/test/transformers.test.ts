import type { Guild, GuildAuditLogsEntry } from "discord.js";
import { describe, expect, it } from "vitest";

import type { i18n } from "@/i18n";

import type { AuditLogChangeTransformer } from "~/events/guildAuditLogEntryCreate";
import { autoModRuleUpdate } from "~/events/guildAuditLogEntryCreate/autoModRuleUpdate";
import { threadUpdate } from "~/events/guildAuditLogEntryCreate/threadUpdate";

// Returns the key itself so we can assert exact translation keys
const mockI18n = {
  t: (key: string) => key,
  language: "en-US",
} as unknown as i18n;

const mockGuild = {} as Guild;
const mockTarget = null as unknown as GuildAuditLogsEntry["target"];

function getTransformer(
  transformers: Record<string, AuditLogChangeTransformer | undefined>,
  key: string,
): AuditLogChangeTransformer {
  const transformer = transformers[key];
  if (!transformer) {
    throw new Error(`transformer "${key}" should exist`);
  }
  return transformer;
}

describe("autoModRuleUpdate transformers", () => {
  const transformers = autoModRuleUpdate.changesTransformers as Record<
    string,
    AuditLogChangeTransformer | undefined
  >;

  describe("enabled", () => {
    it("transforms true/false to common translations", () => {
      const transformer = getTransformer(transformers, "enabled");
      const result = transformer(
        mockI18n,
        { key: "enabled", old: false, new: true } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("main:eventDataTransformers.common.false");
      expect(result.new).toBe("main:eventDataTransformers.common.true");
    });
  });

  describe("event_type", () => {
    it("transforms MessageSend (1)", () => {
      const transformer = getTransformer(transformers, "event_type");
      const result = transformer(
        mockI18n,
        { key: "event_type", old: undefined, new: 1 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.autoModRuleEventType.1",
      );
    });

    it("transforms MemberUpdate (2)", () => {
      const transformer = getTransformer(transformers, "event_type");
      const result = transformer(
        mockI18n,
        { key: "event_type", old: 1, new: 2 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.autoModRuleEventType.1",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.autoModRuleEventType.2",
      );
    });
  });

  describe("trigger_type", () => {
    it("transforms all known trigger types", () => {
      const transformer = getTransformer(transformers, "trigger_type");

      for (const type of [1, 3, 4, 5, 6]) {
        const result = transformer(
          mockI18n,
          { key: "trigger_type", old: undefined, new: type } as never,
          mockGuild,
          mockTarget,
        );
        expect(result.new).toBe(
          `main:eventDataTransformers.autoModRuleTriggerType.${type}`,
        );
      }
    });

    it("returns UNKNOWN_VALUE for undefined", () => {
      const transformer = getTransformer(transformers, "trigger_type");
      const result = transformer(
        mockI18n,
        { key: "trigger_type", old: undefined, new: 1 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });
});

describe("threadUpdate transformers", () => {
  const transformers = threadUpdate.changesTransformers as Record<
    string,
    AuditLogChangeTransformer | undefined
  >;

  describe("archived", () => {
    it("transforms boolean to archived/unarchived", () => {
      const transformer = getTransformer(transformers, "archived");
      const result = transformer(
        mockI18n,
        { key: "archived", old: false, new: true } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.threadUpdateArchived.false",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.threadUpdateArchived.true",
      );
    });
  });

  describe("locked", () => {
    it("transforms boolean to locked/unlocked", () => {
      const transformer = getTransformer(transformers, "locked");
      const result = transformer(
        mockI18n,
        { key: "locked", old: true, new: false } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.threadUpdateLocked.true",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.threadUpdateLocked.false",
      );
    });
  });

  describe("auto_archive_duration", () => {
    it("returns UNKNOWN_VALUE for undefined", () => {
      const transformer = getTransformer(transformers, "auto_archive_duration");
      const result = transformer(
        mockI18n,
        {
          key: "auto_archive_duration",
          old: undefined,
          new: 60,
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
      expect(result.new).toBeTruthy();
    });

    it("formats duration values (minutes * 60 = seconds)", () => {
      const transformer = getTransformer(transformers, "auto_archive_duration");
      const result = transformer(
        mockI18n,
        {
          key: "auto_archive_duration",
          old: 60,
          new: 1440,
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBeTruthy();
      expect(result.new).toBeTruthy();
      expect(result.old).not.toBe(result.new);
    });
  });

  describe("rate_limit_per_user", () => {
    it("formats slowmode duration", () => {
      const transformer = getTransformer(transformers, "rate_limit_per_user");
      const result = transformer(
        mockI18n,
        {
          key: "rate_limit_per_user",
          old: 0,
          new: 30,
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
      expect(result.new).toBeTruthy();
    });
  });
});

describe("changes map completeness", () => {
  it("autoModRuleUpdate covers all expected change keys", () => {
    const keys = Object.keys(autoModRuleUpdate.changesMap);
    expect(keys).toContain("name");
    expect(keys).toContain("event_type");
    expect(keys).toContain("trigger_type");
    expect(keys).toContain("trigger_metadata");
    expect(keys).toContain("actions");
    expect(keys).toContain("enabled");
    expect(keys).toContain("exempt_roles");
    expect(keys).toContain("exempt_channels");
  });

  it("threadUpdate covers all expected change keys", () => {
    const keys = Object.keys(threadUpdate.changesMap);
    expect(keys).toContain("name");
    expect(keys).toContain("archived");
    expect(keys).toContain("locked");
    expect(keys).toContain("auto_archive_duration");
    expect(keys).toContain("rate_limit_per_user");
    expect(keys).toContain("flags");
  });
});
