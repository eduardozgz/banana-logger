import { botPermissions } from "@/common/botPermissions";
import { generateInviteLink } from "@/common/generateInviteLink";

import { EventHandler } from "../structures";

export const readyEvent = new EventHandler({
  name: "ready",
  handler: (client) => {
    const { logger } = client.botInstanceOptions;

    logger.info("Bot ready");
    logger.info(`Logged in as ${client.user.tag}`);
    logger.info(
      `Invite link: ${generateInviteLink({ clientId: client.user.id, permissions: botPermissions })}`,
    );
  },
});
