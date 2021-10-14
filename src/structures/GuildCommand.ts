import {
	BaseGuildCommandInteraction,
	CommandInteraction,
	PermissionResolvable,
	Permissions
} from "discord.js";
import { BaseCommand, CommandOptions } from "./BaseCommand";

type GuildCommandInteraction = BaseGuildCommandInteraction<"present"> &
	CommandInteraction;

interface GuildCommandOptions extends CommandOptions {
	/**
	 * @description If the bot doesn't have the specified permissions, an error will be thrown to the user, this is also used to generate invite links
	 */
	botPermissions?: PermissionResolvable[];
	/**
	 * @description If the users that is using the command doesn't have the specified permissions, an error will be thrown to the user
	 */
	userPermissions?: PermissionResolvable[];
	execute: (command: GuildCommandInteraction) => void | Promise<void>;
}

export class GuildCommand extends BaseCommand {
	botPermissions: Permissions;
	userPermissions: Permissions;

	constructor(options: GuildCommandOptions) {
		super(options);

		const botPermissions = new Permissions();
		(options.botPermissions ?? []).forEach((permission) => {
			botPermissions.add(permission);
		});
		this.botPermissions = botPermissions;

		const userPermissions = new Permissions();
		(options.userPermissions ?? []).forEach((permission) => {
			botPermissions.add(permission);
		});
		this.userPermissions = userPermissions;
	}

	isGuildCommand(): true {
		return true;
	}
}
