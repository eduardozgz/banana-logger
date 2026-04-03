import type { AuditLogEvent } from "discord.js";
import { RouteBases } from "discord-api-types/v10";
import { channelMention } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";

const scheduledEventUpdateChangesMap = {
  name: "scheduledEventUpdateName",
  description: "scheduledEventUpdateDescription",
  channel_id: "scheduledEventUpdateChannelId",
  location: "scheduledEventUpdateLocation",
  status: "scheduledEventUpdateStatus",
  entity_type: "scheduledEventUpdateEntityType",
  privacy_level: "scheduledEventUpdatePrivacyLevel",
  image_hash: "scheduledEventUpdateImageHash",
  recurrence_rule: "scheduledEventUpdateRecurrenceRule",
} satisfies ChangeMap;

interface RecurrenceRule {
  start: string;
  end?: string | null;
  frequency: number;
  interval: number;
  by_weekday?: number[] | null;
  by_n_weekday?: { n: number; day: number }[] | null;
  by_month?: number[] | null;
  by_month_day?: number[] | null;
  by_year_day?: number[] | null;
  count?: number | null;
}

const WEEKDAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const FREQUENCY_NAMES: Record<number, string> = {
  0: "Yearly",
  1: "Monthly",
  2: "Weekly",
  3: "Daily",
};

function formatRecurrenceRule(rule: unknown, fallback: string): string {
  if (!rule || typeof rule !== "object") return fallback;
  const r = rule as RecurrenceRule;
  const parts: string[] = [];
  const freq = FREQUENCY_NAMES[r.frequency] ?? `Frequency ${r.frequency}`;
  parts.push(r.interval > 1 ? `Every ${r.interval} ${freq.toLowerCase()}s` : freq);
  if (r.by_weekday?.length) {
    parts.push(
      `on ${r.by_weekday.map((d) => WEEKDAY_NAMES[d] ?? String(d)).join(", ")}`,
    );
  }
  if (r.by_month?.length) {
    parts.push(
      `in ${r.by_month.map((m) => MONTH_NAMES[m - 1] ?? String(m)).join(", ")}`,
    );
  }
  if (r.by_month_day?.length) {
    parts.push(`on day ${r.by_month_day.join(", ")}`);
  }
  return parts.join(" ");
}

const scheduledEventUpdateChangesTransformers = {
  recurrence_rule: (i18n, change) => {
    const fallback = i18n.t("main:eventDataTransformers.common.none");
    return {
      old: formatRecurrenceRule(change.old, fallback),
      new: formatRecurrenceRule(change.new, fallback),
    };
  },
  status: (i18n, change) => {
    const statuses: Record<number, string> = {
      1: i18n.t("main:eventDataTransformers.scheduledEventUpdateStatus.1"),
      2: i18n.t("main:eventDataTransformers.scheduledEventUpdateStatus.2"),
      3: i18n.t("main:eventDataTransformers.scheduledEventUpdateStatus.3"),
      4: i18n.t("main:eventDataTransformers.scheduledEventUpdateStatus.4"),
    };
    return {
      old: statuses[change.old as number] ?? "Unknown",
      new: statuses[change.new as number] ?? "Unknown",
    };
  },
  entity_type: (i18n, change) => {
    const types: Record<number, string> = {
      1: i18n.t("main:eventDataTransformers.scheduledEventUpdateEntityType.1"),
      2: i18n.t("main:eventDataTransformers.scheduledEventUpdateEntityType.2"),
      3: i18n.t("main:eventDataTransformers.scheduledEventUpdateEntityType.3"),
    };
    return {
      old: types[change.old as number] ?? "Unknown",
      new: types[change.new as number] ?? "Unknown",
    };
  },
  privacy_level: (i18n, change) => {
    const levels: Record<number, string> = {
      2: i18n.t(
        "main:eventDataTransformers.scheduledEventUpdatePrivacyLevel.2",
      ),
    };
    return {
      old: levels[change.old as number] ?? "Unknown",
      new: levels[change.new as number] ?? "Unknown",
    };
  },
  channel_id: (i18n, change) => {
    return {
      old: change.old ? channelMention(change.old) : "None",
      new: change.new ? channelMention(change.new) : "None",
    };
  },
  image_hash: (_i18n, change, _guild, target) => {
    const eventId = target && "id" in target ? String(target.id) : null;
    const oldHash = change.old as string | null;
    const newHash = change.new as string | null;

    const oldUrl =
      oldHash && eventId
        ? `${RouteBases.cdn}/guild-events/${eventId}/${oldHash}.png?size=1024`
        : "None";
    const newUrl =
      newHash && eventId
        ? `${RouteBases.cdn}/guild-events/${eventId}/${newHash}.png?size=1024`
        : "None";

    return {
      old: oldUrl,
      new: newUrl,
    };
  },
} satisfies AuditLogChangeTransformers<
  keyof typeof scheduledEventUpdateChangesMap
>;

export const scheduledEventUpdate: CreateGenericAuditLogHandlerOptions<
  typeof scheduledEventUpdateChangesMap,
  AuditLogEvent.GuildScheduledEventUpdate
> = {
  changesMap: scheduledEventUpdateChangesMap,
  detectRelatedChannels: () => [],
  detectRelatedUsers: (auditLogEntry) => [auditLogEntry.executor?.id],
  changesTransformers: scheduledEventUpdateChangesTransformers,
};
