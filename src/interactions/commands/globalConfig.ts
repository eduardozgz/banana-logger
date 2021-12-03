import { SlashCommandBuilder } from "@discordjs/builders";
import { GuildCommand } from "../../structures";
import { UserTemplateFieldNames } from "../../Constants";

export const globalConfig = new GuildCommand({
	definition: new SlashCommandBuilder()
		.setName("global-config")
		.setDescription("Global configurations applied to all channels")
		.addSubcommand((subCommand) =>
			subCommand
				.setName("show")
				.setDescription("Shows the configurations applied to all the channels")
		)
		.addSubcommand((subCommand) =>
			subCommand
				.setName("ignore-channel")
				.setDescription("Ignores any event coming from the specified channel")
				.addChannelOption((channelOption) =>
					channelOption
						.setName("channel")
						.setDescription("Channel to ignore")
						.setRequired(true)
				)
		)
		.addSubcommand((subCommand) =>
			subCommand
				.setName("ignore-user")
				.setDescription("Ignores any event related from the specified user")
				.addUserOption((userOption) =>
					userOption
						.setName("user")
						.setDescription("User to ignore")
						.setRequired(true)
				)
		)
		.addSubcommand((subCommand) =>
			subCommand
				.setName("template")
				.setDescription("Sets the template that will be used to log an event")
				.addStringOption((stringOption) =>
					stringOption
						.setName("event")
						.setDescription("Sets the log template for this event")
						.setRequired(true)
						.setAutocomplete(true)
				)
				.addStringOption((stringOption) =>
					stringOption
						.setName("field")
						.setDescription("Specifies the field of the template")
						.setRequired(true)
						.addChoices(
							Object.entries(UserTemplateFieldNames).map(([k, v]) => [v, k])
						)
				)
				.addStringOption((stringOption) =>
					stringOption
						.setName("content")
						.setDescription("Sets the content for the specified field")
						.setRequired(true)
				)
		) as SlashCommandBuilder,
	execute: {
		show: (command) => {},
		["ignore-channel"]: (command) => {},
		["ignore-user"]: (command) => {},
		template: (command) => {}
	}
});
