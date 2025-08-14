import { setTimeout as sleep } from "node:timers/promises";
import type { AuditLogEvent } from "discord-api-types/v10";
import type { Guild, GuildAuditLogsEntry, Snowflake } from "discord.js";

import type { Deferred } from "~/utils/createDeferred";
import { createDeferred } from "~/utils/createDeferred";

// Remove this type and enjoy your vscode freezing, but if you figure out how to fix it, please do so.
type AvoidVSCFreezing = never;

interface AwaitingEvent<T extends AuditLogEvent> {
  guild: Guild;
  type: T;
  executorId: Snowflake | null;
  targetId: Snowflake | null;
  deferred: Deferred<GuildAuditLogsEntry<T> | null>;
}

type FetchOptions<T extends AuditLogEvent> =
  | { type: T; guild: Guild; targetId: Snowflake }
  | { type: T; guild: Guild; executorId: Snowflake };

export class AuditLogCollector {
  private static lastGuildEntrySnowflake = new Map<Snowflake, Snowflake>();
  private static pendingRequests = new Map<
    Snowflake,
    {
      guild: Guild;
      awaitingEvents: AwaitingEvent<AuditLogEvent>[];
    }
  >();

  public static get<T extends AuditLogEvent>(
    options: FetchOptions<T>,
  ): Promise<GuildAuditLogsEntry<T> | null> {
    const deferred = createDeferred<unknown>();
    const { guild } = options;

    const awaitingEvent: AwaitingEvent<T> = {
      guild,
      type: options.type,
      executorId: "executorId" in options ? options.executorId : null,
      targetId: "targetId" in options ? options.targetId : null,
      deferred: deferred as AvoidVSCFreezing,
    };

    const pendingGuildRequests = AuditLogCollector.pendingRequests.get(
      guild.id,
    );

    if (pendingGuildRequests) {
      pendingGuildRequests.awaitingEvents.push(
        awaitingEvent as AvoidVSCFreezing,
      );
    } else {
      AuditLogCollector.pendingRequests.set(guild.id, {
        guild,
        awaitingEvents: [awaitingEvent as AvoidVSCFreezing],
      });
    }

    // Cleanup on settle to avoid memory leaks (and delete empty guild entry)
    void deferred.promise.finally(() => {
      const req = AuditLogCollector.pendingRequests.get(guild.id);

      if (!req) return;

      const idx = req.awaitingEvents.indexOf(awaitingEvent as AvoidVSCFreezing);

      if (idx !== -1) req.awaitingEvents.splice(idx, 1);

      if (req.awaitingEvents.length === 0) {
        AuditLogCollector.pendingRequests.delete(guild.id);
      }
    });

    // Safety timeout to auto-resolve if no match found
    setTimeout(() => deferred.resolve(null), 5 * 60 * 1000);

    return deferred.promise as Promise<GuildAuditLogsEntry<T> | null>;
  }

  private static fetchLoopStarted = false;

  public static async startFetchLoop() {
    if (AuditLogCollector.fetchLoopStarted) return;
    AuditLogCollector.fetchLoopStarted = true;

    while (true) {
      await sleep(1000);
      try {
        await AuditLogCollector.processPendingGuilds();
      } catch {
        // keep the loop alive on unexpected errors
      }
    }
  }

  private static async processPendingGuilds() {
    await Promise.allSettled(
      [...AuditLogCollector.pendingRequests].map((pendingRequest) =>
        AuditLogCollector.processPendingGuild(pendingRequest),
      ),
    );
  }

