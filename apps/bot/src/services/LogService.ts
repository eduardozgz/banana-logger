import type {
  APIEmbed,
  EmbedBuilder,
  Guild,
  GuildAuditLogsEntry,
  GuildTextBasedChannel,
  PartialUser,
} from "discord.js";
import { CDNRoutes, RouteBases } from "discord-api-types/v10";
import { GuildChannel, Role, User } from "discord.js";
import _ from "lodash";

import type { EventType } from "@/db/client";
import type { i18n } from "@/i18n";

import type { EmbedTemplatePlaceholders } from "~/Constants";
import { baseGalleryEmbedUrl } from "~/Constants";
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
  executor?: User | PartialUser | null;
  relatedChannels?: string[];
  relatedUsers: (string | undefined | null)[];
  data: LogData<E>;
  i18n: i18n;
  target?: GuildAuditLogsEntry["target"];
}

export class LogService {
  static async log<E extends EventType>({
    eventName,
    guild,
    relatedChannels = [],
    relatedUsers = [],
    data,
    i18n,
    executor,
    target,
  }: SetupOptions<E>) {
    data = {
      ...data,
      GUILD_ID: guild.id,
      EXECUTOR_MENTION: executor?.toString(),
      EXECUTOR_NAME:
        executor?.username ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.EXECUTOR_MENTION"),
      EXECUTOR_ID: executor?.id ?? "",
      EXECUTOR_AVATAR: executor?.displayAvatarURL(),
      TARGET_ID: "",
      TARGET_NAME: i18n.t(
        "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
      ),
      TARGET_IMAGE_URL: `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(0)} `,
      ...(target &&
        "id" in target && {
          TARGET_ID: target.id,
        }),
      ...(target &&
        "name" in target && {
          TARGET_NAME: target.name,
        }),
      ...(target &&
        "username" in target && {
          TARGET_NAME: target.username,
        }),
      ...(target &&
        target instanceof User && {
          TARGET_MENTION: target.toString(),
          TARGET_IMAGE_URL: target.displayAvatarURL(),
        }),
      ...(target &&
        target instanceof GuildChannel && {
          TARGET_MENTION: target.toString(),
        }),
      ...(target &&
        target instanceof Role && {
          TARGET_MENTION: target.toString(),
        }),
    };

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

        const galleryEmbedUrl = baseGalleryEmbedUrl();

        embeds.forEach((embed) => {
          embed.setURL(galleryEmbedUrl);
        });

        await LogService.sendLog(channel, embeds);
      }
    } catch (e) {
      guild.client.botInstanceOptions.logger
        .child({
          component: "LogService",
          method: "log",
        })
        .error(e);
    }
  }

  // TODO: Implement logging queue for batching/rate limiting
  private static logQueue: unknown[] = [];
  private static async sendLog(
    channel: GuildTextBasedChannel,
    embeds: EmbedBuilder[],
  ) {
    await channel.send({
      embeds,
    });
  }
}
