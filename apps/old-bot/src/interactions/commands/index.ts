import { bold, hyperlink, inlineCode } from "@discordjs/builders";
import {
  CommandInteraction,
  Constants,
  Intents,
  Permissions,
} from "discord.js";
import { v4 as uuid } from "uuid";

import type { BaseCommand } from "../../structures";
import { Colors } from "../../Constants";
import BananaLoggerEmbed from "../../utils/BananaLoggerEmbed";
import getBotInviteLink from "../../utils/getBotInviteLink";
import UserError from "../../utils/UserError";
import { config } from "./config";
import { globalConfig } from "./globalConfig";
import { inviteCommand } from "./invite";

export const allCommands: BaseCommand[] = [inviteCommand, globalConfig, config];

export const allCommandsNeededPermissions: Permissions = new Permissions(
  allCommands.reduce(
    (acc, c) => (c.isGuildCommand() ? c.botPermissions.bitfield | acc : acc),
    0n,
  ),
);

export const allCommandsNeededIntents: Intents = new Intents(
  allCommands.reduce((acc, e) => acc | e.neededIntents.bitfield, 0),
);

async function handleInteractionCommandError(
  error: Error,
  commandInteraction: CommandInteraction,
): Promise<void> {
  const embed = new BananaLoggerEmbed();
  embed.setColor(Colors.RED);
  embed.setTitle(bold("ERROR!"));
  if (error instanceof UserError) {
    embed.setDescription(error.message);
  } else {
    const id = uuid();
    embed.setDescription(
      `Something went wrong, please, try again later\nError ID: ${inlineCode(
        id,
      )}`,
    );
    console.error(`Interaction error ${id}:`, error);
  }
  commandInteraction.editReply({ embeds: [embed] }).catch((error) => {
    console.error("Interaction error reply error:", error);
  });
}

export default async function handleInteractionCommand(
  commandInteraction: CommandInteraction,
): Promise<void> {
  for (const command of allCommands) {
    if (command.definition.name === commandInteraction.commandName) {
      try {
        if (command.isGuildCommand() && !commandInteraction.inGuild()) {
          throw new UserError(
            "You can't run this command in a DM/Group channel",
          );
        }

        // user/bot permissions checking
        if (command.isGuildCommand() && commandInteraction.inGuild()) {
          const userMissingPermissions =
            commandInteraction.memberPermissions.missing(
              command.userPermissions,
            );
          if (userMissingPermissions.length) {
            throw new UserError(
              `You don't have the required permissions to run this command: ${userMissingPermissions.join(
                ", ",
              )}`,
            );
          }

          const botMissingPermissions =
            commandInteraction.memberPermissions.missing(
              command.userPermissions,
            );
          if (botMissingPermissions.length) {
            throw new UserError(
              `The bot needs the following permissions to run this command: ${botMissingPermissions.join(
                ", ",
              )}\nWould you like to try to invite ${hyperlink(
                "the bot again",
                getBotInviteLink(commandInteraction.guildId),
              )}?`,
            );
          }
        }

        async function searchAndRunCommand(
          subcommandExecute: typeof command.execute,
          rawOptions,
        ) {
          const OptionTypes = Constants.ApplicationCommandOptionTypes;
          if (
            Array.isArray(rawOptions) &&
            rawOptions.some((rawOption) =>
              [OptionTypes.SUB_COMMAND_GROUP, OptionTypes.SUB_COMMAND].includes(
                rawOption.type,
              ),
            )
          ) {
            let found = false;
            for (const rawOption of rawOptions) {
              if (
                commandInteraction.options.getSubcommandGroup(false) ===
                  rawOption.name ||
                commandInteraction.options.getSubcommand(false) ===
                  rawOption.name
              ) {
                if (typeof subcommandExecute === "object") {
                  found = true;
                  await searchAndRunCommand(
                    subcommandExecute[rawOption.name],
                    rawOption.options,
                  );
                }
                break;
              }
            }
            if (!found)
              throw new UserError(
                `Command ${inlineCode(
                  commandInteraction.commandName,
                )} -> ${inlineCode(
                  commandInteraction.options.getSubcommandGroup(false),
                )} -> ${inlineCode(
                  commandInteraction.options.getSubcommand(false),
                )} is not being handled correctly, please contact an administrator`,
              );
          } else if (typeof subcommandExecute === "function") {
            await subcommandExecute(commandInteraction);
            return;
          }
        }

        await searchAndRunCommand(
          command.execute,
          command.definition.toJSON().options,
        );
      } catch (error) {
        handleInteractionCommandError(error, commandInteraction);
      }
      break;
    }
  }
}
