import { createContext, useContext } from "react";
import { Button } from "@bl/ui/components/button";
import { cn } from "@bl/ui/lib/utils";
import { IconMenu2 } from "@tabler/icons-react";

// Context is co-located with the components that consume it; extracting it to a
// separate file just to satisfy Fast Refresh isn't worth the indirection.
// eslint-disable-next-line react-refresh/only-export-components
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
