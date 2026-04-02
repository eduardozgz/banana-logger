import type { AuditLogEvent } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";

const stickerUpdateChangesMap = {
  name: "stickerUpdateName",
  description: "stickerUpdateDescription",
  tags: "stickerUpdateTags",
} satisfies ChangeMap;

const stickerUpdateChangesTransformers = {
  // All use default transformer (string values)
} satisfies AuditLogChangeTransformers<keyof typeof stickerUpdateChangesMap>;

export const stickerUpdate: CreateGenericAuditLogHandlerOptions<
  typeof stickerUpdateChangesMap,
  AuditLogEvent.StickerUpdate
> = {
  changesMap: stickerUpdateChangesMap,
  detectRelatedChannels: () => [],
  detectRelatedUsers: (auditLogEntry) => [auditLogEntry.executor?.id],
  changesTransformers: stickerUpdateChangesTransformers,
};
