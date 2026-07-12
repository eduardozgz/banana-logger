export const Errors = {
  NotAuthenticated: "NotAuthenticated",
  NotAuthorized: "NotAuthorized",
  NotFound: "NotFound",
} as const;

// Re-exported here (a server-dependency-free leaf module) so the frontend can
// import it without pulling server-only code into the browser bundle.
export { REQUEST_TIMEOUT_MESSAGE } from "@bl/trpc-redis/Constants";
