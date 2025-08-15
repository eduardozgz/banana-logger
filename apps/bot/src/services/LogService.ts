import type {
  APIEmbed,
  EmbedBuilder,
  Guild,
  GuildTextBasedChannel,
} from "discord.js";
import _ from "lodash";

import type { EventType } from "@/db/client";
import type { i18n } from "@/i18n";

import type { EmbedTemplatePlaceholders } from "~/Constants";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { deepReplaceAll } from "~/utils/deepReplaceAll";
import SettingsService from "./SettingsService";

type LogData<E extends EventType> = Record<
  (typeof EmbedTemplatePlaceholders)[E][number],
  string
>;

interface SetupOptions<E extends EventType> {
  eventName: E;
  guild: Guild;
  relatedChannels?: string[];
  relatedUsers: (string | undefined | null)[];
  data: LogData<E>;
  i18n: i18n;
}

export class LogService {
  static async log<E extends EventType>({
    eventName,
    guild,
    relatedChannels = [],
    relatedUsers = [],
    data,
    i18n,
  }: SetupOptions<E>) {
    try {
      for (const serviceSettings of await SettingsService.getByEventName(
        eventName,
        guild,
      )) {
        const ignoredChannels = serviceSettings.ignoredChannels;
        _.pull(ignoredChannels, ...serviceSettings.watchChannels);
        const ignoredUsers = serviceSettings.ignoredUsers;
        _.pull(ignoredUsers, ...serviceSettings.watchUsers);

        ignoredUsers.push(guild.client.user.id);
        ignoredChannels.push(serviceSettings.channelId);

        if (
          ignoredChannels.some((ignoredChannel) =>
            relatedChannels.includes(ignoredChannel),
          ) ||
          ignoredUsers.some((ignoredUser) => relatedUsers.includes(ignoredUser))
        ) {
          continue;
        }

        // Fall back to base template if no custom template is set
        // Typescript will fail to typecheck this when eventName is "E extend EventType" instead of "EventType"
        const castedEventName: EventType = eventName;
        let templates: APIEmbed[] = i18n.t(`baseTemplates:${castedEventName}`, {
          returnObjects: true,
        });

        // Process template variables
        for (const [key, value] of Object.entries(data)) {
          templates = deepReplaceAll(templates, `{${key}}`, value as string);
        }

        const channel = await guild.channels.fetch(serviceSettings.channelId);

        if (!channel?.isTextBased()) {
          continue;
        }

        const embeds = templates.map(
          (template) => new BananaLoggerEmbed(template),
        );

        await LogService.sendLog(channel, embeds);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // TODO: Implement logging queue for batching/rate limiting
  private static logQueue: unknown[] = [];
  private static async sendLog(
    channel: GuildTextBasedChannel,
    embeds: EmbedBuilder[],
  ) {
    await channel.send({ embeds });
  }
}
