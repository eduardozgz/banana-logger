import {
	blockQuote,
	bold,
	channelMention,
	quote,
	SlashCommandBuilder,
	underscore,
	userMention
} from "@discordjs/builders";
import { GuildCommand } from "../../structures";
import Constants, { UserTemplateFieldNames } from "../../Constants";
import GlobalSettingsService from "../../services/GlobalSettingsService";
import BananaLoggerEmbed from "../../utils/BananaLoggerEmbed";
import Paginator from "../../utils/Paginator";
import safeDiscordString from "../../utils/safeDiscordString";
import { Intents } from "discord.js";

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
				.setName("toggle-ignore-channel")
				.setDescription("Ignores any event coming from the specified channel")
				.addChannelOption((channelOption) =>
					channelOption
						.setName("channel")
						.setDescription("Channel to toggle the ignore status")
						.setRequired(true)
				)
		)
		.addSubcommand((subCommand) =>
			subCommand
				.setName("toggle-ignore-user")
				.setDescription("Ignores any event related from the specified user")
				.addUserOption((userOption) =>
					userOption
						.setName("user")
						.setDescription("User to toggle the ignore status")
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
		show: async (command) => {
			const globalSettingsService = await GlobalSettingsService.init(
				command.guild
			);

			let settingsContent = "";

			// Ignored users
			const ignoredUsersString = globalSettingsService.ignoredUsers.length
				? globalSettingsService.ignoredUsers
						.map((user) => userMention(user))
						.join(", ")
				: "There are no users being ignored globally";
			settingsContent += `${bold(
				underscore("IGNORED USERS")
			)}:\n${ignoredUsersString}\n\n`;

			// Ignored channels
			const ignoredChannelsString = globalSettingsService.ignoredChannels.length
				? globalSettingsService.ignoredChannels
						.map((channel) => channelMention(channel))
						.join(", ")
				: "There are no channels being ignored globally";
			settingsContent += `${bold(
				underscore("IGNORED CHANNELS")
			)}:\n${ignoredChannelsString}\n\n`;

			// Templates
			const templatesString = Object.entries(Constants.UserEventNames)
				.map(([code, name]) => {
					const {
						title,
						description,
						thumbnail,
						image,
						color,
						url
					} = globalSettingsService.getTemplate(code);

					let template = `${underscore(name)}:\n`;
					template += quote(`title: ${title}\n`);
					template += quote(`description: ${description}\n`);
					template += quote(`thumbnail: ${thumbnail?.url}\n`);
					template += quote(`image: ${image?.url}\n`);
					template += quote(`color: ${color}\n`);
					template += quote(`url: ${url}\n`);

					return template;
				})
				.join("\n");

			settingsContent += `${bold(
				underscore("TEMPLATES")
			)}:\n${templatesString}\n\n`;

			const embeds = [];

			// TODO remove split by 100, used for testing paginator
			safeDiscordString(settingsContent, 100).forEach(
				(settingsContentPortion) => {
					const embed = new BananaLoggerEmbed();
					embed.setTitle("Global settings (applied to all channels)");
					embed.setDescription(settingsContentPortion);
					embeds.push(embed);
				}
			);

			const paginator = new Paginator(command, embeds, true);
			await paginator.displayPage(0);
		},
		["toggle-ignore-channel"]: async (command) => {
			const globalSettingsService = await GlobalSettingsService.init(
				command.guild
			);
			const channelToToggle = command.options.getChannel("channel");

			const wasIgnored = globalSettingsService.ignoredChannels.includes(
				channelToToggle.id
			);
			await globalSettingsService.toggleIgnoreChannel(channelToToggle.id);

			const embed = new BananaLoggerEmbed();
			embed.setTitle("Done!");

			embed.setDescription(
				channelMention(channelToToggle.id) +
					(wasIgnored
						? ` is not being ignored anymore`
						: ` is now being ignored`)
			);
			await command.reply({ embeds: [embed], ephemeral: true });
		},
		["toggle-ignore-user"]: async (command) => {
			const globalSettingsService = await GlobalSettingsService.init(
				command.guild
			);
			const userToToggle = command.options.getUser("user");

			const wasIgnored = globalSettingsService.ignoredUsers.includes(
				userToToggle.id
			);
			await globalSettingsService.toggleIgnoreUser(userToToggle.id);

			const embed = new BananaLoggerEmbed();
			embed.setTitle("Done!");

			embed.setDescription(
				userMention(userToToggle.id) +
					(wasIgnored
						? ` is not being ignored anymore`
						: ` is now being ignored`)
			);
			await command.reply({ embeds: [embed], ephemeral: true });
		},
		template: async (command) => {
			const globalSettingsService = await GlobalSettingsService.init(
				command.guild
			);
			const event = command.options.getString("event");
			const field = command.options.getString("field");
			const content = command.options.getString("content");

			await globalSettingsService.setTemplate(event, field, content);

			const embed = new BananaLoggerEmbed();

			embed.setTitle("Done!");
			embed.setDescription(
				"The template has been modified, it will looks like this"
			);

			const embedPreview = new BananaLoggerEmbed(
				globalSettingsService.getTemplate(event)
			);
			await command.reply({ embeds: [embed, embedPreview], ephemeral: true });
		}
	}
});
