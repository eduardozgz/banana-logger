import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

// Onboarding changes don't have typed change keys in discord-api-types.
// Log each change with raw old/new values.
export const onboardingUpdateHandler: Handler<
  AuditLogEvent.OnboardingUpdate
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "onboardingUpdate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
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
