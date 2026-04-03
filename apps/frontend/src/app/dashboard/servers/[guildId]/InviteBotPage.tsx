import { useState } from "react";
import { IconClipboard, IconClipboardCheck, IconLink } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes";

import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/lib/trpc";

export function InviteBotPage() {
  const { t } = useTranslation();
  const { guildId } = useTypedParams(routes.dashboard.servers.server);
  const [copySuccess, setCopySuccess] = useState(false);

  const trpc = useTRPC();
  const userGuilds = useQuery(trpc.discord.userGuilds.queryOptions());
  const guild = userGuilds.data?.userGuilds.get(guildId!);

  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${encodeURIComponent(import.meta.env.VITE_DISCORD_CLIENT_ID ?? "")}&permissions=128&scope=bot&guild_id=${guildId}`;

  const hasManageGuild = guild?.hasManageGuild ?? false;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch {
      window.open(inviteUrl, "_blank");
    }
  };

  return (
    <div className="m-auto flex min-h-full flex-col items-center justify-center gap-5 p-6 text-center">
      <h1 className="text-3xl font-semibold">
        {t(
          "pages.dashboard.servers.inviteBotPage.title",
          "Bot not in this server",
        )}
      </h1>
      <p className="text-muted-foreground">
        {t(
          "pages.dashboard.servers.inviteBotPage.subtitle",
          "Banana Logger needs to be added to {{serverName}} before you can configure it.",
          { serverName: guild?.name ?? "this server" },
        )}
      </p>

      {hasManageGuild ? (
        <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg">
            <IconLink className="size-5" />
            {t(
              "pages.dashboard.servers.inviteBotPage.addToServer",
              "Add to {{serverName}}",
              { serverName: guild?.name ?? "Server" },
            )}
          </Button>
        </a>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {t(
              "pages.dashboard.servers.inviteBotPage.noPermission",
              "You don't have permission to add bots. Share this link with a server admin:",
            )}
          </p>
          <Button variant="outline" onClick={copyLink}>
            {copySuccess ? (
              <IconClipboardCheck className="size-4" />
            ) : (
              <IconClipboard className="size-4" />
            )}
            {copySuccess
              ? t("pages.dashboard.servers.inviteBotPage.linkCopied", "Copied!")
              : t(
                  "pages.dashboard.servers.inviteBotPage.copyLink",
                  "Copy invite link",
                )}
          </Button>
        </>
      )}
    </div>
  );
}
