import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Intents } from "discord.js";
import Constants, { IntentsEventMap } from "../Constants";
import type { GuildCommand } from "./GuildCommand";

type CommandExecute = (command: CommandInteraction) => void | Promise<void>;

interface SubCommandsExecute {
	[key: string]: CommandExecute | SubCommandsExecute;
}

export interface CommandOptions {
	definition: SlashCommandBuilder;
	execute: CommandExecute | SubCommandsExecute;
	neededIntents?: Intents;
}

export abstract class BaseCommand implements CommandOptions {
	definition: SlashCommandBuilder;
	execute: CommandExecute | SubCommandsExecute;
	neededIntents: Intents;

	constructor(options: CommandOptions) {
		this.definition = options.definition;
		this.execute = options.execute;
		this.neededIntents = new Intents(options.neededIntents);
	}

	abstract isGuildCommand(): this is GuildCommand & this;
}
