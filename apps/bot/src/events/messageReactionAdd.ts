// import { channelMention, formatEmoji, userMention } from "@discordjs/builders";

// import { LogService } from "~/services/LogService";
// import { EventHandler } from "~/structures";
// import { twemojiURL } from "../utils/twemoji";

// export const messageReactionAddEvent = new EventHandler({
//   name: "messageReactionAdd",
//   handler: async (reaction, user) => {
//     if (reaction.message.inGuild()) {
//       if (reaction.partial) await reaction.message.fetch();
//       // TODO: improve this
//       {
//         const { message, emoji } = reaction;
//         await LogService.log({
//           eventName: "messageReactionAdd",
//           relatedUsers: [user.id, message.author.id],
//           relatedChannels: [message.channelId],
//           guild: message.guild,
//           data: {
//             REACTOR_MENTION: userMention(user.id),
//             REACTION_EMOJI: emoji.id
//               ? formatEmoji(emoji.id, emoji.animated ?? false)
//               : (emoji.name ?? ""),
//             AUTHOR_MENTION: userMention(message.author.id),
//             MESSAGE_URL: message.url,
//             CHANNEL_MENTION: channelMention(message.channelId),
//             REACTION_IMAGE_URL: emoji.url ?? twemojiURL(emoji.name ?? ""),
//           },
//         });
//       }
//     }
//   },
// });
