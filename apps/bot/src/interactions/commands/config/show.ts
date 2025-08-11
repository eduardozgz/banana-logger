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
  assertCachedGuild(command);
  assert(command.channel);

  const channel = extractSupportedChannel(command.channel);

  const settingsService = await SettingsService.init(channel, command.guild);

  let settingsContent = "";

  const eventsLoggedString = settingsService.events.length
    ? settingsService.events.length === Object.values(EventType).length
      ? i18n.t(
          "bot:interaction.commands.config.sub-commands.show.all-events-are-being-logged",
        )
      : listFormat(
          settingsService.events.map((event) =>
            i18n.t(`common:eventNames.${event}`),
          ),
          i18n.language,
        )
    : i18n.t(
        "bot:interaction.commands.config.sub-commands.show.no-events-are-being-logged",
      );
  settingsContent += `${bold(
    underline(
      i18n.t("bot:interaction.commands.config.sub-commands.show.events-logged"),
    ),
  )}:\n${eventsLoggedString}\n\n`;

  // Ignored users
  const ignoredUsersString = settingsService.ignoredUsers.length
    ? listFormat(
        settingsService.ignoredUsers.map((user) => userMention(user)),
        i18n.language,
      )
    : i18n.t(
        "bot:interaction.commands.config.sub-commands.show.no-users-are-being-ignored",
      );
  settingsContent += `${bold(
    underline(
      i18n.t("bot:interaction.commands.config.sub-commands.show.ignored-users"),
    ),
  )}:\n${ignoredUsersString}\n\n`;

  // Users being watched
  const watchUsersString = settingsService.watchUsers.length
    ? listFormat(
        settingsService.watchUsers.map((user) => userMention(user)),
        i18n.language,
      )
    : i18n.t(
        "bot:interaction.commands.config.sub-commands.show.no-users-are-being-watched",
      );
  settingsContent += `${bold(
    underline(
      i18n.t("bot:interaction.commands.config.sub-commands.show.watched-users"),
    ),
  )}:\n${watchUsersString}\n\n`;

  // Ignored channels
  const ignoredChannelsString = settingsService.ignoredChannels.length
    ? listFormat(
        settingsService.ignoredChannels.map((channel) =>
          channelMention(channel),
        ),
        i18n.language,
      )
    : i18n.t(
        "bot:interaction.commands.config.sub-commands.show.no-channels-are-being-ignored",
      );
  settingsContent += `${bold(
    underline(
      i18n.t(
        "bot:interaction.commands.config.sub-commands.show.ignored-channels",
      ),
    ),
  )}:\n${ignoredChannelsString}\n\n`;

  // Watched channels
  const watchedChannelsString = settingsService.watchChannels.length
    ? listFormat(
        settingsService.watchChannels.map((channel) => channelMention(channel)),
        i18n.language,
      )
    : i18n.t(
        "bot:interaction.commands.config.sub-commands.show.no-channels-are-being-watched",
      );
  settingsContent += `${bold(
    underline(
      i18n.t(
        "bot:interaction.commands.config.sub-commands.show.watched-channels",
      ),
    ),
  )}:\n${watchedChannelsString}\n\n`;

  const embeds: EmbedBuilder[] = [];

  safeDiscordString(settingsContent).forEach((portion) => {
    const embed = new BananaLoggerEmbed();
    embed.setTitle(
      i18n.t("bot:interaction.commands.config.sub-commands.show.settings-for", {
        CHANNEL_NAME: channel.name,
      }),
    );
    embed.setDescription(portion);
    embeds.push(embed);
  });

  const paginator = new Paginator(command, embeds, i18n);
  await paginator.displayPage(0);
};
