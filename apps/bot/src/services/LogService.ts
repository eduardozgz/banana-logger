import type { Guild, GuildTextBasedChannel } from "discord.js";
import { EmbedBuilder } from "discord.js";
import _ from "lodash";

import type { EventType } from "@/db/client";
import { initI18n } from "@/i18n";

import type { EmbedTemplatePlaceholders } from "~/Constants";
import { deepReplaceAll } from "~/utils/deepReplaceAll";
import SettingsService from "./SettingsService";

type LogData<E extends EventType> = Record<
  (typeof EmbedTemplatePlaceholders)[E][number],
  string
>;

interface SetupOptions<E extends EventType> {
  eventName: E;
  guild: Guild;
  relatedChannels: string[];
  relatedUsers: string[];
  data: LogData<E>;
}

export class LogService {
  static async log<E extends EventType>({
    eventName,
    guild,
    relatedChannels,
    relatedUsers,
    data,
  }: SetupOptions<E>) {
    try {
      for (const serviceSettings of await SettingsService.getByEventName(
        eventName,
        guild,
      )) {
        const i18n = await initI18n(guild.preferredLocale);

        const ignoredChannels = serviceSettings.ignoredChannels;
        _.pull(ignoredChannels, ...serviceSettings.watchChannels);
        const ignoredUsers = serviceSettings.ignoredUsers;
        _.pull(ignoredUsers, ...serviceSettings.watchUsers);

        ignoredUsers.push(guild.client.user.id);
        ignoredChannels.push(serviceSettings.id);

        if (
          ignoredChannels.some((ignoredChannel) =>
            relatedChannels.includes(ignoredChannel),
          ) ||
          ignoredUsers.some((ignoredUser) => relatedUsers.includes(ignoredUser))
        ) {
          continue;
        }

        let template = serviceSettings.getTemplate(eventName);

        // Fall back to base template if no custom template is set
        // Typescript will fail to typecheck this when eventName is "E extend EventType" instead of "EventType"
        const castedEventName: EventType = eventName;
        template ??= i18n.t(`baseTemplates:${castedEventName}`, {
          returnObjects: true,
        });

        // Process template variables
        for (const [key, value] of Object.entries(data)) {
          template = deepReplaceAll(template, `{${key}}`, value as string);
        }

        const channel = (await guild.channels.fetch(
          serviceSettings.id,
        )) as GuildTextBasedChannel;

        const embed = new EmbedBuilder(template);
        await LogService.sendLog(channel, embed);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // TODO: Implement logging queue for batching/rate limiting
  private static logQueue: unknown[] = [];
  private static async sendLog(
    channel: GuildTextBasedChannel,
    embed: EmbedBuilder,
  ) {
    await channel.send({ embeds: [embed] });
  }
}
