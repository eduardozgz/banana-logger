import { SlashCommandBuilder } from "@discordjs/builders";
import type { CommandInteraction } from "discord.js";
import type { GuildCommand } from "./GuildCommand";

type CommandExecute = (command: CommandInteraction) => void | Promise<void>;

interface SubCommandsExecute {
	[key: string]: CommandExecute | SubCommandsExecute;
}

export interface CommandOptions {
	definition: SlashCommandBuilder;
	execute: CommandExecute | SubCommandsExecute;
}

export abstract class BaseCommand implements CommandOptions {
	definition: SlashCommandBuilder;
	execute: CommandExecute | SubCommandsExecute;

	constructor(options: CommandOptions) {
		this.definition = options.definition;
		this.execute = options.execute;
	}

	abstract isGuildCommand(): this is GuildCommand & this;
}
