import type { AuditLogEvent } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";

const emojiUpdateChangesMap = {
  name: "emojiUpdateName",
  // TODO figure out other properties, which probably arent easy to figure out outside of the USA
} satisfies ChangeMap;

const emojiUpdateChangesTransformers = {} satisfies AuditLogChangeTransformers<
  keyof typeof emojiUpdateChangesMap
>;

export const emojiUpdate: CreateGenericAuditLogHandlerOptions<
  typeof emojiUpdateChangesMap,
  AuditLogEvent.EmojiUpdate
> = {
  changesMap: emojiUpdateChangesMap,
  detectRelatedChannels: () => [],
  detectRelatedUsers: (auditLogEntry) => {
    return [auditLogEntry.executorId];
  },
  changesTransformers: emojiUpdateChangesTransformers,
};