  private static async processPendingGuild([
    guildId,
    { guild, awaitingEvents },
  ]: [
    Snowflake,
    { guild: Guild; awaitingEvents: AwaitingEvent<AuditLogEvent>[] },
  ]) {
    if (!awaitingEvents.length) return;

    const lastProcessedGuildLogEntrySnowflake =
      AuditLogCollector.lastGuildEntrySnowflake.get(guildId);

    // Build indexes for O(1) matching by (type + executorId) and (type + targetId)
    const byExecutor = new Map<
      AuditLogEvent,
      Map<Snowflake, AwaitingEvent<AuditLogEvent>[]>
    >();
    const byTarget = new Map<
      AuditLogEvent,
      Map<Snowflake, AwaitingEvent<AuditLogEvent>[]>
    >();

    for (const evt of awaitingEvents) {
      const type = evt.type;
      if (evt.executorId) {
        let typeMap = byExecutor.get(type);
        if (!typeMap) {
          typeMap = new Map();
          byExecutor.set(type, typeMap);
        }
        const arr = typeMap.get(evt.executorId) ?? [];
        arr.push(evt);
        typeMap.set(evt.executorId, arr);
      } else if (evt.targetId) {
        let typeMap = byTarget.get(type);
        if (!typeMap) {
          typeMap = new Map();
          byTarget.set(type, typeMap);
        }
        const arr = typeMap.get(evt.targetId) ?? [];
        arr.push(evt);
        typeMap.set(evt.targetId, arr);
      }
    }

    const hasPending = () => {
      for (const m of [byExecutor, byTarget]) {
        for (const [, idMap] of m) {
          for (const [, arr] of idMap) {
            if (arr.length > 0) return true;
          }
        }
      }
      return false;
    };

    let afterSnowflake = lastProcessedGuildLogEntrySnowflake;
    let overallMaxSnowflake: Snowflake | undefined;

    // Paginate while pages are full and there are still pending matches
    while (true) {
      const auditLogs = await guild
        .fetchAuditLogs({
          after: afterSnowflake,
          limit: 100,
        })
        .catch((error) => {
          guild.client.botInstanceOptions.logger
            .child({ component: "AuditLogCollector", guild: guild.id })
            .error(error);
        });

      if (!auditLogs) break;

      const keys = [...auditLogs.entries.keys()];
      if (keys.length === 0) break;

      const firstKey = keys[0];
      if (firstKey == null) break;
      let pageMax: Snowflake = firstKey;
      for (let i = 1; i < keys.length; i++) {
        const key = keys[i];
        if (key == null) continue;
        if (BigInt(key) > BigInt(pageMax)) pageMax = key;
      }

      if (!overallMaxSnowflake) {
        overallMaxSnowflake = pageMax;
      } else if (BigInt(pageMax) > BigInt(overallMaxSnowflake)) {
        overallMaxSnowflake = pageMax;
      }

      for (const [, entry] of auditLogs.entries) {
        const type = entry.action;
        if (!byExecutor.has(type) && !byTarget.has(type)) continue;

        if (entry.executorId) {
          const typeMap = byExecutor.get(type);
          if (typeMap?.size) {
            const arr = typeMap.get(entry.executorId);
            if (arr?.length) {
              const evt = arr.shift();
              if (evt) evt.deferred.resolve(entry);
              if (arr.length === 0) {
                typeMap.delete(entry.executorId);
              } else {
                typeMap.set(entry.executorId, arr);
              }
            }
          }
        }

        if (entry.targetId) {
          const typeMap = byTarget.get(type);
          const targetId = entry.targetId;
          if (typeMap?.size) {
            const arr = typeMap.get(targetId);
            if (arr?.length) {
              const evt = arr.shift();
              if (evt) evt.deferred.resolve(entry);
              if (arr.length === 0) {
                typeMap.delete(targetId);
              } else {
                typeMap.set(targetId, arr);
              }
            }
          }
        }
      }

      const pageIsFull = auditLogs.entries.size === 100;
      const stillPending = hasPending();
      if (pageIsFull && stillPending) {
        afterSnowflake = pageMax;
        continue;
      }
      break;
    }

    if (overallMaxSnowflake) {
      AuditLogCollector.lastGuildEntrySnowflake.set(
        guild.id,
        overallMaxSnowflake,
      );
    }
  }
}

void AuditLogCollector.startFetchLoop();
