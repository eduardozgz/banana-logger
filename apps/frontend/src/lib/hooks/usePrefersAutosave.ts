import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/lib/trpc";

/**
 * The current user's autosave preference. Stored per-user on the server (so it
 * follows the user across devices) and surfaced through `session.user`. Pass the
 * result as the `autosave` argument to {@link useFormManager}.
 */
export function usePrefersAutosave(): boolean {
  const trpc = useTRPC();
  const user = useQuery(trpc.session.user.queryOptions());
  return user.data?.prefersAutosave ?? false;
}

export default usePrefersAutosave;
