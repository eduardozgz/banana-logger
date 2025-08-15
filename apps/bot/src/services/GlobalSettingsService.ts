import type { Guild } from "discord.js";
import _ from "lodash";

import type { GlobalSettings } from "@/db/client";
import { db } from "@/db";

import { toggleArrayItem } from "~/utils/toggleArrayItem";

export class GlobalSettingsService {
  private constructor(private settings: GlobalSettings) {}

  public static async init(guild: Guild): Promise<GlobalSettingsService> {
    const settings = await db.globalSettings.upsert({
      where: { guildId: guild.id },
      update: {},
      create: { guildId: guild.id },
    });

    return new GlobalSettingsService(settings);
  }

  get id() {
    return this.settings.id;
  }

  get ignoredChannels() {
    return [...this.settings.ignoredChannels];
  }

  async toggleIgnoreChannel(channelId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.ignoredChannels,
      channelId,
    );

    await db.globalSettings.update({
      where: { id: this.settings.id },
      data: { ignoredChannels: result },
    });

    this.settings.ignoredChannels = result;
    return wasAdded;
  }

  get ignoredUsers() {
    return [...this.settings.ignoredUsers];
  }

  async toggleIgnoreUser(userId: string): Promise<boolean> {
    const [result, wasAdded] = toggleArrayItem(
      this.settings.ignoredUsers,
      userId,
    );

    await db.globalSettings.update({
      where: { id: this.settings.id },
      data: { ignoredUsers: result },
    });

    this.settings.ignoredUsers = result;
    return wasAdded;
  }
}

export default GlobalSettingsService;
