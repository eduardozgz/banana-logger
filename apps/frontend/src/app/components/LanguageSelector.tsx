import { Button } from "@bl/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@bl/ui/components/dropdown-menu";
import { IconLanguage } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { languageEntries } from "~/lib/i18n";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Change language" />
        }
      >
        <IconLanguage className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={i18n.resolvedLanguage}
          onValueChange={(value) => void i18n.changeLanguage(value)}
        >
          {Object.entries(languageEntries).map(([lng, label]) => (
            <DropdownMenuRadioItem key={lng} value={lng}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
