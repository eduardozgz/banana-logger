import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { userMention } from "discord.js";

import { i18nDefault } from "@/i18n";

import type { CommandHandle } from "~/structures";
import GlobalSettingsService from "~/services/GlobalSettingsService";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { prepareLocalization } from "~/utils/prepareLocalization";
import { assertCachedGuild, assertChatInputCommand } from "..";

export const toggleIgnoreUserSlashDef = new SlashCommandSubcommandBuilder()
  .setName(
    prepareLocalization(
      "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-user.name",
    ),
  )
  .setDescription(
    prepareLocalization(
      "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-user.description",
    ),
  )
  .addUserOption((userOption) =>
    userOption
      .setName(
        prepareLocalization(
          "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-user.options.user.name",
        ),
      )
      .setDescription(
        prepareLocalization(
          "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-user.options.user.description",
        ),
      )
      .setRequired(true),
  );

export const toggleIgnoreUserHandle: CommandHandle = async (command, i18n) => {
  assertCachedGuild(command);
  assertChatInputCommand(command);

  const userToToggle = command.options.getUser(
    i18nDefault.t(
      "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-user.options.user.name",
    ),
    true,
  );

  const globalSettingsService = await GlobalSettingsService.init(command.guild);

  const wasIgnored = await globalSettingsService.toggleIgnoreUser(
    userToToggle.id,
  );

  const embed = new BananaLoggerEmbed();
  embed.setTitle(
    i18n.t(
      "bot:interaction.commands.globalConfig.sub-commands.toggle-ignore-user.done",
    ),
  );

  embed.setDescription(
    wasIgnored
      ? i18n.t(
          "bot:interaction.commands.globalConfig.sub-commands.toggle-ignore-user.is-not-being-ignored-anymore",
          {
            USER_MENTION: userMention(userToToggle.id),
          },
        )
      : i18n.t(
          "bot:interaction.commands.globalConfig.sub-commands.toggle-ignore-user.is-now-being-ignored",
          {
            USER_MENTION: userMention(userToToggle.id),
          },
        ),
  );
  await command.editReply({ embeds: [embed] });
};
