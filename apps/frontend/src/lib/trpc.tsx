import type { AppRouter } from "@bl/trpc-api";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink,
  splitLink,
  TRPCClientError,
} from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import SuperJSON from "superjson";

import { Errors, REQUEST_TIMEOUT_MESSAGE } from "@bl/trpc-api/utils/errors";

// Errors describing a stable state (no session, no access, bot not in the
// guild) or a bot-fleet timeout won't get better by asking again.
const NON_RETRYABLE_CODES = ["UNAUTHORIZED", "FORBIDDEN", "NOT_FOUND"];

const retry = (failureCount: number, error: Error) => {
  if (error.message === Errors.NotAuthenticated) return false;
  if (error.message === REQUEST_TIMEOUT_MESSAGE) return false;
  if (
    error instanceof TRPCClientError &&
    NON_RETRYABLE_CODES.includes(
      (error.data as { code?: string } | undefined)?.code ?? "",
    )
  )
    return false;
  return failureCount < 3;
};

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      mutations: {
        retry,
      },
      queries: {
        retry,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const url = "/api/trpc";
  const headers = () => {
    const headers = new Headers();
    headers.set("x-trpc-source", "vite-react");
    return headers;
  };
  const transformer = SuperJSON;

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            import.meta.env.DEV ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        splitLink({
          condition(op) {
            if (
              [
                "discord.userGuilds",
                "discord.getGuild",
                "discord.identify",
              ].includes(op.path)
            )
              return true;

            return op.context.useSlowLink === true;
          },
          true: httpBatchStreamLink({
            transformer,
            url,
            headers,
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              });
            },
          }),
          false: httpBatchStreamLink({
            transformer,
            url,
            headers,
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: "include",
              });
            },
          }),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
