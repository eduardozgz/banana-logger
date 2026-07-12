import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";
import { Skeleton } from "@bl/ui/components/skeleton";
import { IconLogout } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { Link } from "~/lib/navigation";
import { useTRPC } from "~/lib/trpc";
import { AccountSettings } from "./AccountSettings";
import { DeleteButton } from "./DeleteButton";

export default function Page() {
  const { t } = useTranslation();

  const trpc = useTRPC();
  const discordUser = useQuery(
    trpc.discord.identify.queryOptions(undefined, {
      throwOnError: true,
    }),
  );

  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-col gap-4 p-4 sm:max-w-[600px]">
        <div className="my-8 flex gap-8 self-center">
          {discordUser.isSuccess ? (
            <img
              src={discordUser.data.avatar}
              alt={discordUser.data.username}
              className="bg-muted h-[128px] w-[128px] rounded-full text-transparent"
            />
          ) : (
            <Skeleton className="h-[128px] w-[128px] rounded-full" />
          )}
          <div className="flex flex-col justify-center gap-3">
            {discordUser.isSuccess ? (
              <p className="text-foreground text-3xl break-all">
                {discordUser.data.username}
              </p>
            ) : (
              <Skeleton className="h-9 w-50" />
            )}
            <div className="flex flex-row flex-wrap gap-2">
              <DeleteButton />
              <Link to={routes.logout.$buildPath({})} className="grow">
                <Button className="w-full" size="sm">
                  <IconLogout className="size-4" />
                  {t("pages.account.page.logoutButton")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <AccountSettings />
      </div>
    </div>
  );
}
