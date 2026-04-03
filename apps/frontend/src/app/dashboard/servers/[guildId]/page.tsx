import { useTranslation } from "react-i18next";

import { MenuButton } from "../../Menu";

export default function Page() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full select-none flex-col">
      <MenuButton className="my-1 mr-1" />
      <div className="flex h-full w-full grow flex-col items-center justify-center overflow-auto text-center">
        <h1 className="text-4xl font-semibold">
          {t("pages.dashboard.servers.welcome.title", "Server Overview")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t(
            "pages.dashboard.servers.welcome.description",
            "Select a setting from the navigation menu to get started.",
          )}
        </p>
      </div>
    </div>
  );
}
