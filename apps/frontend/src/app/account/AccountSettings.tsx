import { useId } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@bl/ui/components/card";
import { Label } from "@bl/ui/components/label";
import { Switch } from "@bl/ui/components/switch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useTRPC } from "~/lib/trpc";

export function AccountSettings() {
  const { t } = useTranslation();
  const autosaveId = useId();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const userQueryKey = trpc.session.user.queryKey();
  const user = useQuery(trpc.session.user.queryOptions());

  const setPrefersAutosave = useMutation(
    trpc.user.setPrefersAutosave.mutationOptions({
      // Optimistically flip the switch, roll back on error.
      onMutate: async ({ prefersAutosave }) => {
        await queryClient.cancelQueries({ queryKey: userQueryKey });
        const previous = queryClient.getQueryData(userQueryKey);
        queryClient.setQueryData(userQueryKey, (old) =>
          old ? { ...old, prefersAutosave } : old,
        );
        return { previous };
      },
      onError: (_error, _input, context) => {
        if (context?.previous)
          queryClient.setQueryData(userQueryKey, context.previous);
      },
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: userQueryKey });
      },
    }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("pages.account.settings.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor={autosaveId}>
              {t("pages.account.settings.autosave.label")}
            </Label>
            <p className="text-muted-foreground text-sm">
              {t("pages.account.settings.autosave.description")}
            </p>
          </div>
          <Switch
            id={autosaveId}
            checked={user.data?.prefersAutosave ?? false}
            disabled={!user.isSuccess}
            onCheckedChange={(checked) =>
              setPrefersAutosave.mutate({ prefersAutosave: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default AccountSettings;
