import assert from "node:assert";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { userMention } from "discord.js";

import { i18nDefault } from "@/i18n";

import type { CommandHandle } from "~/structures";
import SettingsService from "~/services/SettingsService";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { prepareLocalization } from "~/utils/prepareLocalization";
import { extractSupportedChannel } from ".";
import { assertCachedGuild, assertChatInputCommand } from "..";

export const toggleIgnoreUserSlashDef = new SlashCommandSubcommandBuilder()
  .setName(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-ignore-user.name",
    ),
  )
  .setDescription(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-ignore-user.description",
    ),
  )
  .addUserOption((userOption) =>
    userOption
      .setName(
        prepareLocalization(
          "bot:interaction.commands.config.definition.slash.sub-commands.toggle-ignore-user.options.user.name",
        ),
      )
      .setDescription(
        prepareLocalization(
          "bot:interaction.commands.config.definition.slash.sub-commands.toggle-ignore-user.options.user.description",
        ),
      )
      .setRequired(true),
  );

export const toggleIgnoreUserHandle: CommandHandle = async (command, i18n) => {
  assertCachedGuild(command);
  assertChatInputCommand(command);
  assert(command.channel);

  const channel = extractSupportedChannel(command.channel);

  const settingsService = await SettingsService.init(channel, command.guild);

  const userToToggle = command.options.getUser(
    i18nDefault.t(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-ignore-user.options.user.name",
    ),
    true,
  );

  const wasIgnored = await settingsService.toggleIgnoreUser(userToToggle.id);

  const embed = new BananaLoggerEmbed();
  embed.setTitle(
    i18n.t(
      "bot:interaction.commands.config.sub-commands.toggle-ignore-user.done",
    ),
  );

  embed.setDescription(
    wasIgnored
      ? i18n.t(
          "bot:interaction.commands.config.sub-commands.toggle-ignore-user.is-not-being-ignored-anymore",
          {
            USER_MENTION: userMention(userToToggle.id) as string,
          },
        )
      : i18n.t(
          "bot:interaction.commands.config.sub-commands.toggle-ignore-user.is-now-being-ignored",
          {
            USER_MENTION: userMention(userToToggle.id) as string,
          },
        ),
  );
  await command.editReply({ embeds: [embed] });
};
