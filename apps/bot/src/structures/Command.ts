import type { CommandInteraction } from "discord.js";

import type { i18n } from "@/i18n";
import type {
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";

export type CommandHandle = (
  command: CommandInteraction,
  i18n: i18n,
) => void | Promise<void>;

type SlashCommandUnion =
  | SlashCommandBuilder
  | SlashCommandSubcommandsOnlyBuilder
  | SlashCommandOptionsOnlyBuilder
  | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

export class Command {
  slashDefinition?: SlashCommandUnion;
  contextDefinition?: ContextMenuCommandBuilder;
  handle: CommandHandle;

  constructor(options: Command) {
    this.slashDefinition = options.slashDefinition;
    this.contextDefinition = options.contextDefinition;
    this.handle = options.handle;
  }
}
