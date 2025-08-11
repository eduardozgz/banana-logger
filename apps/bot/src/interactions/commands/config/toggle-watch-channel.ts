import assert from "node:assert";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { channelMention } from "discord.js";

import { i18nDefault } from "@/i18n";

import type { CommandHandle } from "~/structures";
import SettingsService from "~/services/SettingsService";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { prepareLocalization } from "~/utils/prepareLocalization";
import { extractSupportedChannel } from ".";
import { assertCachedGuild, assertChatInputCommand } from "..";

export const toggleWatchChannelSlashDef = new SlashCommandSubcommandBuilder()
  .setName(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-channel.name",
    ),
  )
  .setDescription(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-channel.description",
    ),
  )
  .addChannelOption((channelOption) =>
    channelOption
      .setName(
        prepareLocalization(
          "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-channel.options.channel.name",
        ),
      )
      .setDescription(
        prepareLocalization(
          "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-channel.options.channel.description",
        ),
      )
      .setRequired(true),
  );

export const toggleWatchChannelHandle: CommandHandle = async (
  command,
  i18n,
) => {
  const t = i18n.getFixedT(
    i18n.language,
    "bot",
    "interaction.commands.config.sub-commands.toggle-watch-channel",
  );

  assertCachedGuild(command);
  assertChatInputCommand(command);
  assert(command.channel);

  const channel = extractSupportedChannel(command.channel);

  const settingsService = await SettingsService.init(channel, command.guild);
  const channelToToggle = command.options.getChannel(
    i18nDefault.t(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-channel.options.channel.name",
    ),
    true,
  );

  const wasWatched = await settingsService.toggleWatchChannel(
    channelToToggle.id,
  );

  const embed = new BananaLoggerEmbed();
  embed.setTitle(t("done"));

  embed.setDescription(
    wasWatched
      ? t("is-not-being-watched-anymore", {
          CHANNEL_MENTION: channelMention(channelToToggle.id),
        })
      : t("is-now-being-watched", {
          CHANNEL_MENTION: channelMention(channelToToggle.id),
        }),
  );

  await command.editReply({ embeds: [embed] });
};
