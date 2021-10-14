import { hyperlink, SlashCommandBuilder } from "@discordjs/builders";
import { GuildCommand } from "../structures";
import BananaLoggerEmbed from "../utils/BananaLoggerEmbed";
import getBotInviteLink from "../utils/getBotInviteLink";

export const inviteCommand = new GuildCommand({
	definition: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Gives you an invite link to add the bot"),
	execute: (command) => {
		const embed = new BananaLoggerEmbed();
		embed.setTitle("Banana Logger");

		let guildId = undefined;

		if (command.inGuild()) {
			guildId = command.guildId;
		}

		embed.setDescription(hyperlink("Invite bot", getBotInviteLink(guildId)));

		command.reply({ embeds: [embed], ephemeral: true });
	}
});
