import assert from "node:assert";
import type { EmbedBuilder } from "discord.js";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { bold, channelMention, underline, userMention } from "discord.js";

import { EventType } from "@/db/client";

import type { CommandHandle } from "~/structures";
import SettingsService from "~/services/SettingsService";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { listFormat } from "~/utils/listFormat";
import Paginator from "~/utils/Paginator";
import { prepareLocalization } from "~/utils/prepareLocalization";
import safeDiscordString from "~/utils/safeDiscordString";
import { extractSupportedChannel } from ".";
import { assertCachedGuild } from "..";

export const showSlashDef = new SlashCommandSubcommandBuilder()
  .setName(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.show.name",
    ),
  )
  .setDescription(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.show.description",
    ),
  );

export const showHandle: CommandHandle = async (command, i18n) => {
  const t = i18n.getFixedT(
    i18n.language,
    "bot",
    "interaction.commands.config.sub-commands.show",
  );

  assertCachedGuild(command);
  assert(command.channel);

  const channel = extractSupportedChannel(command.channel);

  const settingsService = await SettingsService.init(channel, command.guild);

  let settingsContent = "";

  settingsContent += bold(underline(t("events-logged")));
  settingsContent += "\n";
  settingsContent += settingsService.events.length
    ? settingsService.events.length === Object.values(EventType).length
      ? t("all-events-are-being-logged")
      : listFormat(
          settingsService.events.map((event) =>
            i18n.t(`main:eventNames.${event}`),
          ),
          i18n.language,
        )
    : t("no-events-are-being-logged");
  settingsContent += "\n\n";

  // Ignored users
  settingsContent += bold(underline(t("ignored-users")));
  settingsContent += "\n";
  settingsContent += settingsService.ignoredUsers.length
    ? listFormat(
        settingsService.ignoredUsers.map((user) => userMention(user)),
        i18n.language,
      )
    : t("no-users-are-being-ignored");
  settingsContent += "\n\n";

  // Users being watched
  settingsContent += bold(underline(t("watched-users")));
  settingsContent += "\n";
  settingsContent += settingsService.watchUsers.length
    ? listFormat(
        settingsService.watchUsers.map((user) => userMention(user)),
        i18n.language,
      )
    : t("no-users-are-being-watched");
  settingsContent += "\n\n";

  // Ignored channels
  settingsContent += bold(underline(t("ignored-channels")));
  settingsContent += "\n";
  settingsContent += settingsService.ignoredChannels.length
    ? listFormat(
        settingsService.ignoredChannels.map((channel) =>
          channelMention(channel),
        ),
        i18n.language,
      )
    : t("no-channels-are-being-ignored");
  settingsContent += "\n\n";

  // Watched channels
  settingsContent += bold(underline(t("watched-channels")));
  settingsContent += "\n";
  settingsContent += settingsService.watchChannels.length
    ? listFormat(
        settingsService.watchChannels.map((channel) => channelMention(channel)),
        i18n.language,
      )
    : t("no-channels-are-being-watched");
  settingsContent += "\n\n";

  const embeds: EmbedBuilder[] = [];

  safeDiscordString(settingsContent).forEach((portion) => {
    const embed = new BananaLoggerEmbed();
    embed.setTitle(
      t("settings-for", {
        CHANNEL_NAME: channel.name,
      }),
    );
    embed.setDescription(portion);
    embeds.push(embed);
  });

  const paginator = new Paginator(command, embeds, i18n);
  await paginator.displayPage(0);
};
