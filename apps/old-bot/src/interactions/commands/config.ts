import {
	bold,
	channelMention,
	quote,
	SlashCommandBuilder,
	underscore,
	userMention
} from "@discordjs/builders";
import { GuildCommand } from "../../structures";
import Constants, {
	UserEventNames,
	UserEventsType,
	UserTemplateFieldNames
} from "../../Constants";
import { GuildTextBasedChannel, Intents, TextBasedChannels } from "discord.js";
import safeDiscordString from "../../utils/safeDiscordString";
import BananaLoggerEmbed from "../../utils/BananaLoggerEmbed";
import Paginator from "../../utils/Paginator";
import SettingsService from "../../services/SettingsService";

function checkChannelType(channel: TextBasedChannels): GuildTextBasedChannel {
	let rchannel: GuildTextBasedChannel;

	if (channel.isThread()) {
		rchannel = channel.parent;
	} else if (channel.type === "GUILD_NEWS" || channel.type === "GUILD_TEXT") {
		rchannel = channel;
	} else {
		throw new Error(
			"User used the command in a channel that is not a text, news nor thread channel"
		);
	}

	return rchannel;
}

export const config = new GuildCommand({
	definition: new SlashCommandBuilder()
		.setName("config")
		.setDescription("Configurations applied to this channel")
		.addSubcommand((subCommand) =>
			subCommand
				.setName("show")
				.setDescription("Shows the configurations applied to this channel")
		)
		.addSubcommand((subCommand) =>
			subCommand
				.setName("toggle-log")
				.setDescription("Starts or stops logging the specified event")
				.addStringOption((stringOption) =>
					stringOption
						.setName("event")
						.setDescription("A specific event or all")
						.setRequired(true)
						.setAutocomplete(true)
				)
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
				.setName("toggle-watch-channel")
				.setDescription(
					"Explicitly logs events that comes from the specified channel"
				)
				.addChannelOption((channelOption) =>
					channelOption
						.setName("channel")
						.setDescription("Channel to toggle the watch status")
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
				.setName("toggle-watch-user")
				.setDescription(
					"Explicitly logs events that are related to the specified user"
				)
				.addUserOption((userOption) =>
					userOption
						.setName("user")
						.setDescription("User to toggle the watch status")
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
	neededIntents: new Intents(["GUILDS"]),
	execute: {
		show: async (command) => {
			const channel = checkChannelType(command.channel);

			const settingsService = await SettingsService.init(
				channel,
				command.guild
			);

			let settingsContent = "";

			const eventsLoggedString = settingsService.events.length
				? settingsService.events
						.map((event) => UserEventNames[event])
						.join(", ")
				: "There are no events being logged";
			settingsContent += `${bold(
				underscore("EVENTS")
			)}:\n${eventsLoggedString}\n\n`;

			// Ignored users
			const ignoredUsersString = settingsService.ignoredUsers.length
				? settingsService.ignoredUsers
						.map((user) => userMention(user))
						.join(", ")
				: "There are no users being ignored";
			settingsContent += `${bold(
				underscore("IGNORED USERS")
			)}:\n${ignoredUsersString}\n\n`;

			// Users being watched
			const watchUsersString = settingsService.watchUsers.length
				? settingsService.watchUsers.map((user) => userMention(user)).join(", ")
				: "There are no users being watched";
			settingsContent += `${bold(
				underscore("WATCHED USERS")
			)}:\n${watchUsersString}\n\n`;

			// Ignored channels
			const ignoredChannelsString = settingsService.ignoredChannels.length
				? settingsService.ignoredChannels
						.map((channel) => channelMention(channel))
						.join(", ")
				: "There are no channels being ignored";
			settingsContent += `${bold(
				underscore("IGNORED CHANNELS")
			)}:\n${ignoredChannelsString}\n\n`;

			// Watched channels
			const watchedChannelsString = settingsService.watchChannels.length
				? settingsService.watchChannels
						.map((channel) => channelMention(channel))
						.join(", ")
				: "There are no channels being watched";
			settingsContent += `${bold(
				underscore("WATCHED CHANNELS")
			)}:\n${watchedChannelsString}\n\n`;

			// Templates
			const tempaltesContent = Object.entries(Constants.UserEventNames)
				.map(([code, name]) => {
					const {
						title,
						description,
						thumbnail,
						image,
						color,
						url
					} = settingsService.getTemplate(code);

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

			const embeds = [];

			safeDiscordString(settingsContent).forEach((portion) => {
				const embed = new BananaLoggerEmbed();
				embed.setTitle("Settings for #" + channel.name);
				embed.setDescription(portion);
				embeds.push(embed);
			});

			safeDiscordString(tempaltesContent, 500).forEach((portion) => {
				const embed = new BananaLoggerEmbed();
				embed.setTitle("Templates for #" + channel.name);
				embed.setDescription(portion);
				embeds.push(embed);
			});

			const paginator = new Paginator(command, embeds, true);
			await paginator.displayPage(0);
		},
		["toggle-log"]: async (command) => {
			const channel = checkChannelType(command.channel);

			const settingsService = await SettingsService.init(
				channel,
				command.guild
			);

			const eventToToggle = command.options.getString("event") as
				| "all"
				| UserEventsType;

			const wasBeingLogged = await settingsService.toggleEvent(eventToToggle);

			const embed = new BananaLoggerEmbed();
			embed.setTitle("Done!");

			embed.setDescription(
				(eventToToggle === "all"
					? "Everything"
					: UserEventNames[eventToToggle]) +
					(wasBeingLogged
						? ` is not being logged anymore`
						: ` is now being logged`)
			);
			await command.reply({ embeds: [embed], ephemeral: true });
		},
		["toggle-ignore-channel"]: async (command) => {
			const channel = checkChannelType(command.channel);

			const settingsService = await SettingsService.init(
				channel,
				command.guild
			);

			const channelToToggle = command.options.getChannel("channel");

			const wasIgnored = await settingsService.toggleIgnoreChannel(
				channelToToggle.id
			);

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
		["toggle-watch-channel"]: async (command) => {
			const channel = checkChannelType(command.channel);

			const settingsService = await SettingsService.init(
				channel,
				command.guild
			);
			const channelToToggle = command.options.getChannel("channel");

			const wasWatched = await settingsService.toggleWatchChannel(
				channelToToggle.id
			);

			const embed = new BananaLoggerEmbed();
			embed.setTitle("Done!");

			embed.setDescription(
				channelMention(channelToToggle.id) +
					(wasWatched
						? ` is not being watched anymore`
						: ` is now being watched`)
			);
			await command.reply({ embeds: [embed], ephemeral: true });
		},
		["toggle-ignore-user"]: async (command) => {
			const channel = checkChannelType(command.channel);

			const settingsService = await SettingsService.init(
				channel,
				command.guild
			);

			const userToToggle = command.options.getUser("user");

			const wasIgnored = await settingsService.toggleIgnoreUser(
				userToToggle.id
			);

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
		["toggle-watch-user"]: async (command) => {
			const channel = checkChannelType(command.channel);

			const settingsService = await SettingsService.init(
				channel,
				command.guild
			);

			const userToToggle = command.options.getUser("user");

			const wasWatched = await settingsService.toggleWatchUser(userToToggle.id);

			const embed = new BananaLoggerEmbed();
			embed.setTitle("Done!");

			embed.setDescription(
				userMention(userToToggle.id) +
					(wasWatched
						? ` is not being watched anymore`
						: ` is now being watched`)
			);
			await command.reply({ embeds: [embed], ephemeral: true });
		},
		template: async (command) => {
			const channel = checkChannelType(command.channel);

			const settingsService = await SettingsService.init(
				channel,
				command.guild
			);

			const event = command.options.getString("event");
			const field = command.options.getString("field");
			const content = command.options.getString("content");

			await settingsService.setTemplate(event, field, content);

			const embed = new BananaLoggerEmbed();

			embed.setTitle("Done!");
			embed.setDescription(
				"The template has been modified, it will looks like this"
			);

			const embedPreview = new BananaLoggerEmbed(
				settingsService.getTemplate(event)
			);
			await command.reply({
				embeds: [embed, embedPreview],
				ephemeral: true
			});
		}
	}
});
