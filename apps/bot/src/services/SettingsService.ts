import type { Guild, GuildTextBasedChannel } from "discord.js";

import type { Settings } from "@bl/db/client";
import { db } from "@bl/db";
import { EventType } from "@bl/db/client";

import { ALL_EVENTS_CHOICE } from "~/Constants";
import { toggleArrayItem } from "~/utils/toggleArrayItem";
import GlobalSettingsService from "./GlobalSettingsService";

export class SettingsService {
  private constructor(
    private settings: Settings,
    private globalSettingsService: GlobalSettingsService,
  ) {}

  /**
   * Read-only accessor: fetches the channel's settings, falling back to an
   * in-memory default WITHOUT writing. The backing row is created lazily on the
   * first actual save (see {@link persist}), so reads never issue a write.
   */
  public static async get(
    channel: GuildTextBasedChannel,
    globalSettingsService?: GlobalSettingsService | Guild,
  ): Promise<SettingsService> {
    const settings = await db.settings.findUnique({
      where: {
        guildId_channelId: {
          guildId: channel.guild.id,
          channelId: channel.id,
        },
      },
    });

    return new SettingsService(
      settings ?? {
        id: "",
        guildId: channel.guild.id,
        channelId: channel.id,
        ignoredChannels: [],
        ignoredUsers: [],
        watchingEvents: [],
        watchChannels: [],
        watchUsers: [],
      },
      globalSettingsService instanceof GlobalSettingsService
        ? globalSettingsService
        : await GlobalSettingsService.get(
            globalSettingsService ?? channel.guild,
          ),
    );
  }

  public static async getByEventName(
    eventType: EventType,
    guild: Guild,
  ): Promise<SettingsService[]> {
    const settings = await db.settings.findMany({
      where: {
        guildId: guild.id,
        watchingEvents: {
          has: eventType,
        },
      },
    });

    // Fast path on the hot logging path: a guild with no channel watching this
    // event does zero further work — crucially, no globalSettings read/write.
    if (settings.length === 0) return [];

    const globalSettings = await GlobalSettingsService.get(guild);

    return settings.map(
      (setting) => new SettingsService(setting, globalSettings),
    );
  }

  private async persist(
    data: Partial<
      Pick<
        Settings,
        | "ignoredChannels"
        | "ignoredUsers"
        | "watchingEvents"
        | "watchChannels"
        | "watchUsers"
      >
    >,
  ): Promise<void> {
    await db.settings.upsert({
      where: {
        guildId_channelId: {
          guildId: this.settings.guildId,
          channelId: this.settings.channelId,
        },
      },
      update: data,
      create: {
        guildId: this.settings.guildId,
        channelId: this.settings.channelId,
        ...data,
      },
    });
  }

  get id() {
    return this.settings.id;
  }

  get channelId() {
    return this.settings.channelId;
  }

  get ignoredChannels() {
    return [
      ...this.settings.ignoredChannels,
      ...this.globalSettingsService.ignoredChannels,
    ];
  }

  async toggleIgnoreChannel(channelId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.ignoredChannels,
      channelId,
    );

    await this.persist({ ignoredChannels: result });

    this.settings.ignoredChannels = result;
    return wasAdded;
  }

  get watchChannels() {
    return [...this.settings.watchChannels];
  }

  async toggleWatchChannel(channelId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.watchChannels,
      channelId,
    );

    await this.persist({ watchChannels: result });

    this.settings.watchChannels = result;
    return wasAdded;
  }

  get ignoredUsers() {
    return [
      ...this.settings.ignoredUsers,
      ...this.globalSettingsService.ignoredUsers,
    ];
  }

  async toggleIgnoreUser(userId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.ignoredUsers,
      userId,
    );

    await this.persist({ ignoredUsers: result });

    this.settings.ignoredUsers = result;
    return wasAdded;
  }

  get watchUsers() {
    return [...this.settings.watchUsers];
  }

  async toggleWatchUser(userId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.watchUsers,
      userId,
    );

    await this.persist({ watchUsers: result });

    this.settings.watchUsers = result;
    return wasAdded;
  }

  get events(): EventType[] {
    return [...this.settings.watchingEvents];
  }

  async toggleEvents(events: EventType[]): Promise<boolean> {
    const allPresent = events.every((e) =>
      this.settings.watchingEvents.includes(e),
    );

    let updated: EventType[];

    if (allPresent) {
      updated = this.settings.watchingEvents.filter((e) => !events.includes(e));
    } else {
      const toAdd = events.filter(
        (e) => !this.settings.watchingEvents.includes(e),
      );
      updated = [...this.settings.watchingEvents, ...toAdd];
    }

    await this.persist({ watchingEvents: updated });

    this.settings.watchingEvents = updated;
    return !allPresent;
  }

  async toggleEvent(
    event: typeof ALL_EVENTS_CHOICE | EventType,
  ): Promise<boolean> {
    let wasAdded: boolean;
    let updated: EventType[];

    if (event === ALL_EVENTS_CHOICE) {
      const allEvents = Object.values(EventType);

      if (this.events.length === allEvents.length) {
        wasAdded = false;
        updated = [];
      } else {
        wasAdded = true;
        updated = allEvents;
      }
    } else {
      const [result, found] = toggleArrayItem(
        this.settings.watchingEvents,
        event,
      );

      updated = result;
      wasAdded = found;
    }

    await this.persist({ watchingEvents: updated });

    this.settings.watchingEvents = updated;
    return wasAdded;
  }
}

export default SettingsService;
