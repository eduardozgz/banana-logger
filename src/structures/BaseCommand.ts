import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import type { GuildCommand } from "./GuildCommand";

export interface CommandOptions {
	definition: SlashCommandBuilder;
	execute: (command: CommandInteraction) => void | Promise<void>;
}

export abstract class BaseCommand implements CommandOptions {
	definition: SlashCommandBuilder;
	execute: (command: CommandInteraction) => void | Promise<void>;

	constructor(options: CommandOptions) {
		this.definition = options.definition;
		this.execute = options.execute;
	}

	abstract isGuildCommand(): this is GuildCommand & this;
}
