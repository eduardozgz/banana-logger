import { IconLoader2 } from "@tabler/icons-react";

import { MenuButton } from "../dashboard/Menu";

export function LoadingPage() {
  return (
    <div className="flex h-full grow flex-col p-1">
      <MenuButton />
      <div className="m-auto flex flex-col gap-2 p-3 sm:flex-row">
        <IconLoader2 className="m-auto h-24 w-24 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}
