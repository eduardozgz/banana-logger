import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
  RelatedChannels,
} from ".";

const roleUpdateChangesMap = {
  name: "roleUpdateName",
  // TODO preview color change
  color: "roleUpdateColor",
  hoist: "roleUpdateHoist",
  mentionable: "roleUpdateMentionable",
  // TODO preview permissions change
  permissions: "roleUpdatePermissions",
  // TODO log and preview style
  // TODO log icon change
} satisfies ChangeMap;

const roleUpdateChangesWithRelatedChannels = [] satisfies RelatedChannels<
  typeof roleUpdateChangesMap
>;

const roleUpdateChangesTransformers = {
  color: (i18n, change) => {
    const oldColor = change.old
      ? `#${change.old.toString(16).padStart(6, "0")}`
      : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE");
    const newColor = change.new
      ? `#${change.new.toString(16).padStart(6, "0")}`
      : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE");
    return {
      old: oldColor,
      new: newColor,
    };
  },
  hoist: (i18n, change) => {
    return {
      old: i18n.t(`main:eventDataTransformers.common.${!!change.old}`),
      new: i18n.t(`main:eventDataTransformers.common.${!!change.new}`),
    };
  },
  mentionable: (i18n, change) => {
    return {
      old: i18n.t(
        `main:eventDataTransformers.roleUpdateMentionable.${!!change.old}`,
      ),
      new: i18n.t(
        `main:eventDataTransformers.roleUpdateMentionable.${!!change.new}`,
      ),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof roleUpdateChangesMap>;

export const roleUpdate: CreateGenericAuditLogHandlerOptions<
  typeof roleUpdateChangesMap
> = {
  changesMap: roleUpdateChangesMap,
  changesWithRelatedChannels: roleUpdateChangesWithRelatedChannels,
  changesTransformers: roleUpdateChangesTransformers,
};
