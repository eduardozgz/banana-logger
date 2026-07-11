import type { Guild } from "discord.js";

import type { GlobalSettings } from "@bl/db/client";
import { db } from "@bl/db";

import { toggleArrayItem } from "~/utils/toggleArrayItem";

export class GlobalSettingsService {
  private constructor(private settings: GlobalSettings) {}

  /**
   * Read-only accessor: fetches the guild's global settings, falling back to an
   * in-memory default WITHOUT writing. The backing row is created lazily on the
   * first actual save (see {@link persist}), so reads never issue a write.
   */
  public static async get(guild: Guild): Promise<GlobalSettingsService> {
    const settings = await db.globalSettings.findUnique({
      where: { guildId: guild.id },
    });

    return new GlobalSettingsService(
      settings ?? {
        id: "",
        guildId: guild.id,
        ignoredChannels: [],
        ignoredUsers: [],
      },
    );
  }

  private async persist(
    data: Partial<Pick<GlobalSettings, "ignoredChannels" | "ignoredUsers">>,
  ): Promise<void> {
    await db.globalSettings.upsert({
      where: { guildId: this.settings.guildId },
      update: data,
      create: { guildId: this.settings.guildId, ...data },
    });
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

    await this.persist({ ignoredChannels: result });

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

    await this.persist({ ignoredUsers: result });

    this.settings.ignoredUsers = result;
    return wasAdded;
  }
}

export default GlobalSettingsService;
