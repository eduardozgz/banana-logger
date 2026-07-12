import { routes } from "@bl/common/Routes";
import { cn } from "@bl/ui/lib/utils";
import { useTranslation } from "react-i18next";

import { Link, NavLink } from "~/lib/navigation";
import { LanguageSelector } from "./LanguageSelector";

export default function NavBar() {
  const [t] = useTranslation();

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav className="flex h-14 items-center gap-4 px-[18px] text-sm lg:gap-6">
        <Link to={routes.$buildPath({})} className="mr-auto">
          <div className="group flex flex-row items-center">
            <h1
              className={
                "font-major-mono py-3 text-xl transition-all group-hover:drop-shadow-[0_0_2px_#fff]"
              }
            >
              Banana Logger
            </h1>
          </div>
        </Link>
        <NavLink
          to={routes.dashboard.$buildPath({})}
          className={({ isActive }) =>
            cn("text-muted-foreground hover:text-foreground", {
              "text-foreground": isActive,
            })
          }
        >
          {t("components.NavBar.dashboardEntry")}
        </NavLink>
        <NavLink
          to={routes.account.$buildPath({})}
          className={({ isActive }) =>
            cn("text-muted-foreground hover:text-foreground", {
              "text-foreground": isActive,
            })
          }
        >
          {t("components.NavBar.accountEntry")}
        </NavLink>
        <LanguageSelector />
      </nav>
    </header>
  );
}
