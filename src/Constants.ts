import {
	ClientEvents,
	IntentsString,
	MessageEmbedOptions,
	WSEventType
} from "discord.js";

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

// some of (keyof DiscordJS.ClientEvents)
export const UserEventsString = [
	"applicationCommandCreate",
	"applicationCommandDelete",
	"applicationCommandUpdate",
	"channelCreate",
	"channelDelete",
	"channelPinsUpdate",
	"channelUpdate",
	"emojiCreate",
	"emojiDelete",
	"emojiUpdate",
	"guildBanAdd",
	"guildBanRemove",
	"guildIntegrationsUpdate",
	"guildMemberAdd",
	"guildMemberRemove",
	"guildMemberUpdate",
	"guildUpdate",
	"inviteCreate",
	"inviteDelete",
	"messageCreate",
	"messageDelete",
	"messageReactionRemoveAll",
	"messageReactionRemoveEmoji",
	"messageDeleteBulk",
	"messageReactionAdd",
	"messageReactionRemove",
	"messageUpdate",
	"roleCreate",
	"roleDelete",
	"roleUpdate",
	"threadCreate",
	"threadDelete",
	"threadMemberUpdate",
	"threadMembersUpdate",
	"threadUpdate",
	"userUpdate",
	"voiceStateUpdate",
	"webhookUpdate",
	"stageInstanceCreate",
	"stageInstanceUpdate",
	"stageInstanceDelete",
	"stickerCreate",
	"stickerDelete",
	"stickerUpdate"
] as const;

export type UserEventsType = typeof UserEventsString[number];

// TODO do all
//@ts-ignore
export const UserEventNames: { [key in UserEventsType]: string } = {
	guildMemberAdd: "member join",
	guildMemberRemove: "member leave",
	messageDelete: "delete message",
	messageUpdate: "edit message"
};

// TODO do all
//@ts-ignore
export const EmbedTemplateBase: {
	[key in UserEventsType]: MessageEmbedOptions;
} = {
	guildMemberAdd: {
		title: "A member joined the server",
		description: "{MEMBER_MENTION} joined the server.",
		thumbnail: { url: "{MEMBER_AVATAR}" }
	},
	guildMemberRemove: {
		title: "A member left the server",
		description: "{MEMBER_MENTION} left the server.",
		thumbnail: { url: "{MEMBER_AVATAR}" }
	},
	messageDelete: {
		title: "A message has been deleted",
		description:
			"{AUTHOR_MENTION} deleted a [message]({MESSAGE_URL}) in {CHANNEL_MENTION}\n\n__**Content:**__\n{OLD_CONTENT}"
	},
	messageUpdate: {
		title: "A message has been edited",
		description:
			"{AUTHOR_MENTION} edited this [message]({MESSAGE_URL}) in {CHANNEL_MENTION}\n\n__**Old content:**__\n{OLD_CONTENT}\n\n__**New content:**__\n{NEW_CONTENT}"
	}
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
	UserEvents: UserEventsString,
	UserEventNames,
	EmbedTemplateBase,
	UserTemplateFieldNames
};

export default Constants;
