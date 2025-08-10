import type { Channel, NewsChannel, TextChannel } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { ChannelType, InteractionContextType } from "discord.js";

import { i18nDefault } from "@/i18n";

import { Command } from "~/structures";
import { handleSubcommand } from "~/utils/handleSubcommand";
import { prepareLocalization } from "~/utils/prepareLocalization";
import { UserError } from "~/utils/UserError";
import { showHandle, showSlashDef } from "./show";
import {
  toggleIgnoreChannelHandle,
  toggleIgnoreChannelSlashDef,
} from "./toggle-ignore-channel";
import {
  toggleIgnoreUserHandle,
  toggleIgnoreUserSlashDef,
} from "./toggle-ignore-user";
import { toggleLogHandle, toggleLogSlashDef } from "./toggle-log";
import {
  toggleWatchChannelHandle,
  toggleWatchChannelSlashDef,
} from "./toggle-watch-channel";
import {
  toggleWatchUserHandle,
  toggleWatchUserSlashDef,
} from "./toggle-watch-user";

export function extractSupportedChannel(
  channel: Channel,
): TextChannel | NewsChannel {
  let parent = channel;
  if (channel.isThread() && channel.parent) {
    parent = channel.parent;
  } else {
    throw new Error("Channel thread has no parent");
  }

  if (
    parent.type === ChannelType.GuildText ||
    parent.type === ChannelType.GuildAnnouncement
  ) {
    return parent;
  }

  throw new UserError(
    // TODO: i18n
    "User used the command in a channel that is not a text, news nor thread channel",
  );
}

export const config = new Command({
  slashDefinition: new SlashCommandBuilder()
    .setName(
      prepareLocalization(
        "bot:interaction.commands.config.definition.slash.name",
      ),
    )
    .setDescription(
      prepareLocalization(
        "bot:interaction.commands.config.definition.slash.description",
      ),
    )
    .setContexts(InteractionContextType.Guild)
    .addSubcommand(showSlashDef)
    .addSubcommand(toggleLogSlashDef)
    .addSubcommand(toggleIgnoreChannelSlashDef)
    .addSubcommand(toggleWatchChannelSlashDef)
    .addSubcommand(toggleIgnoreUserSlashDef)
    .addSubcommand(toggleWatchUserSlashDef),
  handle: (command, i18n) =>
    handleSubcommand(command, i18n, {
      [i18nDefault.t(
        "bot:interaction.commands.config.definition.slash.sub-commands.show.name",
      )]: showHandle,
      [i18nDefault.t(
        "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.name",
      )]: toggleLogHandle,
      [i18nDefault.t(
        "bot:interaction.commands.config.definition.slash.sub-commands.toggle-ignore-channel.name",
      )]: toggleIgnoreChannelHandle,
      [i18nDefault.t(
        "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-channel.name",
      )]: toggleWatchChannelHandle,
      [i18nDefault.t(
        "bot:interaction.commands.config.definition.slash.sub-commands.toggle-ignore-user.name",
      )]: toggleIgnoreUserHandle,
      [i18nDefault.t(
        "bot:interaction.commands.config.definition.slash.sub-commands.toggle-watch-user.name",
      )]: toggleWatchUserHandle,
    }),
});
