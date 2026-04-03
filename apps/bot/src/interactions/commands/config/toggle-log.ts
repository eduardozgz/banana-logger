import assert from "node:assert";
import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { z } from "zod/v4";

import { EventType } from "@bl/db/client";
import { i18nDefault } from "@bl/i18n";

import type { PresetName } from "~/Constants";
import type { CommandHandle } from "~/structures";
import { ALL_EVENTS_CHOICE, EVENT_PRESETS, PRESET_PREFIX } from "~/Constants";
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

const presetNames = Object.keys(EVENT_PRESETS) as PresetName[];

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

  const embed = new BananaLoggerEmbed();
  embed.setTitle(t("done"));

  let description: string;

  if (eventToToggle === ALL_EVENTS_CHOICE) {
    const wasAdded = await settingsService.toggleEvent(ALL_EVENTS_CHOICE);
    description = wasAdded
      ? t("everything-is-now-being-logged")
      : t("nothing-is-being-logged");
  } else if (eventToToggle.startsWith(PRESET_PREFIX)) {
    const presetKey = z
      .enum(presetNames as [PresetName, ...PresetName[]])
      .parse(eventToToggle.slice(PRESET_PREFIX.length));
    const presetEvents = EVENT_PRESETS[presetKey];
    const wasAdded = await settingsService.toggleEvents([...presetEvents]);
    const presetName = i18n.t(
      `bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.choices.presets.${presetKey}`,
    );
    description = wasAdded
      ? t("preset-is-now-being-logged", {
          PRESET_NAME: presetName,
          COUNT: String(presetEvents.length),
        })
      : t("preset-is-not-being-logged-anymore", {
          PRESET_NAME: presetName,
          COUNT: String(presetEvents.length),
        });
  } else {
    const event = z.nativeEnum(EventType).parse(eventToToggle);
    const wasAdded = await settingsService.toggleEvent(event);
    description = wasAdded
      ? t("is-now-being-logged", {
          EVENT_NAME: i18n.t(`main:eventNames.${event}`),
        })
      : t("is-not-being-logged-anymore", {
          EVENT_NAME: i18n.t(`main:eventNames.${event}`),
        });
  }

  embed.setDescription(description);
  await command.editReply({ embeds: [embed] });
};
