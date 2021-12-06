import { Guild, GuildTextBasedChannel, MessageEmbedOptions } from "discord.js";
import Constants, {
	UserEventsType,
	UserTemplateFieldNames
} from "../Constants";
import SettingsModel, { SettingsDocument } from "../models/SettingsModel";
import { toggleArrayItem } from "../utils/toggleArrayItem";
import UserError from "../utils/UserError";
import GlobalSettingsService from "./GlobalSettingsService";
import _ from "lodash";

export class SettingsService {
	private constructor(
		private doc: SettingsDocument,
		private globalSettingsService: GlobalSettingsService
	) {}

	public static async init(
		channel: GuildTextBasedChannel,
		globalSettingsService?: GlobalSettingsService | Guild
	): Promise<SettingsService> {
		const document = await SettingsModel.findOneAndUpdate(
			{ id: channel.id },
			{},
			{ new: true, upsert: true }
		);

		return new SettingsService(
			document,
			globalSettingsService instanceof GlobalSettingsService
				? globalSettingsService
				: await GlobalSettingsService.init(globalSettingsService)
		);
	}

	get id() {
		return this.doc.id;
	}

	get ignoredChannels() {
		return [
			...this.doc.ignoredChannels,
			...this.globalSettingsService.ignoredChannels
		];
	}

	async toggleIgnoreChannel(channelId: string): Promise<boolean> {
		const [result, wasAdded] = toggleArrayItem(
			this.doc.ignoredChannels,
			channelId
		);
		this.doc.ignoredChannels = result;
		this.doc.markModified("ignoredChannels");
		await this.doc.save();
		return wasAdded;
	}

	get watchChannels() {
		return [...this.doc.watchChannels];
	}

	async toggleWatchChannel(channelId: string): Promise<boolean> {
		const [result, wasAdded] = toggleArrayItem(
			this.doc.watchChannels,
			channelId
		);
		this.doc.watchChannels = result;
		this.doc.markModified("watchChannels");
		await this.doc.save();
		return wasAdded;
	}

	get ignoredUsers() {
		return [
			...this.doc.ignoredUsers,
			...this.globalSettingsService.ignoredUsers
		];
	}

	async toggleIgnoreUser(userId: string): Promise<boolean> {
		const [result, wasAdded] = toggleArrayItem(this.doc.ignoredUsers, userId);
		this.doc.ignoredUsers = result;
		this.doc.markModified("ignoredUsers");
		await this.doc.save();
		return wasAdded;
	}

	get watchUsers() {
		return [...this.doc.watchUsers];
	}

	async toggleWatchUser(userId: string): Promise<boolean> {
		const [result, wasAdded] = toggleArrayItem(this.doc.watchUsers, userId);
		this.doc.watchUsers = result;
		this.doc.markModified("watchUsers");
		await this.doc.save();
		return wasAdded;
	}

	getTemplate(event: string): MessageEmbedOptions {
		const globalTemplate = _.cloneDeep(
			this.globalSettingsService.getTemplate(event)
		);
		const template = _.cloneDeep(this.doc.templates.get(event));

		return _.defaultsDeep(template, globalTemplate);
	}

	async setTemplate(event: string, field: string, content: string) {
		const validEvents = Constants.UserEvents;
		const validFields = Object.keys(UserTemplateFieldNames);

		if (!validEvents.includes(event as UserEventsType))
			throw new UserError("Provided event is not valid");

		if (!validFields.includes(field))
			throw new UserError("Provided field template is not valid");

		let fieldToModify = field;
		let newContent: any = content === "default" ? undefined : content;

		if (["thumbnail", "image"].includes(field)) {
			newContent = { url: content };
		}

		this.doc.templates.set(event, {
			...this.doc.templates.get(event),
			[fieldToModify]: newContent
		});
		await this.doc.save();
	}

	get events(): UserEventsType[] {
		return [...this.doc.events];
	}

	async toggleEvent(event: "all" | UserEventsType): Promise<boolean> {
		const validEvents = Constants.UserEvents;
		let wasAdded;
		if (event === "all") {
			if (this.events.length === 0) {
				wasAdded = false;
				this.doc.events = [...Constants.UserEvents];
			} else {
				wasAdded = true;
				this.doc.events = [];
			}
		} else if (validEvents.includes(event)) {
			const [result, found] = toggleArrayItem(
				this.doc.events,
				event as UserEventsType
			);
			this.doc.events = result;
			wasAdded = found;
		} else {
			throw new UserError("Provided event is not valid");
		}
		this.doc.markModified("events");
		await this.doc.save();
		return wasAdded;
	}
}

export default SettingsService;
