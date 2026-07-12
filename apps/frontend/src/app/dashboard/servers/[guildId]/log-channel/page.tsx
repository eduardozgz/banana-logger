import { useMemo } from "react";
import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";
import { Card, CardContent } from "@bl/ui/components/card";
import { Separator } from "@bl/ui/components/separator";
import { Skeleton } from "@bl/ui/components/skeleton";
import { Switch } from "@bl/ui/components/switch";
import {
  IconChevronLeft,
  IconDeviceFloppy,
  IconToggleLeft,
  IconToggleRight,
} from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes";

import type { RouterOutputs } from "~/lib/trpc";
import { FormManagerState, useFormManager } from "~/lib/hooks/useFormManager";
import { usePrefersAutosave } from "~/lib/hooks/usePrefersAutosave";
import { Link } from "~/lib/navigation";
import { useTRPC } from "~/lib/trpc";

// Derived from the router types (the frontend can't import the db package).
type EventType = NonNullable<
  RouterOutputs["guild"]["getLogChannel"]
>["watchingEvents"][number];

function formatEventName(event: string): string {
  return event
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function formatPresetName(preset: string): string {
  return preset.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Page() {
  const { t } = useTranslation();
  const { guildId, channelId } = useTypedParams(
    routes.dashboard.servers.server.logChannel,
  );

  const trpc = useTRPC();
  const logChannel = useQuery(
    trpc.guild.getLogChannel.queryOptions(
      { guildId: guildId ?? "", channelId: channelId ?? "" },
      { enabled: !!guildId && !!channelId },
    ),
  );

  const guild = useQuery(
    trpc.discord.getGuild.queryOptions(
      { id: guildId ?? "" },
      { enabled: !!guildId },
    ),
  );

  const presets = useQuery(trpc.guild.presets.queryOptions());

  const setLogChannelEvents = useMutation(
    trpc.guild.setLogChannelEvents.mutationOptions(),
  );
  const prefersAutosave = usePrefersAutosave();

  // The event configuration is edited as a draft; toggles mutate the working
  // copy and the whole set is persisted at once via setLogChannelEvents. With
  // autosave enabled the save fires automatically a few seconds after the last
  // edit; otherwise the user saves explicitly.
  const form = useFormManager(
    logChannel,
    setLogChannelEvents,
    `${guildId ?? ""}:${channelId ?? ""}`,
    prefersAutosave,
  );

  const channelDisplayName =
    (channelId ? guild.data?.channels.get(channelId)?.name : undefined) ??
    channelId;

  const draft = form.value;
  const watchingEvents = useMemo(
    () => draft?.watchingEvents ?? [],
    [draft?.watchingEvents],
  );
  const watchingSet = useMemo(() => new Set(watchingEvents), [watchingEvents]);

  const allEvents = useMemo(() => {
    const all = new Set<EventType>();
    for (const events of Object.values(presets.data ?? {})) {
      for (const e of events) all.add(e);
    }
    return all;
  }, [presets.data]);

  const enabledCount = watchingSet.size;
  const totalEvents = allEvents.size;

  if (!guildId || !channelId) return null;

  const isLoading = logChannel.isLoading || presets.isLoading;
  const isSaving = form.state === FormManagerState.SAVING;

  if (!isLoading && !logChannel.data) {
    return (
      <div className="m-auto flex min-h-full flex-col items-center justify-center gap-4 p-3">
        <p className="text-muted-foreground">
          {t("pages.dashboard.logChannel.notFound", "Log channel not found.")}
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

  const setWatchingEvents = (events: EventType[]) => {
    if (!draft) return;
    form.setValue({ ...draft, watchingEvents: events });
  };

  const toggleEvent = (event: EventType) => {
    setWatchingEvents(
      watchingSet.has(event)
        ? watchingEvents.filter((e) => e !== event)
        : [...watchingEvents, event],
    );
  };

  const togglePreset = (events: EventType[]) => {
    const allEnabled = events.every((e) => watchingSet.has(e));
    setWatchingEvents(
      allEnabled
        ? watchingEvents.filter((e) => !events.includes(e))
        : [...watchingEvents, ...events.filter((e) => !watchingSet.has(e))],
    );
  };

  const toggleAll = () => {
    setWatchingEvents(enabledCount === totalEvents ? [] : [...allEvents]);
  };

  const saveStatus =
    form.state === FormManagerState.SAVING
      ? t("pages.dashboard.logChannel.saving", "Saving…")
      : form.state === FormManagerState.UNSAVED
        ? form.autosave.pending
          ? t("pages.dashboard.logChannel.autosaving", "Autosaving…")
          : t("pages.dashboard.logChannel.unsaved", "Unsaved changes")
        : t("pages.dashboard.logChannel.saved", "All changes saved");

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
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-semibold">
            {t("pages.dashboard.logChannel.heading", "Log Channel")}
          </h2>
          <p className="text-muted-foreground truncate text-sm">
            #{channelDisplayName}
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          <span className="text-muted-foreground text-sm">{saveStatus}</span>
          <Button
            size="sm"
            disabled={form.state !== FormManagerState.UNSAVED}
            onClick={() => void form.save()}
          >
            <IconDeviceFloppy className="size-4" />
            {t("pages.dashboard.logChannel.save", "Save")}
          </Button>
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
            <p className="text-muted-foreground text-sm">
              {t(
                "pages.dashboard.logChannel.enabledCount",
                "{{enabled}} of {{total}} events enabled",
                { enabled: enabledCount, total: totalEvents },
              )}
            </p>
            <Button
              variant="outline"
              size="sm"
              disabled={isSaving}
              onClick={toggleAll}
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
                    disabled={isSaving}
                    className="text-left"
                    onClick={() => togglePreset(events)}
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
                        <p className="text-muted-foreground text-xs">
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
                              disabled={isSaving}
                              checked={watchingSet.has(event)}
                              onCheckedChange={() => toggleEvent(event)}
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
