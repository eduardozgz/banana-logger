import {
	SlashCommandBuilder,
	SlashCommandSubcommandsOnlyBuilder
} from "@discordjs/builders";
import type { CommandInteraction } from "discord.js";
import type { GuildCommand } from "./GuildCommand";

export interface CommandOptions {
	definition: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
	execute: (command: CommandInteraction) => void | Promise<void>;
}

export abstract class BaseCommand implements CommandOptions {
	definition: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
	execute: (command: CommandInteraction) => void | Promise<void>;

	constructor(options: CommandOptions) {
		this.definition = options.definition;
		this.execute = options.execute;
	}

	abstract isGuildCommand(): this is GuildCommand & this;
}
