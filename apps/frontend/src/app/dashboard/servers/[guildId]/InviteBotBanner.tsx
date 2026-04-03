import { useState } from "react";
import { IconRobot, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes";

import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/lib/trpc";

export function InviteBotBanner() {
  const { t } = useTranslation();
  const [closed, setClosed] = useState(false);
  const { guildId } = useTypedParams(routes.dashboard.servers.server);

  const trpc = useTRPC();
  const guild = useQuery(trpc.discord.getGuild.queryOptions(
    { id: guildId! },
    { enabled: !!guildId, retry: false },
  ));

  if (guild.isPending || guild.data || closed) return null;

  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${encodeURIComponent(import.meta.env.VITE_DISCORD_CLIENT_ID ?? "")}&permissions=128&scope=bot&guild_id=${guildId}`;

  return (
    <div className="flex w-full items-center gap-2 bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
      <IconRobot className="size-4 shrink-0" />
      <p>
        {t(
          "pages.dashboard.servers.inviteBotBanner.message",
          "The bot appears to have left this server.",
        )}{" "}
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {t(
            "pages.dashboard.servers.inviteBotBanner.reinvite",
            "Re-invite it",
          )}
        </a>
      </p>
      <Button
        variant="ghost"
        size="icon-sm"
        className="ml-auto shrink-0 text-primary-foreground hover:bg-primary/80"
        onClick={() => setClosed(true)}
      >
        <IconX className="size-3" />
      </Button>
    </div>
  );
}
