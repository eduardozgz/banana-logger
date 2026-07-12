import { memo, useContext } from "react";
import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";
import { Separator } from "@bl/ui/components/separator";
import { cn } from "@bl/ui/lib/utils";
import { IconSettings, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-router";
import { useTypedParams } from "react-router-typesafe-routes";

import { MenuContext } from "~/app/dashboard/Menu";
import { Link } from "~/lib/navigation";
import { useTRPC } from "~/lib/trpc";

export const ServerNavMenu = memo(function ServerNavMenu({
  className,
}: {
  className?: string;
}) {
  const { t } = useTranslation();
  const menuContext = useContext(MenuContext);
  const { guildId } = useTypedParams(routes.dashboard.servers.server);
  const trpc = useTRPC();
  const userGuilds = useQuery(trpc.discord.userGuilds.queryOptions());

  // Called unconditionally (before any early return) to satisfy the rules of
  // hooks; falls back to a pattern that can't match when guildId is absent.
  const isInSettings = !!useMatch(
    guildId
      ? routes.dashboard.servers.server.settings.$buildPath({
          params: { guildId },
        })
      : "__no_match__",
  );

  if (!guildId || !menuContext) return null;

  const guild = userGuilds.data?.userGuilds.get(guildId);

  return (
    <nav
      className={cn(
        "bg-card flex max-h-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="flex h-[48px] min-h-[48px] min-w-0 items-center gap-3 font-semibold">
        <div className="flex flex-shrink-0 items-center pl-3">
          {guild?.icon ? (
            <img
              src={`https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.${guild.icon.startsWith("a_") ? "gif" : "webp"}?size=64`}
              alt=""
              className="size-8 rounded-full"
            />
          ) : (
            <div className="bg-muted flex size-8 items-center justify-center rounded-full text-xs font-medium">
              {(guild?.name ?? "S").slice(0, 2)}
            </div>
          )}
        </div>
        <div className="flex-shrink overflow-hidden text-ellipsis whitespace-nowrap">
          {guild?.name ?? "Server"}
        </div>
        <Button
          className="ms-auto me-1 flex-shrink-0 sm:hidden"
          size="icon"
          variant="ghost"
          onClick={() => menuContext.setIsOpen(false)}
        >
          <IconX className="size-5" />
        </Button>
      </div>

      <Separator />
      <div className="flex max-h-full grow flex-col gap-1 overflow-auto p-2">
        <Link
          to={routes.dashboard.servers.server.settings.$buildPath({
            params: { guildId },
          })}
          onClick={() => menuContext.setIsOpen(false)}
        >
          <Button
            variant={isInSettings ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <IconSettings className="size-4" />
            {t(
              "pages.dashboard.servers.ServerNavMenu.serverSettings",
              "Settings",
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
});
