import { GuildChannel, WSEventType } from "discord.js";
import { UserEventNames, UserTemplateFieldNames } from "../Constants";
import SettingsModel, { SettingsDocument } from "../models/SettingsModel";
import { toggleArrayItem } from "../utils/toggleArrayItem";
import UserError from "../utils/UserError";

export class SettingsService {
	private constructor(private doc: SettingsDocument) {}

	public static async init(channel: GuildChannel): Promise<SettingsService> {
		const document = await SettingsModel.findOneAndUpdate(
			{ id: channel.id },
			{},
			{ new: true, upsert: true }
		);

		return new SettingsService(document);
	}

	get id() {
		return this.doc.id;
	}

	get ignoredChannels() {
		return this.doc.ignoredChannels;
	}

	async toggleIgnoreChannel(channelId) {
		this.doc.ignoredChannels = toggleArrayItem(
			this.doc.ignoredChannels,
			channelId
		);
		this.doc.markModified("ignoredChannels");
		await this.doc.save();
	}

	get watchChannels() {
		return this.doc.watchChannels;
	}

	async toggleWatchChannels(channelId) {
		this.doc.watchChannels = toggleArrayItem(this.doc.watchChannels, channelId);
		this.doc.markModified("watchChannels");
		await this.doc.save();
	}

	get ignoredUsers() {
		return this.doc.ignoredUsers;
	}

	async toggleIgnoreUser(userId) {
		this.doc.ignoredUsers = toggleArrayItem(this.doc.ignoredUsers, userId);
		this.doc.markModified("ignoredUsers");
		await this.doc.save();
	}

	get watchUsers() {
		return this.doc.watchUsers;
	}

	async toggleWatchUsers(userId) {
		this.doc.watchUsers = toggleArrayItem(this.doc.watchUsers, userId);
		this.doc.markModified("watchUsers");
		await this.doc.save();
	}

	get templates() {
		return this.doc.templates;
	}

	setTemplate(event: WSEventType, field: string, content: string) {
		const validEvents = Object.keys(UserEventNames);
		const validFields = Object.keys(UserTemplateFieldNames);

		if (!validEvents.includes(event))
			throw new UserError("Provided event is not valid");

		if (!validFields.includes(field))
			throw new UserError("Provided field template is not valid");

		let fieldToModify = field;
		let newContent: any = content;

		if (["thumbnail", "image"].includes(field)) {
			newContent = { url: content };
		}

		this.doc.templates.set(event, {
			...this.doc.templates.get(event),
			[fieldToModify]: newContent
		});
	}
}

export default SettingsService;
