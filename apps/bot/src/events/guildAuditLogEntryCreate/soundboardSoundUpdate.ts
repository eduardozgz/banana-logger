import type { AuditLogEvent } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";

const soundboardSoundUpdateChangesMap = {
  name: "soundboardSoundUpdateName",
  volume: "soundboardSoundUpdateVolume",
  emoji_id: "soundboardSoundUpdateEmojiId",
  emoji_name: "soundboardSoundUpdateEmojiName",
} satisfies ChangeMap;

const soundboardSoundUpdateChangesTransformers = {
  volume: (_i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? `${Math.round(change.old * 100)}%`
          : "Unknown",
      new:
        change.new !== undefined
          ? `${Math.round(change.new * 100)}%`
          : "Unknown",
    };
  },
} satisfies AuditLogChangeTransformers<
  keyof typeof soundboardSoundUpdateChangesMap
>;

export const soundboardSoundUpdate: CreateGenericAuditLogHandlerOptions<
  typeof soundboardSoundUpdateChangesMap,
  AuditLogEvent.SoundboardSoundUpdate
> = {
  changesMap: soundboardSoundUpdateChangesMap,
  detectRelatedChannels: () => [],
  detectRelatedUsers: (auditLogEntry) => [auditLogEntry.executorId],
  changesTransformers: soundboardSoundUpdateChangesTransformers,
};
