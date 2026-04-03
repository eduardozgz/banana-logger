import { useMemo, useState } from "react";
import { Outlet } from "react-router";

import { routes } from "@bl/common/Routes";
import { cn } from "@bl/ui/lib/utils";

import { useNavigate } from "~/lib/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/lib/trpc";
import { MenuContext } from "./Menu";

export default function Layout() {
  const trpc = useTRPC();
  const isAuthenticated = useQuery(trpc.session.isAuthenticated.queryOptions());
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const menuContextValue = useMemo(
    () => ({
      isOpen: isMenuOpen,
      setIsOpen: setIsMenuOpen,
    }),
    [isMenuOpen],
  );

  const overflowClass = "mt-[-57px] pt-[57px] max-h-screen overflow-auto";

  if (isAuthenticated.data != null && !isAuthenticated.data) {
    void navigate(routes.login.$buildPath({}));
  }

  return (
    <MenuContext.Provider value={menuContextValue}>
      <div className="flex grow flex-row bg-black">
        <div
          className={cn(
            overflowClass,
            "flex grow flex-col bg-black pb-[10px] pr-[10px] pt-[67px]",
          )}
        >
          <div className="h-full max-h-full rounded border border-border bg-[#181514]">
            <Outlet />
          </div>
        </div>
      </div>
    </MenuContext.Provider>
  );
}
