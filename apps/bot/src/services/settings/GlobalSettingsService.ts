import type { Guild } from "discord.js";
import { db } from "@bl/db";
import { publishConfigInvalidation } from "@bl/redis";

import type { GlobalSettings } from "@bl/db/client";

import { toggleArrayItem } from "~/utils/toggleArrayItem";
import { getGuildConfig, invalidateGuildConfig } from "./configCache";

export class GlobalSettingsService {
  private constructor(private settings: GlobalSettings) {}

  /** Build from a cached row (or the in-memory default when absent). */
  public static fromRow(
    guildId: string,
    row: GlobalSettings | null,
  ): GlobalSettingsService {
    return new GlobalSettingsService(
      row
        ? { ...row }
        : { id: "", guildId, ignoredChannels: [], ignoredUsers: [] },
    );
  }

  /**
   * Read-only accessor: reads the guild's global settings from the config cache,
   * falling back to an in-memory default WITHOUT writing. The backing row is
   * created lazily on the first actual save (see {@link persist}), so reads
   * never issue a write.
   */
  public static async get(guild: Guild): Promise<GlobalSettingsService> {
    const { globalSettings } = await getGuildConfig(guild.id);
    return GlobalSettingsService.fromRow(guild.id, globalSettings);
  }

  private async persist(
    data: Partial<Pick<GlobalSettings, "ignoredChannels" | "ignoredUsers">>,
  ): Promise<void> {
    await db.globalSettings.patch(this.settings.guildId, data);
    invalidateGuildConfig(this.settings.guildId);
    await publishConfigInvalidation(this.settings.guildId);
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
