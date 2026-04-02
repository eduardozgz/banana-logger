import type { Guild, GuildAuditLogsEntry } from "discord.js";
import { describe, expect, it } from "vitest";

import type { i18n } from "@/i18n";

import type { AuditLogChangeTransformer } from "~/events/guildAuditLogEntryCreate";
import { channelUpdate } from "~/events/guildAuditLogEntryCreate/channelUpdate";

const mockI18n = {
  t: (key: string) => key,
  language: "en-US",
} as unknown as i18n;

const mockGuild = {} as Guild;
const mockTarget = null as unknown as GuildAuditLogsEntry["target"];

function get(key: string): AuditLogChangeTransformer {
  const t = (
    channelUpdate.changesTransformers as Record<
      string,
      AuditLogChangeTransformer | undefined
    >
  )[key];
  if (!t) throw new Error(`transformer "${key}" not found`);
  return t;
}

describe("channelUpdate transformers", () => {
  describe("type", () => {
    it("translates channel type enum values", () => {
      const result = get("type")(
        mockI18n,
        { key: "type", old: 0, new: 2 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("main:eventDataTransformers.channelUpdateType.0");
      expect(result.new).toBe("main:eventDataTransformers.channelUpdateType.2");
    });

    it("returns UNKNOWN_VALUE for undefined", () => {
      const result = get("type")(
        mockI18n,
        { key: "type", old: undefined, new: 0 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("nsfw", () => {
    it("translates boolean via common transformer", () => {
      const result = get("nsfw")(
        mockI18n,
        { key: "nsfw", old: false, new: true } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("main:eventDataTransformers.common.false");
      expect(result.new).toBe("main:eventDataTransformers.common.true");
    });
  });

  describe("bitrate", () => {
    it("formats bitrate values", () => {
      const result = get("bitrate")(
        mockI18n,
        { key: "bitrate", old: 64000, new: 96000 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toContain("64");
      expect(result.new).toContain("96");
    });

    it("returns UNKNOWN_VALUE for falsy", () => {
      const result = get("bitrate")(
        mockI18n,
        { key: "bitrate", old: 0, new: 64000 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("rate_limit_per_user", () => {
    it("formats duration", () => {
      const result = get("rate_limit_per_user")(
        mockI18n,
        { key: "rate_limit_per_user", old: 10, new: 30 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBeTruthy();
      expect(result.new).toBeTruthy();
      expect(result.old).not.toBe(result.new);
    });
  });

  describe("default_auto_archive_duration", () => {
    it("converts minutes to seconds for formatting", () => {
      const result = get("default_auto_archive_duration")(
        mockI18n,
        {
          key: "default_auto_archive_duration",
          old: 60,
          new: 1440,
        } as never,
        mockGuild,
        mockTarget,
      );
      // 60 min = 1 hour, 1440 min = 1 day
      expect(result.old).toBeTruthy();
      expect(result.new).toBeTruthy();
    });
  });

  describe("video_quality_mode", () => {
    it("maps known modes", () => {
      const result = get("video_quality_mode")(
        mockI18n,
        { key: "video_quality_mode", old: 1, new: 2 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventDataTransformers.channelUpdateVideoQualityMode.1",
      );
      expect(result.new).toBe(
        "main:eventDataTransformers.channelUpdateVideoQualityMode.2",
      );
    });

    it("returns UNKNOWN_VALUE for unknown mode", () => {
      const result = get("video_quality_mode")(
        mockI18n,
        { key: "video_quality_mode", old: 99, new: 1 } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      );
    });
  });

  describe("rtc_region", () => {
    it("returns region string or none", () => {
      const result = get("rtc_region")(
        mockI18n,
        { key: "rtc_region", old: null, new: "us-west" } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("main:eventDataTransformers.common.none");
      expect(result.new).toBe("us-west");
    });
  });

  describe("default_thread_rate_limit_per_user", () => {
    it("formats duration or returns none", () => {
      const result = get("default_thread_rate_limit_per_user")(
        mockI18n,
        {
          key: "default_thread_rate_limit_per_user",
          old: 0,
          new: 60,
        } as never,
        mockGuild,
        mockTarget,
      );
      expect(result.old).toBe("main:eventDataTransformers.common.none");
      expect(result.new).toBeTruthy();
    });
  });

  describe("changes map", () => {
    it("covers all expected keys", () => {
      const keys = Object.keys(channelUpdate.changesMap);
      expect(keys).toEqual(
        expect.arrayContaining([
          "name",
          "type",
          "topic",
          "nsfw",
          "bitrate",
          "user_limit",
          "rate_limit_per_user",
          "position",
          "permission_overwrites",
          "default_auto_archive_duration",
          "video_quality_mode",
          "rtc_region",
          "flags",
          "default_thread_rate_limit_per_user",
        ]),
      );
    });
  });
});
