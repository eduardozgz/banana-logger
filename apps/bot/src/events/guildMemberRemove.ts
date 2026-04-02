import { userMention } from "discord.js";

import { initI18n } from "@/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";

export const guildMemberRemoveEvent = new EventHandler({
  name: "guildMemberRemove",
  handler: async (_client, member) => {
    const i18n = await initI18n(member.guild.preferredLocale);

    void LogService.log({
      eventName: "memberLeave",
      guild: member.guild,
      i18n,
      relatedChannels: [],
      relatedUsers: [member.id],
      data: {
        USER_MENTION: userMention(member.id),
        USER_NAME: member.user.username,
        USER_ID: member.id,
        USER_AVATAR: member.displayAvatarURL(),
      },
    });
  },
});
