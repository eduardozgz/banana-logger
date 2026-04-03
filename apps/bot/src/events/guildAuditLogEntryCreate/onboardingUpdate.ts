import type { AuditLogEvent } from "discord.js";
import { channelMention } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

function formatOnboardingChanges(
  changes: { key: string; old?: unknown; new?: unknown }[],
  side: "old" | "new",
): string {
  const parts: string[] = [];
  for (const change of changes) {
    const value = change[side];
    if (value === undefined) continue;

    if (
      change.key === "default_channel_ids" ||
      change.key === "channel_ids" ||
      change.key === "prompts"
    ) {
      if (
        change.key === "default_channel_ids" ||
        change.key === "channel_ids"
      ) {
        const ids = Array.isArray(value) ? value : [];
        parts.push(
          `**${change.key}:** ${ids.length > 0 ? ids.map((id) => channelMention(String(id))).join(", ") : "None"}`,
        );
      } else {
        const arr = Array.isArray(value) ? value : [];
        parts.push(`**${change.key}:** ${arr.length} prompt(s)`);
      }
    } else if (typeof value === "boolean") {
      parts.push(`**${change.key}:** ${value ? "Enabled" : "Disabled"}`);
    } else if (typeof value === "string" || typeof value === "number") {
      parts.push(`**${change.key}:** ${value}`);
    } else {
      parts.push(`**${change.key}:** ${JSON.stringify(value)}`);
    }
  }
  return parts.length > 0 ? parts.join("\n") : "None";
}

export const onboardingUpdateHandler: Handler<
  AuditLogEvent.OnboardingUpdate
> = (auditLogEntry, guild, i18n) => {
  LogService.log({
    eventName: "onboardingUpdate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      OLD_VALUE_RAW: formatOnboardingChanges(auditLogEntry.changes, "old"),
      NEW_VALUE_RAW: formatOnboardingChanges(auditLogEntry.changes, "new"),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
