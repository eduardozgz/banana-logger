import { createContext, useContext } from "react";
import { IconMenu2 } from "@tabler/icons-react";

import { cn } from "@bl/ui/lib/utils";
import { Button } from "@bl/ui/components/button";

export const MenuContext = createContext<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
} | null>(null);

export function MenuButton({ className }: { className?: string }) {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    return null;
  }

  return (
    <Button
      className={cn("ml-auto sm:hidden", className)}
      size={"icon"}
      variant={"ghost"}
      onClick={() => menuContext.setIsOpen(!menuContext.isOpen)}
    >
      <IconMenu2 className="h-5 w-5" />
    </Button>
  );
}
