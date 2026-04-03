import type { Guild, GuildAuditLogsEntry } from "discord.js";
import { describe, expect, it } from "vitest";

import type { i18n } from "@bl/i18n";

import type { AuditLogChangeTransformer } from "~/events/guildAuditLogEntryCreate";
import { guildUpdate } from "~/events/guildAuditLogEntryCreate/guildUpdate";

const mockI18n = {
  t: (key: string) => key,
  language: "en-US",
} as unknown as i18n;

const mockGuild = { id: "123456789" } as Guild;
const mockTarget = null as unknown as GuildAuditLogsEntry["target"];

function get(key: string): AuditLogChangeTransformer {
  const t = (
    guildUpdate.changesTransformers as Record<
      string,
      AuditLogChangeTransformer | undefined
    >
  )[key];
  if (!t) throw new Error(`transformer "${key}" not found`);
  return t;
}

describe("guildUpdate transformers", () => {
  describe("preferred_locale", () => {
    it("translates known locale", () => {
      const result = get("preferred_locale")(
        mockI18n,
        { key: "preferred_locale", old: "en-US", new: "es-ES" } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.guildUpdatePreferredLocale.en-US",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.guildUpdatePreferredLocale.es-ES",
      );
    });

    it("falls back for unknown locale", () => {
      const result = get("preferred_locale")(
        mockI18n,
        {
          key: "preferred_locale",
          old: "xx-XX",
          new: "en-US",
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("xx-XX");
    });
  });

  describe("owner_id", () => {
    it("formats as user mention", () => {
      const result = get("owner_id")(
        mockI18n,
        { key: "owner_id", old: "111", new: "222" } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toContain("111");
      expect(result.new).toContain("222");
    });

    it("returns UNKNOWN_VALUE for falsy", () => {
      const result = get("owner_id")(
        mockI18n,
        { key: "owner_id", old: null, new: "222" } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("channel ID transformers", () => {
    for (const key of [
      "afk_channel_id",
      "rules_channel_id",
      "public_updates_channel_id",
      "safety_alerts_channel_id",
      "widget_channel_id",
      "system_channel_id",
    ]) {
      it(`${key} formats as channel mention`, () => {
        const result = get(key)(
          mockI18n,
          { key, old: "111", new: "222" } as never,
          mockGuild,
          mockTarget,
        );
        expect(result.old).toContain("111");
        expect(result.new).toContain("222");
      });
    }
  });

  describe("afk_timeout", () => {
    it("formats duration", () => {
      const result = get("afk_timeout")(
        mockI18n,
        { key: "afk_timeout", old: 300, new: 600 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBeTruthy();
      expect(result.new).toBeTruthy();
      expect(result.old).not.toBe(result.new);
    });
  });

  describe("mfa_level", () => {
    it("translates MFA levels", () => {
      const result = get("mfa_level")(
        mockI18n,
        { key: "mfa_level", old: 0, new: 1 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.guildUpdateMfaLevel.0",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.guildUpdateMfaLevel.1",
      );
    });
  });

  describe("verification_level", () => {
    it("translates verification levels", () => {
      const result = get("verification_level")(
        mockI18n,
        { key: "verification_level", old: 0, new: 4 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.guildUpdateVerificationLevel.0",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.guildUpdateVerificationLevel.4",
      );
    });
  });

  describe("explicit_content_filter", () => {
    it("translates filter levels", () => {
      const result = get("explicit_content_filter")(
        mockI18n,
        { key: "explicit_content_filter", old: 0, new: 2 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.guildUpdateExplicitContentFilter.0",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.guildUpdateExplicitContentFilter.2",
      );
    });
  });

  describe("default_message_notifications", () => {
    it("translates notification levels", () => {
      const result = get("default_message_notifications")(
        mockI18n,
        {
          key: "default_message_notifications",
          old: 0,
          new: 1,
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.guildUpdateDefaultMessageNotifications.0",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.guildUpdateDefaultMessageNotifications.1",
      );
    });
  });

  describe("premium_progress_bar_enabled", () => {
    it("translates boolean", () => {
      const result = get("premium_progress_bar_enabled")(
        mockI18n,
        {
          key: "premium_progress_bar_enabled",
          old: false,
          new: true,
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.guildUpdatePremiumProgressBarEnabled.false",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.guildUpdatePremiumProgressBarEnabled.true",
      );
    });
  });

  describe("widget_enabled", () => {
    it("translates boolean via common", () => {
      const result = get("widget_enabled")(
        mockI18n,
        { key: "widget_enabled", old: false, new: true } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("main:eventDataTransformers.common.false");
      expect(result.new).toBe("main:eventDataTransformers.common.true");
    });
  });

  describe("system_channel_flags", () => {
    it("formats flag bitfield into readable lines", () => {
      const result = get("system_channel_flags")(
        mockI18n,
        { key: "system_channel_flags", old: 0, new: 1 } as never,
        mockGuild,
        mockTarget,
      );
      // Should produce multi-line output with flag names
      expect(result.old).toBeTruthy();
      expect(result.new).toBeTruthy();
    });
  });

  describe("image hash transformers", () => {
    for (const key of [
      "icon_hash",
      "splash_hash",
      "discovery_splash_hash",
      "banner_hash",
    ]) {
      it(`${key} produces CDN URLs`, () => {
        const result = get(key)(
          mockI18n,
          { key, old: "abc123", new: "def456" } as never,
          mockGuild,
          mockTarget,
        );
        expect(result.old).toContain("cdn.discordapp.com");
        expect(result.old).toContain("abc123");
        expect(result.new).toContain("def456");
      });

      it(`${key} returns UNKNOWN_VALUE for null`, () => {
        const result = get(key)(
          mockI18n,
          { key, old: null, new: "def456" } as never,
          mockGuild,
          mockTarget,
        );
        expect(result.old).toBe(
          "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
        );
      });
    }
  });

  describe("changes map", () => {
    it("covers all expected keys", () => {
      const keys = Object.keys(guildUpdate.changesMap);
      expect(keys).toEqual(
        expect.arrayContaining([
          "name",
          "description",
          "icon_hash",
          "splash_hash",
          "discovery_splash_hash",
          "banner_hash",
          "owner_id",
          "region",
          "preferred_locale",
          "afk_channel_id",
          "afk_timeout",
          "rules_channel_id",
          "public_updates_channel_id",
          "safety_alerts_channel_id",
          "mfa_level",
          "verification_level",
          "explicit_content_filter",
          "default_message_notifications",
          "vanity_url_code",
          "premium_progress_bar_enabled",
          "widget_enabled",
          "widget_channel_id",
          "system_channel_flags",
          "system_channel_id",
        ]),
      );
    });
  });
});
