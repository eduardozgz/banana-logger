import {
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} from "@discordjs/builders";
import { ButtonStyle, InteractionContextType } from "discord.js";

import { getBotInviteLink } from "@/common/getBotInviteLink";

import { Command } from "~/structures";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { prepareLocalization } from "~/utils/prepareLocalization";

export const inviteCommand = new Command({
  slashDefinition: new SlashCommandBuilder()
    .setName(
      prepareLocalization(
        "bot:interaction.commands.invite.definition.slash.name",
      ),
    )
    .setDescription(
      prepareLocalization(
        "bot:interaction.commands.invite.definition.slash.description",
      ),
    )
    .setContexts(
      InteractionContextType.Guild,
      InteractionContextType.BotDM,
      InteractionContextType.PrivateChannel,
    ),
  handle: async (command, { t }) => {
    const embed = new BananaLoggerEmbed();

    embed.setDescription(
      t("bot:interaction.commands.invite.description", {
        INVITE_URL: getBotInviteLink(),
      }),
    );

    const componentRow = new ActionRowBuilder<ButtonBuilder>();
    componentRow.addComponents(
      new ButtonBuilder({
        style: ButtonStyle.Link,
        url: getBotInviteLink(),
        label: t("bot:interaction.commands.invite.addToServer"),
      }),
    );

    if (command.inGuild() && command.memberPermissions.has("ManageGuild")) {
      componentRow.addComponents(
        new ButtonBuilder({
          style: ButtonStyle.Link,
          url: getBotInviteLink(command.guildId),
          label: t("bot:interaction.commands.invite.addToServerAgain"),
        }),
      );
    }

    await command.editReply({
      embeds: [embed],
      components: [componentRow],
    });
  },
});
