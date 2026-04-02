import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

// Onboarding prompt changes don't have typed change keys in discord-api-types.
// Log each change with raw old/new values.
export const onboardingPromptUpdateHandler: Handler<
  AuditLogEvent.OnboardingPromptUpdate
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "onboardingPromptUpdate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      OLD_VALUE_RAW: JSON.stringify(
        auditLogEntry.changes.map((c) => ({ [c.key]: c.old })),
      ),
      NEW_VALUE_RAW: JSON.stringify(
        auditLogEntry.changes.map((c) => ({ [c.key]: c.new })),
      ),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
