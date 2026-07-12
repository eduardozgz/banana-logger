import { useEffect } from "react";
import { routes } from "@bl/common/Routes";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

import { useTRPC } from "~/lib/trpc";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for protected routes that require authentication.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const trpc = useTRPC();
  const { data: session, isPending } = useQuery(
    trpc.session.user.queryOptions(undefined, {
      retry: false,
    }),
  );

  useEffect(() => {
    if (!isPending && !session) {
      window.location.href = routes.api.auth.$buildPath({
        searchParams: { redirect_to: location.pathname },
      });
    }
  }, [isPending, session, location.pathname]);

  if (isPending) {
    return null;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
