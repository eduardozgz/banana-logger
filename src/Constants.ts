import { IntentsString, WSEventType } from "discord.js";

export const Colors = {
	RED: 0xed4245,
	GREEN: 0x57f287,
	YELLOW: 0xfee75c,
	BLURPLE: 0x5865f2,
	FUCHSIA: 0xeb459e,
	WHITE: 0xffffff,
	BLACK: 0x000000
};

type IntentsEventMap = {
	[key in IntentsString]: WSEventType[];
};

export const IntentsEventMap: IntentsEventMap = {
	GUILDS: [
		"GUILD_CREATE",
		"GUILD_UPDATE",
		"GUILD_DELETE",
		"GUILD_ROLE_CREATE",
		"GUILD_ROLE_UPDATE",
		"GUILD_ROLE_DELETE",
		"CHANNEL_CREATE",
		"CHANNEL_UPDATE",
		"CHANNEL_DELETE",
		"CHANNEL_PINS_UPDATE",
		"THREAD_CREATE",
		"THREAD_UPDATE",
		"THREAD_DELETE",
		"THREAD_MEMBER_UPDATE",
		"STAGE_INSTANCE_CREATE",
		"STAGE_INSTANCE_UPDATE",
		"STAGE_INSTANCE_DELETE"
	],
	GUILD_MEMBERS: [
		"GUILD_MEMBER_ADD",
		"GUILD_MEMBER_UPDATE",
		"GUILD_MEMBER_REMOVE",
		"THREAD_MEMBERS_UPDATE"
	],
	GUILD_BANS: ["GUILD_BAN_ADD", "GUILD_BAN_REMOVE"],
	GUILD_EMOJIS_AND_STICKERS: ["GUILD_EMOJIS_UPDATE", "GUILD_STICKERS_UPDATE"],
	GUILD_INTEGRATIONS: [
		"GUILD_INTEGRATIONS_UPDATE"
		// "INTEGRATION_CREATE",
		// "INTEGRATION_UPDATE",
		// "INTEGRATION_DELETE"
	],
	GUILD_WEBHOOKS: ["WEBHOOKS_UPDATE"],
	GUILD_INVITES: ["INVITE_CREATE", "INVITE_DELETE"],
	GUILD_VOICE_STATES: ["VOICE_STATE_UPDATE"],
	GUILD_PRESENCES: ["PRESENCE_UPDATE"],
	GUILD_MESSAGES: [
		"MESSAGE_CREATE",
		"MESSAGE_UPDATE",
		"MESSAGE_DELETE",
		"MESSAGE_DELETE_BULK"
	],
	GUILD_MESSAGE_REACTIONS: [
		"MESSAGE_REACTION_ADD",
		"MESSAGE_REACTION_REMOVE",
		"MESSAGE_REACTION_REMOVE_ALL",
		"MESSAGE_REACTION_REMOVE_EMOJI"
	],
	GUILD_MESSAGE_TYPING: ["TYPING_START"],
	DIRECT_MESSAGES: [
		"MESSAGE_CREATE",
		"MESSAGE_UPDATE",
		"MESSAGE_DELETE",
		"CHANNEL_PINS_UPDATE"
	],
	DIRECT_MESSAGE_REACTIONS: [
		"MESSAGE_REACTION_ADD",
		"MESSAGE_REACTION_REMOVE",
		"MESSAGE_REACTION_REMOVE_ALL",
		"MESSAGE_REACTION_REMOVE_EMOJI"
	],
	DIRECT_MESSAGE_TYPING: ["TYPING_START"]
};

export const UserEventNames: { [key in WSEventType]?: string } = {
	GUILD_MEMBER_ADD: "member join",
	GUILD_MEMBER_UPDATE: "member update",
	GUILD_MEMBER_REMOVE: "member leave",
	GUILD_BAN_ADD: "member ban",
	GUILD_BAN_REMOVE: "member ban remove",
	CHANNEL_CREATE: "new channel",
	CHANNEL_UPDATE: "edit channel",
	CHANNEL_DELETE: "delete channel",
	CHANNEL_PINS_UPDATE: "message pin update",
	GUILD_ROLE_CREATE: "new role",
	GUILD_ROLE_UPDATE: "edit role",
	GUILD_ROLE_DELETE: "delete role",
	GUILD_UPDATE: "update guild",
	GUILD_EMOJIS_UPDATE: "emoji update",
	GUILD_STICKERS_UPDATE: "stickers update",
	MESSAGE_CREATE: "new message",
	MESSAGE_UPDATE: "message edit",
	MESSAGE_DELETE: "message delete",
	MESSAGE_DELETE_BULK: "bulk message delete",
	MESSAGE_REACTION_ADD: "new reaction",
	MESSAGE_REACTION_REMOVE: "reaction remove",
	MESSAGE_REACTION_REMOVE_EMOJI: "remove emoji",
	INVITE_CREATE: "invite create",
	INVITE_DELETE: "invite delete",
	VOICE_STATE_UPDATE: "voice state update"
	// TODO add the rest of the events with autocomplete interaction
};

export const UserTemplateFieldNames: { [key: string]: string } = {
	title: "title",
	description: "description",
	thumbnail: "thumbnail url",
	image: "image url",
	color: "color",
	url: "title url"
};

export const Constants = {
	Colors,
	IntentsEventMap,
	UserEventNames,
	UserTemplateFieldNames
};

export default Constants;
