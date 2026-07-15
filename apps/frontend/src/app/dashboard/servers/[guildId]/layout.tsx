import { useContext } from "react";
import { routes } from "@bl/common/Routes";
import { Separator } from "@bl/ui/components/separator";
import { Skeleton } from "@bl/ui/components/skeleton";
import { cn } from "@bl/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { useTypedParams } from "react-router-typesafe-routes";

import { useTRPC } from "~/lib/trpc";
import { MenuContext } from "../../Menu";
import { ForbiddenPage } from "./ForbiddenPage";
import { InviteBotBanner } from "./InviteBotBanner";
import { InviteBotPage } from "./InviteBotPage";
import { ServerNavMenu } from "./ServerNavMenu/ServerNavMenu";

export default function Layout() {
  const { guildId } = useTypedParams(routes.dashboard.servers.server);
  const menuContext = useContext(MenuContext);

  const trpc = useTRPC();
  const userGuilds = useQuery(trpc.discord.userGuilds.queryOptions());
  const has = useQuery(
    trpc.guild.has.queryOptions(
      { guildId: guildId ?? "" },
      { enabled: !!guildId },
    ),
  );

  if (!guildId) return null;

  const guild = userGuilds.data?.userGuilds.get(guildId);
  const canManage = guild?.hasManageGuild ?? false;

  const loadingSkeleton = (
    <div className="m-auto flex min-h-full flex-col items-center justify-center gap-4 p-6">
      <Skeleton className="h-8 w-48 rounded-xl" />
      <Skeleton className="h-4 w-64 rounded-xl" />
    </div>
  );

  // Wait for the guild list first — it decides manage permission and, unlike
  // guild.has, does not error for non-managers.
  if (userGuilds.isPending) return loadingSkeleton;

  // Decide "forbidden" from the guild list, NOT from guild.has: that query throws
  // FORBIDDEN for non-managers, so gating the exit-loading on its success left
  // the page stuck on the skeleton forever.
  if (!canManage) {
    return <ForbiddenPage />;
  }

  // Manager: now gate on the bot-presence check.
  if (has.isPending) return loadingSkeleton;

  if (!has.data) {
    return <InviteBotPage />;
  }

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden rounded">
      <InviteBotBanner />
      <div className="grow overflow-hidden">
        <div className="flex h-full max-h-full w-full">
          <ServerNavMenu
            className={cn("w-full sm:w-[240px] sm:min-w-[240px]", {
              "hidden sm:flex": !menuContext?.isOpen,
            })}
          />
          <Separator orientation="vertical" className="hidden sm:block" />
          <main
            className={cn("h-full grow overflow-hidden", {
              "hidden sm:block": menuContext?.isOpen,
            })}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
