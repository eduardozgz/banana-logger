import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import { Webhook } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";
import { displayAvatarUrl } from "~/utils/displayAvatarUrl";

const webhookUpdateChangesMap = {
  name: "webhookUpdateName",
  avatar_hash: "webhookUpdateAvatar",
  channel_id: "webhookUpdateChannel",
} satisfies ChangeMap;

const webhookUpdateChangesTransformers = {
  avatar_hash: (_i18n, change, _guild, target) => {
    assert(target instanceof Webhook);
    return {
      old: displayAvatarUrl({
        id: target.id,
        discriminator: "0",
        avatarHash: change.old,
      }),
      new: displayAvatarUrl({
        id: target.id,
        discriminator: "0",
        avatarHash: change.new,
      }),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof webhookUpdateChangesMap>;

export const webhookUpdate: CreateGenericAuditLogHandlerOptions<
  typeof webhookUpdateChangesMap,
  AuditLogEvent.WebhookUpdate
> = {
  changesMap: webhookUpdateChangesMap,
  detectRelatedChannels: (auditLogEntry) => [auditLogEntry.target.channel?.id],
  detectRelatedUsers: (auditLogEntry) => [auditLogEntry.executorId],
  changesTransformers: webhookUpdateChangesTransformers,
};
