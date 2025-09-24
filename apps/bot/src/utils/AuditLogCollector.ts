/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-const */
import assert from "node:assert";
import type {
  AuditLogEvent,
  Client,
  Guild,
  GuildAuditLogsEntry,
  Snowflake,
} from "discord.js";
import { Events } from "discord.js";

type ResolvedEntry<E extends AuditLogEvent = AuditLogEvent> =
  GuildAuditLogsEntry<E> | null;

interface TryCallbacks<E extends AuditLogEvent = AuditLogEvent> {
  filter: (auditLogEntry: GuildAuditLogsEntry<E>) => boolean;
  resolve: (result: ResolvedEntry<E>) => void;
}

type AuditLogCollectorCallbacks<E extends AuditLogEvent = AuditLogEvent> = Map<
  Snowflake,
  Map<E, Set<TryCallbacks<E>>>
>;

interface TryToGetOptions<E extends AuditLogEvent = AuditLogEvent> {
  guild: Guild;
  event: E;
  filter: (auditLogEntry: GuildAuditLogsEntry<E>) => boolean;
  timeout?: number;
}

interface Resolvable {
  entry: GuildAuditLogsEntry<AuditLogEvent>;
  remainingResolves: number;
}

type GuildAuditLogResolvableEntries = Map<Snowflake, Resolvable[]>;

export class AuditLogCollector {
  private static initialized = false;
  private static guildAuditLogResolvableEntries: GuildAuditLogResolvableEntries =
    new Map();
  private static tryToGetCallbacks: AuditLogCollectorCallbacks = new Map();

  static initialize(client: Client) {
    if (AuditLogCollector.initialized) {
      throw new Error("AuditLogCollector already initialized");
    }

    AuditLogCollector.initialized = true;

    client.on(
      Events.GuildAuditLogEntryCreate,
      AuditLogCollector.handleAuditLogEntryCreate,
    );

    setInterval(() => {
      AuditLogCollector.deleteOldEntries();
    }, 60 * 1000);
  }
  static tryToGet<E extends AuditLogEvent, R = ResolvedEntry<E>>({
    guild,
    event,
    filter,
    timeout: timeoutTime = 10000,
  }: TryToGetOptions<E>): Promise<R> {
    return new Promise<R>((resolve) => {
      let timeout: NodeJS.Timeout;
      let tryCallbacks: TryCallbacks<E>;

      const callback = (value: R) => {
        AuditLogCollector.unregisterCallbacks(
          guild,
          event,
          tryCallbacks as TryCallbacks,
        );
        clearTimeout(timeout);
        resolve(value);
      };

      timeout = setTimeout(() => {
        callback(null as R);
      }, timeoutTime);

      tryCallbacks = {
        filter,
        resolve: callback as (result: ResolvedEntry<E>) => void,
      };

      AuditLogCollector.registerCallbacks(
        guild,
        event,
        tryCallbacks as TryCallbacks,
      );

      AuditLogCollector.tryToResolveFromCallbacks(
        tryCallbacks as TryCallbacks,
        guild,
      );
    });
  }

  static handleAuditLogEntryCreate(
    auditLogEntry: GuildAuditLogsEntry<AuditLogEvent>,
    guild: Guild,
  ) {
    // TODO: message delete entry doesnt get here sometimes
    const newEntry: Resolvable = {
      entry: auditLogEntry,
      remainingResolves:
        auditLogEntry.extra && "count" in auditLogEntry.extra
          ? auditLogEntry.extra.count
          : 1,
    };

    let guildAuditLogEntries =
      AuditLogCollector.guildAuditLogResolvableEntries.get(guild.id);

    if (!guildAuditLogEntries) {
      guildAuditLogEntries = [];
      AuditLogCollector.guildAuditLogResolvableEntries.set(
        guild.id,
        guildAuditLogEntries,
      );
    }

    guildAuditLogEntries.push(newEntry);

    AuditLogCollector.tryToResolveFromEntry(newEntry, guild);
  }

  private static tryToResolveFromEntry(resolvable: Resolvable, guild: Guild) {
    const guildFilters = AuditLogCollector.tryToGetCallbacks.get(guild.id);
    const actionCallbacks = guildFilters?.get(resolvable.entry.action);

    if (!actionCallbacks) return;

    let matched = false as boolean;

    actionCallbacks.forEach((callback) => {
      if (callback.filter(resolvable.entry)) {
        callback.resolve(resolvable.entry);
        matched = true;
      }
    });

    if (matched) {
      AuditLogCollector.popEntry(guild, resolvable);
    }
  }

  private static tryToResolveFromCallbacks(
    tryCallbacks: TryCallbacks,
    guild: Guild,
  ) {
    const auditLogEntries =
      AuditLogCollector.guildAuditLogResolvableEntries.get(guild.id);
    if (!auditLogEntries) return;

    // Iterate from newest to oldest
    for (let i = auditLogEntries.length - 1; i >= 0; i--) {
      const resolvable = auditLogEntries[i];

      assert(resolvable);

      if (tryCallbacks.filter(resolvable.entry)) {
        tryCallbacks.resolve(resolvable.entry);
        AuditLogCollector.popEntry(guild, resolvable);
        return; // Stop after first match
      }
    }
  }

  private static unregisterCallbacks(
    guild: Guild,
    event: AuditLogEvent,
    tryCallbacks: TryCallbacks,
  ) {
    const guildFilters = AuditLogCollector.tryToGetCallbacks.get(guild.id);

    if (!guildFilters) {
      return;
    }

    guildFilters.get(event)?.delete(tryCallbacks);

    if (guildFilters.get(event)?.size === 0) {
      guildFilters.delete(event);
    }

    if (guildFilters.size === 0) {
      AuditLogCollector.tryToGetCallbacks.delete(guild.id);
    }
  }

  private static registerCallbacks(
    guild: Guild,
    event: AuditLogEvent,
    tryCallbacks: TryCallbacks,
  ) {
    let guildFilters = AuditLogCollector.tryToGetCallbacks.get(guild.id);

    if (!guildFilters) {
      guildFilters = new Map();
      AuditLogCollector.tryToGetCallbacks.set(guild.id, guildFilters);
    }

    let callbacks = guildFilters.get(event);

    if (!callbacks) {
      callbacks = new Set([tryCallbacks]);
      guildFilters.set(event, callbacks);
    }

    callbacks.add(tryCallbacks);
  }

  private static deleteOldEntries() {
    AuditLogCollector.guildAuditLogResolvableEntries.forEach(
      (entries, guildId) => {
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
        entries = entries.filter(
          (resolvable) => resolvable.entry.createdTimestamp > fiveMinutesAgo,
        );
        AuditLogCollector.guildAuditLogResolvableEntries.set(guildId, entries);
      },
    );
  }

  private static popEntry(guild: Guild, resolvable: Resolvable) {
    const entries = AuditLogCollector.guildAuditLogResolvableEntries.get(
      guild.id,
    );
    if (!entries) {
      return;
    }
    const index = entries.findIndex(
      (resolvable) => resolvable.entry.id === resolvable.entry.id,
    );

    resolvable.remainingResolves--;

    if (index > -1 && resolvable.remainingResolves <= 0) {
      entries.splice(index, 1);
    }
  }
}
