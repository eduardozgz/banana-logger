// import { userMention } from "@discordjs/builders";

// import { LogService } from "~/services/LogService";
// import { EventHandler } from "~/structures";

// export const guildBanRemoveEvent = new EventHandler({
//   name: "guildBanRemove",
//   handler: async (ban) => {
//     // TODO get from audit logs who did this
//     await LogService.log({
//       eventName: "guildBanRemove",
//       relatedUsers: [ban.user.id],
//       relatedChannels: [],
//       guild: ban.guild,
//       data: {
//         MEMBER_BANNED_MENTION: userMention(ban.user.id),
//         MOD_MENTION: userMention(null),
//         UNBAN_MOD_MENTION: userMention(null),
//         REASON: ban.reason ?? "Unspecified",
//       },
//     });
//   },
// });
