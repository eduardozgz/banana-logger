import { getBotInviteLink } from "@/common/getBotInviteLink";

import { EventHandler } from "../structures";

export const readyEvent = new EventHandler({
  name: "ready",
  handler: (client) => {
    const { logger } = client.botInstanceOptions;

    logger.info("Bot ready");
    logger.info(`Logged in as ${client.user.tag}`);
    logger.info(`Invite link: ${getBotInviteLink()}`);

    client.guilds.cache.forEach(
      (guild) =>
        void guild.members.fetch().catch((err) => {
          logger.error(
            `Error while fetching members of guild ${guild.id}`,
            err,
          );
        }),
    );
  },
});
