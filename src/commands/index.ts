import { bold, hyperlink } from "@discordjs/builders";
import { CommandInteraction, Permissions } from "discord.js";
import { Colors } from "../Constants";
import type { BaseCommand } from "../structures";
import BananaLoggerEmbed from "../utils/BananaLoggerEmbed";
import getBotInviteLink from "../utils/getBotInviteLink";
import UserError from "../utils/UserError";
import { inviteCommand } from "./invite";

export const allCommands: BaseCommand[] = [inviteCommand];

export const allCommandsNeededPermissions: Permissions = new Permissions(
	allCommands.reduce(
		(acc, c) => (c.isGuildCommand() ? c.botPermissions.bitfield | acc : acc),
		0n
	)
);

async function handleInteractionCommandError(
	error: Error,
	commandInteraction: CommandInteraction
): Promise<void> {
	const embed = new BananaLoggerEmbed();
	embed.setColor(Colors.RED);
	embed.setTitle(bold("ERROR!"));
	if (error instanceof UserError) {
		embed.setDescription(error.message);
	} else {
		embed.setDescription("Something went wrong, please, try again later");
		console.error("Interaction error:", error);
	}
	commandInteraction
		.reply({ embeds: [embed], ephemeral: true })
		.catch((error) => {
			console.error("Interaction error reply error:", error);
		});
}

export default async function handleInteractionCommand(
	commandInteraction: CommandInteraction
): Promise<void> {
	for (const command of allCommands) {
		if (command.definition.name === commandInteraction.commandName) {
			try {
				if (commandInteraction.inGuild()) {
					if (!command.isGuildCommand())
						throw new UserError(
							"You can't run this command in a DM/Group channel"
						);

					const userMissingPermissions = commandInteraction.memberPermissions.missing(
						command.userPermissions
					);
					if (userMissingPermissions.length) {
						throw new UserError(
							`You don't have the required permissions to run this command: ${userMissingPermissions.join(
								", "
							)}`
						);
					}

					const botMissingPermissions = commandInteraction.memberPermissions.missing(
						command.userPermissions
					);
					if (botMissingPermissions.length) {
						throw new UserError(
							`The bot needs the following permissions to run this command: ${botMissingPermissions.join(
								", "
							)}\nWould you like to try to invite ${hyperlink(
								"the bot again",
								getBotInviteLink(commandInteraction.guildId)
							)}?`
						);
					}
				}

				await command.execute(commandInteraction);
			} catch (error) {
				handleInteractionCommandError(error, commandInteraction);
			}
			break;
		}
	}
}
