import { useTranslation } from "react-i18next";

import { routes } from "@bl/common/Routes";
import { Button } from "@bl/ui/components/button";

import { Link } from "~/lib/navigation";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-6 p-4 text-center">
      <h1 className="font-heading text-5xl font-bold">Banana Logger</h1>
      <p className="text-muted-foreground max-w-md text-lg">
        {t("pages.home.description", "Discord audit logging made simple.")}
      </p>
      <Link to={routes.dashboard.$buildPath({})}>
        <Button size="lg">
          {t("pages.home.dashboard", "Go to Dashboard")}
        </Button>
      </Link>
    </div>
  );
}
