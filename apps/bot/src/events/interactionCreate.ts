import { randomUUID } from "crypto";
import type { i18n } from "i18next";
import { EmbedBuilder } from "@discordjs/builders";
import { Colors, inlineCode } from "discord.js";

import handleAutocomplete from "~/interactions/autocomplete";
import handleButton from "~/interactions/buttons";
import handleSelectMenu from "~/interactions/selectMenus";
import { initI18nFromInteraction } from "~/utils/initI18nFromInteraction";
import handleCommand from "../interactions/commands";
import { EventHandler } from "../structures";
import { UserError } from "../utils/UserError";

export const interactionCreateEvent = new EventHandler({
  name: "interactionCreate",
  handler: async (client, interaction) => {
    const { logger } = client.botInstanceOptions;

    try {
      if (interaction.isCommand()) {
        await handleCommand(interaction);
      }

      if (interaction.isAutocomplete()) {
        await handleAutocomplete(interaction);
      }

      if (interaction.isButton()) {
        await handleButton(interaction);
      }

      if (interaction.isAnySelectMenu()) {
        await handleSelectMenu(interaction);
      }
    } catch (error) {
      if (interaction.isRepliable()) {
        const embed = new EmbedBuilder();
        const id = randomUUID();
        let i18n: i18n;
        let title: string, description: string;

        try {
          i18n = await initI18nFromInteraction(interaction);
          title = i18n.t("bot:interaction.commandHandler.error.title");
          description = i18n.t(
            "bot:interaction.commandHandler.error.description",
          );
        } catch (e) {
          logger.error(e);
          title = "ERROR!";
          description =
            "Something went wrong, please, try again later\n\nError ID: {{ERROR_ID}}";
        }

        if (error instanceof UserError) {
          embed.setDescription(error.message);
        } else {
          embed.setDescription(
            description.replaceAll("{{ERROR_ID}}", inlineCode(id)),
          );
        }

        logger.error(`Interaction error`, { error, interaction });

        embed.setColor(Colors.Red);
        embed.setTitle(title);

        interaction
          .editReply({
            embeds: [embed],
          })
          .catch((error) => {
            logger.error("Interaction error reply error:", error);
          });
      } else {
        logger.error(
          "Something went wrong while processing the interaction: ",
          error,
        );
      }
    }
  },
});
