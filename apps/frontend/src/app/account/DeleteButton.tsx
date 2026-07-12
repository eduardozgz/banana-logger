import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";
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
import { IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trans } from "react-i18next";

import useShowError from "~/lib/hooks/useShowError";
import { useNavigate } from "~/lib/navigation";
import { useTRPC } from "~/lib/trpc";

export function DeleteButton() {
  const trpc = useTRPC();
  const user = useQuery(trpc.session.user.queryOptions());
  const deleteAccountMutation = useMutation(trpc.user.delete.mutationOptions());
  const navigate = useNavigate();
  const showError = useShowError();

  const deleteAccount = async () => {
    if (!user.data) return;

    try {
      // Removes the user's stored account data (e.g. autosave preference), then
      // logs out to clear the session cookie.
      await deleteAccountMutation.mutateAsync();
      void navigate(routes.logout.$buildPath({}));
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={<Button className="grow" size={"sm"} variant={"destructive"} />}
      >
        <IconTrash />
        <Trans i18nKey="pages.account.deleteButton.deleteAccountBtn" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans i18nKey="pages.account.deleteButton.confirmTitle" />
          </DialogTitle>
          <DialogDescription>
            <Trans i18nKey="pages.account.deleteButton.confirmDescription" />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={deleteAccount}>
            <IconTrash />
            <Trans i18nKey="pages.account.deleteButton.deleteAccountBtn" />
          </Button>
          <DialogClose render={<Button variant="secondary" />}>
            <Trans i18nKey="pages.account.deleteButton.closeBtn" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
