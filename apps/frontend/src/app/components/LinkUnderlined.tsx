import * as React from "react";

import { cn } from "@bl/ui/lib/utils";

import { Link } from "~/lib/navigation";

const LinkUnderlined = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => (
  <Link ref={ref} className={cn("underline", className)} {...props} />
));

export { LinkUnderlined };
