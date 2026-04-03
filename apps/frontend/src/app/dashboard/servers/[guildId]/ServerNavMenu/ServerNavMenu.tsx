import { memo, useContext } from "react";
import { IconSettings, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-router";
import { useTypedParams } from "react-router-typesafe-routes";

import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";
import { Separator } from "@bl/ui/components/separator";

import { cn } from "@bl/ui/lib/utils";

import { MenuContext } from "~/app/dashboard/Menu";
import { Link } from "~/lib/navigation";
import { useQuery } from "@tanstack/react-query";
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

  if (!guildId || !menuContext) return null;

  const guild = userGuilds.data?.userGuilds.get(guildId);

  const isInSettings = !!useMatch(
    routes.dashboard.servers.server.settings.$buildPath({
      params: { guildId },
    }),
  );

  return (
    <nav
      className={cn(
        "flex max-h-full flex-col overflow-hidden bg-card",
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
            <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
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
            {t("pages.dashboard.servers.ServerNavMenu.serverSettings", "Settings")}
          </Button>
        </Link>
      </div>
    </nav>
  );
});
