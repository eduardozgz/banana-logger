import { SlashCommandBuilder } from "@discordjs/builders";
import { InteractionContextType } from "discord.js";

import { i18nDefault } from "@/i18n";

import { Command } from "~/structures";
import { handleSubcommand } from "~/utils/handleSubcommand";
import { prepareLocalization } from "~/utils/prepareLocalization";
import { showHandle, showSlashDef } from "./show";
import {
  toggleIgnoreChannelHandle,
  toggleIgnoreChannelSlashDef,
} from "./toggle-ignore-channel";
import {
  toggleIgnoreUserHandle,
  toggleIgnoreUserSlashDef,
} from "./toggle-ignore-user";

export const globalConfig = new Command({
  slashDefinition: new SlashCommandBuilder()
    .setName(
      prepareLocalization(
        "bot:interaction.commands.globalConfig.definition.slash.name",
      ),
    )
    .setDescription(
      prepareLocalization(
        "bot:interaction.commands.globalConfig.definition.slash.description",
      ),
    )
    .setContexts(InteractionContextType.Guild)
    .setDefaultMemberPermissions("0")
    .addSubcommand(showSlashDef)
    .addSubcommand(toggleIgnoreChannelSlashDef)
    .addSubcommand(toggleIgnoreUserSlashDef),
  handle: (command, i18n) =>
    handleSubcommand(command, i18n, {
      [i18nDefault.t(
        "bot:interaction.commands.globalConfig.definition.slash.sub-commands.show.name",
      )]: showHandle,
      [i18nDefault.t(
        "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-channel.name",
      )]: toggleIgnoreChannelHandle,
      [i18nDefault.t(
        "bot:interaction.commands.globalConfig.definition.slash.sub-commands.toggle-ignore-user.name",
      )]: toggleIgnoreUserHandle,
    }),
});
