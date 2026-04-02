import { describe, expect, it } from "vitest";
import { z } from "zod/v4";

// Replicate the schema from autoModAction.ts to test it in isolation
const AutoModExtraSchema = z.object({
  autoModerationRuleName: z.string(),
  autoModerationRuleTriggerType: z.enum(["1", "3", "4", "5", "6"]),
  channel: z.object({ id: z.string() }),
});

describe("AutoMod extra schema validation", () => {
  it("accepts valid BlockMessage extra", () => {
    const result = AutoModExtraSchema.safeParse({
      autoModerationRuleName: "No spam",
      autoModerationRuleTriggerType: "1",
      channel: { id: "123456789" },
    });
    expect(result.success).toBe(true);
  });

  it("accepts all known trigger types", () => {
    for (const type of ["1", "3", "4", "5", "6"]) {
      const result = AutoModExtraSchema.safeParse({
        autoModerationRuleName: "Rule",
        autoModerationRuleTriggerType: type,
        channel: { id: "123" },
      });
      expect(result.success, `trigger type ${type} should be valid`).toBe(true);
    }
  });

  it("rejects unknown trigger type", () => {
    const result = AutoModExtraSchema.safeParse({
      autoModerationRuleName: "Rule",
      autoModerationRuleTriggerType: "99",
      channel: { id: "123" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects null extra (QuarantineUser untyped case)", () => {
    const result = AutoModExtraSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = AutoModExtraSchema.safeParse({
      autoModerationRuleName: "Rule",
    });
    expect(result.success).toBe(false);
  });

  it("accepts extra fields (forward compatible)", () => {
    const result = AutoModExtraSchema.safeParse({
      autoModerationRuleName: "Rule",
      autoModerationRuleTriggerType: "1",
      channel: { id: "123", name: "general" },
      someNewField: "value",
    });
    expect(result.success).toBe(true);
  });
});
