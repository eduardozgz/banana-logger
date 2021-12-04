import { Guild, MessageEmbedOptions } from "discord.js";
import Constants, {
	UserEventNames,
	UserEventsType,
	UserTemplateFieldNames
} from "../Constants";
import GlobalSettingsModel, {
	GlobalSettingsDocument
} from "../models/GlobalSettingsModel";
import { toggleArrayItem } from "../utils/toggleArrayItem";
import UserError from "../utils/UserError";
import _ from "lodash";
export class GlobalSettingsService {
	private constructor(private doc: GlobalSettingsDocument) {}

	public static async init(guild: Guild): Promise<GlobalSettingsService> {
		const document = await GlobalSettingsModel.findOneAndUpdate(
			{ id: guild.id },
			{},
			{ new: true, upsert: true }
		);

		return new GlobalSettingsService(document);
	}

	get id() {
		return this.doc.id;
	}

	get ignoredChannels() {
		return this.doc.ignoredChannels;
	}
	async toggleIgnoreChannel(channelId: string) {
		this.doc.ignoredChannels = toggleArrayItem(
			this.doc.ignoredChannels,
			channelId
		);
		this.doc.markModified("ignoredChannels");
		await this.doc.save();
	}

	get ignoredUsers() {
		return this.doc.ignoredUsers;
	}
	async toggleIgnoreUser(userId: string) {
		this.doc.ignoredUsers = toggleArrayItem(this.doc.ignoredUsers, userId);
		this.doc.markModified("ignoredUsers");
		await this.doc.save();
	}

	getTemplate(event: string): MessageEmbedOptions {
		const validEvents = Constants.UserEvents;
		if (!validEvents.includes(event as UserEventsType))
			throw new UserError("Provided event is not valid");

		const baseTemplate = _.cloneDeep(Constants.EmbedTemplateBase[event]);
		const template = _.cloneDeep(this.doc.templates.get(event));

		return _.defaultsDeep(template, baseTemplate);
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
}

export default GlobalSettingsService;
