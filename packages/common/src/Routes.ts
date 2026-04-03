import { route } from "react-router-typesafe-routes";
import { zod } from "react-router-typesafe-routes/zod";
import { z } from "zod/v4";

export const routes = route({
  path: "",
  children: {
    login: route({ path: "login" }),
    logout: route({ path: "logout" }),
    account: route({ path: "account" }),
    dashboard: route({
      path: "dashboard",
      children: {
        servers: route({
          path: "servers",
          children: {
            server: route({
              path: ":guildId",
              params: { guildId: zod(z.string().optional()) },
              children: {
                settings: route({ path: "settings" }),
                logChannel: route({
                  path: "log/:channelId",
                  params: { channelId: zod(z.string()) },
                }),
              },
            }),
          },
        }),
      },
    }),
    api: route({
      path: "api",
      children: {
        auth: route({
          path: "auth",
          searchParams: { redirect_to: zod(z.string().optional()) },
          children: {
            logout: route({ path: "logout" }),
          },
        }),
      },
    }),
  },
});
