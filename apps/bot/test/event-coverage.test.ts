import { describe, expect, it } from "vitest";

import { EventType } from "@/db/client";

import { EmbedTemplatePlaceholders } from "~/Constants";
import baseTemplates from "../../../packages/i18n/src/locales/en-US/baseTemplates.json";
import main from "../../../packages/i18n/src/locales/en-US/main.json";

const allEventTypes = Object.values(EventType);

describe("event coverage", () => {
  describe("EmbedTemplatePlaceholders (Constants.ts)", () => {
    it("has an entry for every EventType", () => {
      const missing = allEventTypes.filter(
        (eventType) => !(eventType in EmbedTemplatePlaceholders),
      );
      expect(
        missing,
        `Missing from EmbedTemplatePlaceholders: ${missing.join(", ")}`,
      ).toEqual([]);
    });

    it("has no extra entries beyond EventType", () => {
      const extra = Object.keys(EmbedTemplatePlaceholders).filter(
        (key) => !allEventTypes.includes(key as (typeof allEventTypes)[number]),
      );
      expect(
        extra,
        `Extra keys in EmbedTemplatePlaceholders: ${extra.join(", ")}`,
      ).toEqual([]);
    });
  });

  describe("eventNames (main.json)", () => {
    it("has a name for every EventType", () => {
      const missing = allEventTypes.filter(
        (eventType) => !(eventType in main.eventNames),
      );
      expect(missing, `Missing from eventNames: ${missing.join(", ")}`).toEqual(
        [],
      );
    });

    it("has no extra entries beyond EventType", () => {
      const extra = Object.keys(main.eventNames).filter(
        (key) => !allEventTypes.includes(key as (typeof allEventTypes)[number]),
      );
      expect(extra, `Extra keys in eventNames: ${extra.join(", ")}`).toEqual(
        [],
      );
    });
  });

  describe("baseTemplates (baseTemplates.json)", () => {
    it("has a template for every EventType", () => {
      const missing = allEventTypes.filter(
        (eventType) => !(eventType in baseTemplates),
      );
      expect(
        missing,
        `Missing from baseTemplates: ${missing.join(", ")}`,
      ).toEqual([]);
    });

    it("has no extra entries beyond EventType", () => {
      const extra = Object.keys(baseTemplates).filter(
        (key) => !allEventTypes.includes(key as (typeof allEventTypes)[number]),
      );
      expect(extra, `Extra keys in baseTemplates: ${extra.join(", ")}`).toEqual(
        [],
      );
    });

    it("every template is a non-empty array", () => {
      for (const eventType of allEventTypes) {
        const template = (baseTemplates as Record<string, unknown>)[eventType];
        expect(
          Array.isArray(template),
          `${eventType} template is not an array`,
        ).toBe(true);
        expect(
          (template as unknown[]).length,
          `${eventType} template is empty`,
        ).toBeGreaterThan(0);
      }
    });
  });

  describe("template placeholders consistency", () => {
    // LogService always injects these regardless of what's in Constants
    const implicitPlaceholders = new Set([
      "IMG_PUBLIC_URL",
      "GUILD_ID",
      "EXECUTOR_MENTION",
      "EXECUTOR_NAME",
      "EXECUTOR_ID",
      "EXECUTOR_AVATAR",
      "REASON",
      "TARGET_ID",
      "TARGET_NAME",
      "TARGET_MENTION",
      "TARGET_IMAGE_URL",
    ]);

    it("every placeholder used in a template is declared in Constants or injected by LogService", () => {
      const errors: string[] = [];

      for (const eventType of allEventTypes) {
        const template = (baseTemplates as Record<string, unknown>)[eventType];
        if (!template) continue;

        const templateStr = JSON.stringify(template);
        const usedPlaceholders = [...templateStr.matchAll(/\{(\w+)\}/g)].map(
          (m) => m[1],
        );

        const declared = new Set(EmbedTemplatePlaceholders[eventType]);

        for (const placeholder of usedPlaceholders) {
          if (
            placeholder &&
            !declared.has(placeholder) &&
            !implicitPlaceholders.has(placeholder)
          ) {
            errors.push(
              `${eventType}: {${placeholder}} used in template but not declared`,
            );
          }
        }
      }

      expect(errors, errors.join("\n")).toEqual([]);
    });
  });
});
