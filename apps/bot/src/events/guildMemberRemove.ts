// import { userMention } from "@discordjs/builders";

// import { LogService } from "~/services/LogService";
// import { EventHandler } from "~/structures";

// export const guildMemberRemoveEvent = new EventHandler({
//   name: "guildMemberRemove",
//   handler: async (member) => {
//     // TODO get what invite was used
//     await LogService.log({
//       eventName: "guildMemberRemove",
//       relatedUsers: [member.id],
//       relatedChannels: [],
//       guild: member.guild,
//       data: {
//         MEMBER_MENTION: userMention(member.id),
//         MEMBER_AVATAR: member.displayAvatarURL(),
//       },
//     });
//   },
// });
