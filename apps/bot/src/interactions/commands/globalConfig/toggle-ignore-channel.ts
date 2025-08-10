import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { channelMention } from "discord.js";

import { i18nDefault } from "@/i18n";

import type { CommandHandle } from "~/structures";
import GlobalSettingsService from "~/services/GlobalSettingsService";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { prepareLocalization } from "~/utils/prepareLocalization";
import { assertCachedGuild, assertChatInputCommand } from "..";

export const toggleIgnoreChannelSlashDef = new SlashCommandSubcommandBuilder()
  .setName(
    prepareLocalization(
      "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-channel.name",
    ),
  )
  .setDescription(
    prepareLocalization(
      "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-channel.description",
    ),
  )
  .addChannelOption((channelOption) =>
    channelOption
      .setName(
        prepareLocalization(
          "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-channel.options.channel.name",
        ),
      )
      .setDescription(
        prepareLocalization(
          "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-channel.options.channel.description",
        ),
      )
      .setRequired(true),
  );

export const toggleIgnoreChannelHandle: CommandHandle = async (
  command,
  i18n,
) => {
  assertCachedGuild(command);
  assertChatInputCommand(command);

  const globalSettingsService = await GlobalSettingsService.init(command.guild);
  const channelToToggle = command.options.getChannel(
    i18nDefault.t(
      "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-channel.options.channel.name",
    ),
    true,
  );

  const wasIgnored = await globalSettingsService.toggleIgnoreChannel(
    channelToToggle.id,
  );

  const embed = new BananaLoggerEmbed();
  embed.setTitle(
    i18n.t(
      "bot:interaction.commands.globalConfig.sub-commands.toggle-ignore-channel.done",
    ),
  );

  embed.setDescription(
    wasIgnored
      ? i18n.t(
          "bot:interaction.commands.globalConfig.sub-commands.toggle-ignore-channel.is-not-being-ignored-anymore",
          {
            CHANNEL_MENTION: channelMention(channelToToggle.id),
          },
        )
      : i18n.t(
          "bot:interaction.commands.globalConfig.sub-commands.toggle-ignore-channel.is-now-being-ignored",
          {
            CHANNEL_MENTION: channelMention(channelToToggle.id),
          },
        ),
  );
  await command.editReply({ embeds: [embed] });
};
