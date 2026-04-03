import type { AuditLogEvent } from "discord.js";
import { channelMention } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

interface PromptOption {
  title?: string;
  channel_ids?: string[];
  role_ids?: string[];
}

function formatPromptChanges(
  changes: { key: string; old?: unknown; new?: unknown }[],
  side: "old" | "new",
): string {
  const parts: string[] = [];
  for (const change of changes) {
    const value = change[side];
    if (value === undefined) continue;

    if (change.key === "options" && Array.isArray(value)) {
      const options = value as PromptOption[];
      const formatted = options
        .map((o) => {
          const optParts = [o.title ?? "Untitled"];
          if (o.channel_ids?.length)
            optParts.push(
              `channels: ${o.channel_ids.map((id) => channelMention(id)).join(", ")}`,
            );
          if (o.role_ids?.length)
            optParts.push(`${o.role_ids.length} role(s)`);
          return optParts.join(" — ");
        })
        .join("\n");
      parts.push(`**options:**\n${formatted}`);
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

export const onboardingPromptUpdateHandler: Handler<
  AuditLogEvent.OnboardingPromptUpdate
> = (auditLogEntry, guild, i18n) => {
  LogService.log({
    eventName: "onboardingPromptUpdate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      OLD_VALUE_RAW: formatPromptChanges(auditLogEntry.changes, "old"),
      NEW_VALUE_RAW: formatPromptChanges(auditLogEntry.changes, "new"),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
