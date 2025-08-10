import assert from "assert";
import type { APIEmbed } from "discord-api-types/v10";
import type {
  CommandInteraction,
  EmbedData,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord-api-types/v10";
import {
  EmbedBuilder,
  InteractionCollector,
  StringSelectMenuBuilder,
} from "discord.js";
import _ from "lodash";

import type { i18n } from "@/i18n";
import type { Logger } from "@/logger";

class Paginator {
  private currentPage: number;
  private pages: EmbedBuilder[];
  private commandInteraction: CommandInteraction;
  private logger: Logger;
  private i18n: i18n;

  public constructor(
    commandInteraction: CommandInteraction,
    pages: (APIEmbed | EmbedBuilder | EmbedData)[],
    i18n: i18n,
  ) {
    this.logger = commandInteraction.client.botInstanceOptions.logger.child({
      component: "Paginator",
    });
    this.i18n = i18n;
    this.commandInteraction = commandInteraction;

    // EmbedList we will page over
    this.pages = pages.map((page) =>
      page instanceof EmbedBuilder ? page : new EmbedBuilder(page),
    );
    this.currentPage = 0;

    // setup interaction collector
    if (pages.length > 1) {
      // Timeout time in milliseconds to stop listening for interactions
      const timeoutTime = 60 * 1000 * 5 * pages.length;

      new InteractionCollector(this.commandInteraction.client, {
        time: timeoutTime,
        filter: (interaction) => {
          if (!(interaction.isMessageComponent() || interaction.isSelectMenu()))
            return false;
          const [type, id] = interaction.customId.split(":");
          return (
            type === "paginator" &&
            id === this.commandInteraction.id &&
            interaction.user.id === commandInteraction.user.id
          );
        },
      })
        .on("collect", (interaction) => {
          if (interaction.isButton()) {
            interaction.deferUpdate().catch((e) => this.logger.error(e));

            const [_type, _id, page] = interaction.customId.split(":");

            if (page === "showJump") {
              this.commandInteraction
                .editReply({
                  components: this.generateComponents(true),
                })
                .catch((e) => this.logger.error(e));
            } else {
              const pageInt = Number(page);
              this.displayPage(pageInt).catch(console.error);
            }
          } else if (interaction.isStringSelectMenu()) {
            this.displayPage(Number(interaction.values[0])).catch((e) =>
              this.logger.error(e),
            );
          }
        })
        .on("end", () => {
          this.commandInteraction
            .editReply({ components: [] })
            .catch((e) => this.logger.error(e));
        });
    }
  }

  /**
   * Sends Pager to channel
   */
  async displayPage(page: number) {
    this.currentPage = page;
    // Clone the embed and modify it by adding a page indicator
    const embedToSend = _.cloneDeep(this.pages[page]);

    assert(embedToSend, "Embed is undefined");

    if (this.pages.length > 1) this.appendPageCounter(embedToSend);

    const components = this.generateComponents();

    // setup paginator in discord if it doesn't exists
    if (!this.commandInteraction.replied) {
      await this.commandInteraction.editReply({
        embeds: [embedToSend],
        components,
      });
      // Add reactions based on page counts
    } else {
      await this.commandInteraction.editReply({
        embeds: [embedToSend],
        components,
      });
    }
  }
  /**
   * Adds needed components for pagination based on page count
   */
  private generateComponents(
    showJump = false,
  ): ActionRowBuilder<MessageActionRowComponentBuilder>[] {
    const rows: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [];

    // If more than 1 page, display navigation controls
    if (this.pages.length > 1) {
      rows.push(
        new ActionRowBuilder<MessageActionRowComponentBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`paginator:${this.commandInteraction.id}:0:0`)
              .setLabel("First")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(this.currentPage === 0),
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId(
                `paginator:${this.commandInteraction.id}:${
                  this.currentPage - 1
                }:1`,
              )
              .setLabel("Previous")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(this.currentPage === 0),
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId(
                `paginator:${this.commandInteraction.id}:${
                  this.currentPage + 1
                }:2`,
              )
              .setLabel("Next")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(this.currentPage === this.pages.length - 1),
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId(
                `paginator:${this.commandInteraction.id}:${
                  this.pages.length - 1
                }:3`,
              )
              .setLabel("Last")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(this.currentPage === this.pages.length - 1),
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`paginator:${this.commandInteraction.id}:showJump`)
              .setLabel("Jump")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(showJump),
          ),
      );

      if (showJump) {
        rows.push(
          new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId(`paginator:${this.commandInteraction.id}`)
              .setPlaceholder("Select a page")
              .addOptions(
                _.uniq(
                  _.range(0, 5).map((n) =>
                    Math.floor(n * (this.pages.length / 5)),
                  ),
                ).map((page) => {
                  return {
                    label: `Page #${page + 1}`,
                    value: page.toString(),
                  };
                }),
              ),
          ),
        );
      }
    }

    return rows;
  }

  /**
   * @param embed This object will be modified
   */
  private appendPageCounter(embed: EmbedBuilder) {
    const pageText = this.i18n.t("bot:paginator.page", {
      CURRENT_PAGE: this.currentPage + 1,
      TOTAL_PAGES: this.pages.length,
    });

    if (embed.data.footer) {
      embed.setFooter({ text: pageText + " - " + embed.data.footer.text });
    } else {
      embed.setFooter({ text: pageText });
    }
  }
}
export default Paginator;
