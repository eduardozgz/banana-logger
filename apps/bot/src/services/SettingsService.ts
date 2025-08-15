import type { Guild, GuildTextBasedChannel } from "discord.js";

import type { Settings } from "@/db/client";
import { db } from "@/db";
import { EventType } from "@/db/client";

import { ALL_EVENTS_CHOICE } from "~/Constants";
import { toggleArrayItem } from "~/utils/toggleArrayItem";
import GlobalSettingsService from "./GlobalSettingsService";

export class SettingsService {
  private constructor(
    private settings: Settings,
    private globalSettingsService: GlobalSettingsService,
  ) {}

  public static async init(
    channel: GuildTextBasedChannel,
    globalSettingsService?: GlobalSettingsService | Guild,
  ): Promise<SettingsService> {
    const settings = await db.settings.upsert({
      where: {
        guildId_channelId: {
          guildId: channel.guild.id,
          channelId: channel.id,
        },
      },
      update: {},
      create: {
        guildId: channel.guild.id,
        channelId: channel.id,
      },
    });

    return new SettingsService(
      settings,
      globalSettingsService instanceof GlobalSettingsService
        ? globalSettingsService
        : await GlobalSettingsService.init(
            globalSettingsService ?? channel.guild,
          ),
    );
  }

  public static async getByEventName(
    eventType: EventType,
    guild: Guild,
  ): Promise<SettingsService[]> {
    const globalSettings = await GlobalSettingsService.init(guild);
    const settings = await db.settings.findMany({
      where: {
        guildId: guild.id,
        watchingEvents: {
          has: eventType,
        },
      },
    });

    return settings.map(
      (setting) => new SettingsService(setting, globalSettings),
    );
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

    await db.settings.update({
      where: { id: this.settings.id },
      data: { ignoredChannels: result },
    });

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

    await db.settings.update({
      where: { id: this.settings.id },
      data: { watchChannels: result },
    });

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

    await db.settings.update({
      where: { id: this.settings.id },
      data: { ignoredUsers: result },
    });

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

    await db.settings.update({
      where: { id: this.settings.id },
      data: { watchUsers: result },
    });

    this.settings.watchUsers = result;
    return wasAdded;
  }

  get events(): EventType[] {
    return [...this.settings.watchingEvents];
  }

  async toggleEvent(
    event: typeof ALL_EVENTS_CHOICE | EventType,
  ): Promise<boolean> {
    let wasAdded: boolean;

    if (event === ALL_EVENTS_CHOICE) {
      const allEvents = Object.values(EventType);

      if (this.events.length === allEvents.length) {
        wasAdded = true;

        await db.settings.update({
          where: { id: this.settings.id },
          data: { watchingEvents: [] },
        });

        this.settings.watchingEvents = [];
      } else {
        wasAdded = false;

        await db.settings.update({
          where: { id: this.settings.id },
          data: { watchingEvents: allEvents },
        });

        this.settings.watchingEvents = allEvents;
      }
    } else {
      const [result, found] = toggleArrayItem(
        this.settings.watchingEvents,
        event,
      );

      await db.settings.update({
        where: { id: this.settings.id },
        data: { watchingEvents: result },
      });

      this.settings.watchingEvents = result;
      wasAdded = found;
    }

    return wasAdded;
  }
}

export default SettingsService;
