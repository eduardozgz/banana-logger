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

export const toggleWatchUserSlashDef = new SlashCommandSubcommandBuilder()
  .setName(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-user.name",
    ),
  )
  .setDescription(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-user.description",
    ),
  )
  .addUserOption((userOption) =>
    userOption
      .setName(
        prepareLocalization(
          "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-user.options.user.name",
        ),
      )
      .setDescription(
        prepareLocalization(
          "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-user.options.user.description",
        ),
      )
      .setRequired(true),
  );

export const toggleWatchUserHandle: CommandHandle = async (command, i18n) => {
  const t = i18n.getFixedT(
    i18n.language,
    "bot",
    "interaction.commands.config.sub-commands.toggle-watch-user",
  );

  assertCachedGuild(command);
  assertChatInputCommand(command);
  assert(command.channel);

  const channel = extractSupportedChannel(command.channel);

  const settingsService = await SettingsService.init(channel, command.guild);

  const userToToggle = command.options.getUser(
    i18nDefault.t(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-user.options.user.name",
    ),
    true,
  );

  const wasWatched = await settingsService.toggleWatchUser(userToToggle.id);

  const embed = new BananaLoggerEmbed();
  embed.setTitle(t("done"));

  embed.setDescription(
    wasWatched
      ? t("is-not-being-watched-anymore", {
          USER_MENTION: userMention(userToToggle.id),
        })
      : t("is-now-being-watched", {
          USER_MENTION: userMention(userToToggle.id),
        }),
  );
  await command.editReply({ embeds: [embed] });
};
