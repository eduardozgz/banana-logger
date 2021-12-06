import { Guild, GuildTextBasedChannel, MessageEmbed } from "discord.js";
import _ from "lodash";
import { UserEventsType } from "../Constants";
import BananaLoggerEmbed from "../utils/BananaLoggerEmbed";
import { deepReplaceAll } from "../utils/deepReplaceAll";
import SettingsService from "./SettingsService";

type Data = Map<string, string>;

interface setupOptions {
	eventName: UserEventsType;
	guild: Guild;
	relatedChannels: string[];
	relatedUsers: string[];
}
export class LogService {
	static setup({
		eventName,
		guild,
		relatedChannels,
		relatedUsers
	}: setupOptions): [Data, (data: Data) => void] {
		const data: Data = new Map();
		const log = async (data: Data) => {
			try {
				for (const serviceSettings of await SettingsService.getByEventName(
					eventName,
					guild
				)) {
					const ignoredChannels = serviceSettings.ignoredChannels;
					_.pull(ignoredChannels, ...serviceSettings.watchChannels);
					const ignoredUsers = serviceSettings.ignoredUsers;
					_.pull(ignoredUsers, ...serviceSettings.watchUsers);

					ignoredUsers.push(guild.client.user.id);

					if (
						ignoredChannels.some((ignoredChannel) =>
							relatedChannels.includes(ignoredChannel)
						) ||
						ignoredUsers.some((ignoredUser) =>
							relatedUsers.includes(ignoredUser)
						)
					) {
						continue;
					}

					const template = serviceSettings.getTemplate(eventName);

					for (const [key, value] of data.entries()) {
						deepReplaceAll(template, key, value);
					}

					const channel = (await guild.channels.fetch(
						serviceSettings.id
					)) as GuildTextBasedChannel;
					channel.send({ embeds: [new BananaLoggerEmbed(template)] });
				}
			} catch (e) {
				console.error(e);
			}
		};

		return [data, log];
	}

	// TODO
	private static logQueue;
}
