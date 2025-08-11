import assert from "node:assert";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { z } from "zod/v4";

import { EventType } from "@/db/client";
import { i18nDefault } from "@/i18n";

import type { CommandHandle } from "~/structures";
import { ALL_EVENTS_CHOICE } from "~/Constants";
import SettingsService from "~/services/SettingsService";
import BananaLoggerEmbed from "~/utils/BananaLoggerEmbed";
import { prepareLocalization } from "~/utils/prepareLocalization";
import { extractSupportedChannel } from ".";
import { assertCachedGuild, assertChatInputCommand } from "..";

export const toggleLogSlashDef = new SlashCommandSubcommandBuilder()
  .setName(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.name",
    ),
  )
  .setDescription(
    prepareLocalization(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.description",
    ),
  )
  .addStringOption((stringOption) =>
    stringOption
      .setName(
        prepareLocalization(
          "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.name",
        ),
      )
      .setDescription(
        prepareLocalization(
          "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.description",
        ),
      )
      .setRequired(true)
      .setAutocomplete(true),
  );

export const toggleLogHandle: CommandHandle = async (command, i18n) => {
  const t = i18n.getFixedT(
    i18n.language,
    "bot",
    "interaction.commands.config.sub-commands.toggle-log",
  );

  assertCachedGuild(command);
  assertChatInputCommand(command);
  assert(command.channel);

  const channel = extractSupportedChannel(command.channel);

  const settingsService = await SettingsService.init(channel, command.guild);

  const eventToToggle = command.options.getString(
    i18nDefault.t(
      "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.name",
    ),
    true,
  );

  const eventToToggleValidated = z
    .enum([ALL_EVENTS_CHOICE, ...Object.values(EventType)])
    .parse(eventToToggle);

  const wasBeingLogged = await settingsService.toggleEvent(
    eventToToggleValidated,
  );

  const embed = new BananaLoggerEmbed();
  embed.setTitle(t("done"));

  const eventName =
    eventToToggleValidated === ALL_EVENTS_CHOICE
      ? t("everything-event-name")
      : i18n.t(`common:eventNames.${eventToToggleValidated}`);

  embed.setDescription(
    wasBeingLogged
      ? t("is-not-being-logged-anymore", {
          EVENT_NAME: eventName,
        })
      : t("is-now-being-logged", {
          EVENT_NAME: eventName,
        }),
  );
  await command.editReply({ embeds: [embed] });
};
