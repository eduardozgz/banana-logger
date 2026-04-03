import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes";

import { routes } from "@bl/common/Routes";

import { useNavigate } from "~/lib/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/lib/trpc";

export default function Page() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { guildId } = useTypedParams(routes.dashboard.servers.server);
  const trpc = useTRPC();
  const userGuildsQuery = useQuery(trpc.discord.userGuilds.queryOptions());

  useEffect(() => {
    if (!userGuildsQuery.data) return;
    if (!userGuildsQuery.data.userGuilds.size) return;
    if (guildId) return;

    const firstGuildId = [...userGuildsQuery.data.userGuilds.keys()][0];

    if (!firstGuildId) return;

    void navigate(
      routes.dashboard.servers.server.$buildPath({
        params: { guildId: firstGuildId },
      }),
    );
  }, [guildId, navigate, userGuildsQuery.data]);

  return (
    <div className="flex h-full grow flex-col items-center justify-center p-1">
      {!userGuildsQuery.isLoading && !userGuildsQuery.data?.userGuilds.size && (
        <div className="text-center">
          <h3 className="text-2xl font-semibold tracking-tight">
            {t("pages.dashboard.noServers.heading")}
          </h3>
          <p className="text-muted-foreground mt-2">
            {t("pages.dashboard.noServers.subheading")}
          </p>
        </div>
      )}
    </div>
  );
}
