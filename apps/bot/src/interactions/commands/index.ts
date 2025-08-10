import type {
  CacheType,
  ChatInputCommandInteraction,
  CommandInteraction,
} from "discord.js";
import { MessageFlags } from "discord.js";

import { i18nDefault } from "@/i18n";

import type { Command } from "~/structures/Command";
import { initI18nFromInteraction } from "~/utils/initI18nFromInteraction";
import { commandDefinitionTKeyMap } from "~/utils/prepareLocalization";

export const allCommands: Command[] = [];

export function assertCachedGuild(
  command: CommandInteraction,
): asserts command is CommandInteraction<"cached"> {
  if (!command.inCachedGuild()) {
    throw new Error("This command can only be used in a cached guild");
  }
}

export function assertChatInputCommand(
  command: CommandInteraction<CacheType>,
): asserts command is ChatInputCommandInteraction<CacheType> {
  if (!command.isChatInputCommand()) {
    throw new Error("This command can only be used in a chat input command");
  }
}

export function throwUnsupported(command: CommandInteraction): never {
  throw new Error(`Unsupported command type ${command.commandType}`);
}

export default async function handleCommand(
  commandInteraction: CommandInteraction,
): Promise<void> {
  const { logger } = commandInteraction.client.botInstanceOptions;

  await commandInteraction.deferReply({ flags: MessageFlags.Ephemeral });

  const command = allCommands.find((c) => {
    const commandNames = [c.slashDefinition?.name, c.contextDefinition?.name]
      .filter(Boolean)
      .map((commandName) => commandDefinitionTKeyMap.get(commandName))
      .map((commandName) => i18nDefault.t(commandName as never) as string);

    if (!commandNames.length)
      throw new Error(
        "Command name couldn't be resolved, looks like you forgot to define the command in `commandDefinition` or `contextCommandDefinition` or use prepareLocalization() in its name",
      );

    return commandNames.some(
      (commandName) => commandName === commandInteraction.commandName,
    );
  });

  if (!command) {
    throw new Error(`Command ${commandInteraction.commandName} wasn't found`);
  }

  logger.debug(
    `${commandInteraction.user.username}#${
      commandInteraction.user.discriminator
    } (${
      commandInteraction.user.id
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
    }) is executing command ${commandInteraction.toString()} on channel ${
      commandInteraction.channel?.toString() ?? commandInteraction.channelId
    }`,
  );
  const i18n = await initI18nFromInteraction(commandInteraction);

  await command.handle(commandInteraction, i18n);
}
