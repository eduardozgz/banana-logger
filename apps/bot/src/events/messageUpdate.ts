// import { channelMention, userMention } from "@discordjs/builders";

// import { LogService } from "~/services/LogService";
// import { EventHandler } from "~/structures";

// export const messageUpdateEvent = new EventHandler({
//   name: "messageUpdate",
//   handler: async (oldMessage, newMessage) => {
//     if (!oldMessage.guild) return;
//     if (oldMessage.partial) await oldMessage.fetch();

//     // TODO attachments

//     await LogService.log({
//       eventName: "messageUpdate",
//       relatedUsers: [oldMessage.author?.id],
//       relatedChannels: [],
//       guild: oldMessage.guild,
//       data: {
//         OLD_CONTENT: oldMessage.content ?? "Unknown old content",
//         NEW_CONTENT: newMessage.content,
//         MESSAGE_URL: oldMessage.url,
//         CHANNEL_MENTION: channelMention(oldMessage.channel.id),
//         AUTHOR_MENTION: userMention(oldMessage.author.id),
//         AUTHOR_AVATAR: oldMessage.author.displayAvatarURL(),
//       },
//     });
//   },
// });
