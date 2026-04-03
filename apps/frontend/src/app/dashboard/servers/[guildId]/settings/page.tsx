import { useState } from "react";
import { IconHash, IconPlus, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes";

import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bl/ui/components/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bl/ui/components/dialog";
import { Input } from "@bl/ui/components/input";
import { Skeleton } from "@bl/ui/components/skeleton";

import { Link } from "~/lib/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTRPC } from "~/lib/trpc";

export default function Page() {
  const { t } = useTranslation();
  const { guildId } = useTypedParams(routes.dashboard.servers.server);
  const [newChannelId, setNewChannelId] = useState("");

  const trpc = useTRPC();
  const logChannels = useQuery(trpc.guild.getLogChannels.queryOptions(
    { guildId: guildId! },
    { enabled: !!guildId },
  ));

  const guild = useQuery(trpc.discord.getGuild.queryOptions(
    { id: guildId! },
    { enabled: !!guildId },
  ));

  const channelName = (id: string) =>
    guild.data?.channels.get(id)?.name ?? id;

  const createLogChannel = useMutation(trpc.guild.createLogChannel.mutationOptions({
    onSuccess: () => {
      setNewChannelId("");
      logChannels.refetch();
    },
  }));

  const deleteLogChannel = useMutation(trpc.guild.deleteLogChannel.mutationOptions({
    onSuccess: () => {
      logChannels.refetch();
    },
  }));

  if (!guildId) return null;

  const handleAdd = () => {
    const trimmed = newChannelId.trim();
    if (!trimmed) return;
    createLogChannel.mutate({ guildId, channelId: trimmed });
  };

  return (
    <div className="m-auto flex min-h-full flex-col gap-5 p-3 sm:max-w-[600px]">
      <div>
        <h2 className="text-2xl font-semibold">
          {t("pages.dashboard.settings.heading", "Server Settings")}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {t(
            "pages.dashboard.settings.description",
            "Configure logging settings for this server.",
          )}
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder={t(
            "pages.dashboard.settings.channelIdPlaceholder",
            "Channel ID",
          )}
          value={newChannelId}
          onChange={(e) => setNewChannelId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <Button
          onClick={handleAdd}
          disabled={!newChannelId.trim() || createLogChannel.isPending}
        >
          <IconPlus />
          {t("pages.dashboard.settings.addChannel", "Add")}
        </Button>
      </div>

      {logChannels.isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      ) : !logChannels.data?.length ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {t(
              "pages.dashboard.settings.noLogChannels",
              "No log channels configured",
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {logChannels.data.map((channel) => (
            <Card key={channel.id} size="sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Link
                    to={routes.dashboard.servers.server.logChannel.$buildPath({
                      params: { guildId, channelId: channel.channelId },
                    })}
                    className="flex min-w-0 flex-1 items-center gap-2 hover:underline"
                  >
                    <IconHash className="size-4 shrink-0 text-muted-foreground" />
                    <CardTitle className="truncate">
                      {channelName(channel.channelId)}
                    </CardTitle>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {t(
                        "pages.dashboard.settings.eventsCount",
                        "{{count}} events",
                        { count: channel.watchingEvents.length },
                      )}
                    </span>
                  </Link>

                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="shrink-0"
                        />
                      }
                    >
                      <IconTrash className="size-4" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {t(
                            "pages.dashboard.settings.deleteConfirmTitle",
                            "Delete log channel",
                          )}
                        </DialogTitle>
                        <DialogDescription>
                          {t(
                            "pages.dashboard.settings.deleteConfirmDescription",
                            "Are you sure you want to remove this log channel? All event configuration for this channel will be lost.",
                          )}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          disabled={deleteLogChannel.isPending}
                          onClick={() =>
                            deleteLogChannel.mutate({
                              guildId,
                              channelId: channel.channelId,
                            })
                          }
                        >
                          <IconTrash />
                          {t("pages.dashboard.settings.deleteConfirm", "Delete")}
                        </Button>
                        <DialogClose render={<Button variant="outline" />}>
                          {t("pages.dashboard.settings.cancel", "Cancel")}
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
