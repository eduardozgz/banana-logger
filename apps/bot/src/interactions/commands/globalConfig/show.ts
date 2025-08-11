import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { bold, channelMention, underline, userMention } from "discord.js";

import type { CommandHandle } from "~/structures";
import GlobalSettingsService from "~/services/GlobalSettingsService";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { listFormat } from "~/utils/listFormat";
import Paginator from "~/utils/Paginator";
import { prepareLocalization } from "~/utils/prepareLocalization";
import safeDiscordString from "~/utils/safeDiscordString";

export const showSlashDef = new SlashCommandSubcommandBuilder()
  .setName(
    prepareLocalization(
      "bot:interaction.commands.globalConfig.definition.slash.sub-commands.show.name",
    ),
  )
  .setDescription(
    prepareLocalization(
      "bot:interaction.commands.globalConfig.definition.slash.sub-commands.show.description",
    ),
  );

export const showHandle: CommandHandle = async (command, i18n) => {
  const t = i18n.getFixedT(
    i18n.language,
    "bot",
    "interaction.commands.globalConfig.sub-commands.show",
  );

  if (!command.inCachedGuild()) {
    throw new Error("This command can only be used in a cachedguild");
  }

  const globalSettingsService = await GlobalSettingsService.init(command.guild);

  let settingsContent = "";

  // Ignored users
  settingsContent += bold(underline(t("ignored-users")));
  settingsContent += "\n";
  settingsContent += globalSettingsService.ignoredUsers.length
    ? listFormat(
        globalSettingsService.ignoredUsers.map((user) => userMention(user)),
        i18n.language,
      )
    : t("no-ignored-users");
  settingsContent += "\n\n";

  // Ignored channels
  settingsContent += bold(underline(t("ignored-channels")));
  settingsContent += "\n";
  settingsContent += globalSettingsService.ignoredChannels.length
    ? listFormat(
        globalSettingsService.ignoredChannels.map((channel) =>
          channelMention(channel),
        ),
        i18n.language,
      )
    : t("no-ignored-channels");
  settingsContent += "\n\n";

  const embeds: BananaLoggerEmbed[] = [];

  safeDiscordString(settingsContent).forEach((portion) => {
    const embed = new BananaLoggerEmbed();
    embed.setTitle(t("global-settings"));
    embed.setDescription(portion);
    embeds.push(embed);
  });

  const paginator = new Paginator(command, embeds, i18n);
  await paginator.displayPage(0);
};
