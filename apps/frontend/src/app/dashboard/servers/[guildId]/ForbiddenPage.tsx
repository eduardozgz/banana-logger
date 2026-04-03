import { IconShieldOff } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes";

import { routes } from "@bl/common/Routes";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/lib/trpc";

export function ForbiddenPage() {
  const { t } = useTranslation();
  const { guildId } = useTypedParams(routes.dashboard.servers.server);

  const trpc = useTRPC();
  const userGuilds = useQuery(trpc.discord.userGuilds.queryOptions());
  const guild = userGuilds.data?.userGuilds.get(guildId!);

  return (
    <div className="m-auto flex min-h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <IconShieldOff className="size-16 text-muted-foreground" />
      <p className="text-muted-foreground">
        {t(
          "pages.dashboard.servers.forbiddenPage.message",
          "You don't have permission to manage {{guildName}}. You need the Manage Server permission in Discord.",
          { guildName: guild?.name ?? "this server" },
        )}
      </p>
    </div>
  );
}
