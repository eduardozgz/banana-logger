import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

// Simple handlers for events that only need to log that the action happened.
// No target object, no change keys - just executor and reason.

export const onboardingCreateHandler: Handler<
  AuditLogEvent.OnboardingCreate
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "onboardingCreate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};

export const homeSettingsCreateHandler: Handler<
  AuditLogEvent.HomeSettingsCreate
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "homeSettingsCreate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};

export const homeSettingsUpdateHandler: Handler<
  AuditLogEvent.HomeSettingsUpdate
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "homeSettingsUpdate",
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

export const creatorMonetizationRequestCreatedHandler: Handler<
  AuditLogEvent.CreatorMonetizationRequestCreated
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "creatorMonetizationRequestCreated",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};

export const creatorMonetizationTermsAcceptedHandler: Handler<
  AuditLogEvent.CreatorMonetizationTermsAccepted
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "creatorMonetizationTermsAccepted",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
