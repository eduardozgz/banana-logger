import { useLocation } from "react-router";

import { routes } from "@bl/common/Routes";

import { useQuery } from "@tanstack/react-query";
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
  const { data: session, isPending } = useQuery(trpc.session.user.queryOptions(undefined, {
    retry: false,
  }));

  if (isPending) {
    return null;
  }

  if (!session) {
    window.location.href = routes.api.auth.$buildPath({
      searchParams: { redirect_to: location.pathname },
    });
    return null;
  }

  return <>{children}</>;
}
