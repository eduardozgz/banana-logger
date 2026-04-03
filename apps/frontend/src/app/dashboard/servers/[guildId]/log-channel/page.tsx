import { useMemo } from "react";
import {
  IconChevronLeft,
  IconToggleLeft,
  IconToggleRight,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes";

import { routes } from "@bl/common/Routes";
import type { PresetName } from "@bl/common/eventPresets";
import { Button } from "@bl/ui/components/button";
import { Card, CardContent } from "@bl/ui/components/card";
import { Separator } from "@bl/ui/components/separator";
import { Skeleton } from "@bl/ui/components/skeleton";
import { Switch } from "@bl/ui/components/switch";

import { Link } from "~/lib/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTRPC } from "~/lib/trpc";

function formatEventName(event: string): string {
  return event
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function formatPresetName(preset: string): string {
  return preset
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Page() {
  const { t } = useTranslation();
  const { guildId, channelId } = useTypedParams(
    routes.dashboard.servers.server.logChannel,
  );

  const trpc = useTRPC();
  const logChannel = useQuery(trpc.guild.getLogChannel.queryOptions(
    { guildId: guildId!, channelId: channelId! },
    { enabled: !!guildId && !!channelId },
  ));

  const guild = useQuery(trpc.discord.getGuild.queryOptions(
    { id: guildId! },
    { enabled: !!guildId },
  ));

  const channelDisplayName =
    guild.data?.channels.get(channelId!)?.name ?? channelId;

  const presets = useQuery(trpc.guild.presets.queryOptions());

  const toggleEvent = useMutation(trpc.guild.toggleEvent.mutationOptions({
    onSuccess: () => logChannel.refetch(),
  }));

  const togglePreset = useMutation(trpc.guild.togglePreset.mutationOptions({
    onSuccess: () => logChannel.refetch(),
  }));

  const toggleAll = useMutation(trpc.guild.toggleAllEvents.mutationOptions({
    onSuccess: () => logChannel.refetch(),
  }));

  const watchingSet = useMemo(
    () => new Set(logChannel.data?.watchingEvents),
    [logChannel.data?.watchingEvents],
  );

  const totalEvents = useMemo(() => {
    if (!presets.data) return 0;
    const all = new Set<string>();
    for (const events of Object.values(presets.data)) {
      for (const e of events) all.add(e);
    }
    return all.size;
  }, [presets.data]);

  const enabledCount = watchingSet.size;

  if (!guildId || !channelId) return null;

  const isLoading = logChannel.isLoading || presets.isLoading;
  const isMutating =
    toggleEvent.isPending || togglePreset.isPending || toggleAll.isPending;

  if (!isLoading && !logChannel.data) {
    return (
      <div className="m-auto flex min-h-full flex-col items-center justify-center gap-4 p-3">
        <p className="text-muted-foreground">
          {t(
            "pages.dashboard.logChannel.notFound",
            "Log channel not found.",
          )}
        </p>
        <Link
          to={routes.dashboard.servers.server.settings.$buildPath({
            params: { guildId },
          })}
        >
          <Button variant="outline">
            <IconChevronLeft />
            {t("pages.dashboard.logChannel.backToSettings", "Back to settings")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="m-auto flex min-h-full flex-col gap-5 p-3 sm:max-w-[700px]">
      <div className="flex items-center gap-3">
        <Link
          to={routes.dashboard.servers.server.settings.$buildPath({
            params: { guildId },
          })}
        >
          <Button variant="ghost" size="icon-sm">
            <IconChevronLeft />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold">
            {t("pages.dashboard.logChannel.heading", "Log Channel")}
          </h2>
          <p className="text-sm text-muted-foreground">#{channelDisplayName}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {t(
                "pages.dashboard.logChannel.enabledCount",
                "{{enabled}} of {{total}} events enabled",
                { enabled: enabledCount, total: totalEvents },
              )}
            </p>
            <Button
              variant="outline"
              size="sm"
              disabled={isMutating}
              onClick={() => toggleAll.mutate({ guildId, channelId })}
            >
              {enabledCount === totalEvents ? (
                <IconToggleRight className="size-4" />
              ) : (
                <IconToggleLeft className="size-4" />
              )}
              {enabledCount === totalEvents
                ? t("pages.dashboard.logChannel.disableAll", "Disable All")
                : t("pages.dashboard.logChannel.enableAll", "Enable All")}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {presets.data &&
              Object.entries(presets.data).map(([preset, events]) => {
                const enabledInPreset = events.filter((e) =>
                  watchingSet.has(e),
                ).length;
                const allEnabled = enabledInPreset === events.length;

                return (
                  <button
                    key={preset}
                    disabled={isMutating}
                    className="text-left"
                    onClick={() =>
                      togglePreset.mutate({
                        guildId,
                        channelId,
                        preset: preset as PresetName,
                      })
                    }
                  >
                    <Card
                      size="sm"
                      className={
                        allEnabled
                          ? "ring-primary/40 bg-primary/5"
                          : "hover:ring-foreground/20"
                      }
                    >
                      <CardContent>
                        <p className="text-sm font-medium">
                          {formatPresetName(preset)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {enabledInPreset} / {events.length}
                        </p>
                      </CardContent>
                    </Card>
                  </button>
                );
              })}
          </div>

          <Separator />

          <div className="flex flex-col gap-6">
            {presets.data &&
              Object.entries(presets.data).map(([preset, events]) => (
                <div key={preset}>
                  <h3 className="mb-3 text-sm font-semibold">
                    {formatPresetName(preset)}
                  </h3>
                  <Card size="sm">
                    <CardContent className="flex flex-col gap-0">
                      {events.map((event, i) => (
                        <div key={event}>
                          {i > 0 && <Separator className="my-2" />}
                          <label className="flex cursor-pointer items-center justify-between py-1">
                            <span className="text-sm">
                              {formatEventName(event)}
                            </span>
                            <Switch
                              size="sm"
                              disabled={isMutating}
                              checked={watchingSet.has(event)}
                              onCheckedChange={() =>
                                toggleEvent.mutate({
                                  guildId,
                                  channelId,
                                  event,
                                })
                              }
                            />
                          </label>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
