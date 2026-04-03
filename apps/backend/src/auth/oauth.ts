import type { Session } from "@bl/validators/Session";
import type { APIUser } from "discord-api-types/v10";
import { OAuth2Routes, Routes } from "discord-api-types/v10";
import { REST } from "@discordjs/rest";

import logger from "@bl/logger";
import { DiscordOAuth2TokenExchangeResponseSchema } from "@bl/validators/DiscordOAuth2TokenExchangeResponse";

import { env } from "~/env";

const requiredScopes = ["identify", "guilds"];

function basicAuth(id: string, pass: string) {
  return `Basic ${Buffer.from(`${id}:${pass}`).toString("base64")}`;
}

/**
 * Get the Discord OAuth2 authorization URL.
 */
export function getOAuth2Url(state: string): string {
  const oauth2Url = new URL(OAuth2Routes.authorizationURL);

  oauth2Url.searchParams.set("client_id", env.DISCORD_CLIENT_ID);
  oauth2Url.searchParams.set("response_type", "code");
  oauth2Url.searchParams.set("scope", requiredScopes.join(" "));
  oauth2Url.searchParams.set("redirect_uri", env.DISCORD_OAUTH2_REDIRECT_URI);
  oauth2Url.searchParams.set("prompt", "none");
  oauth2Url.searchParams.set("state", state);

  return oauth2Url.toString();
}

/**
 * Exchange an authorization code or refresh token for access tokens.
 */
export async function exchangeTokens(
  exchangeMethod:
    | {
        code: string;
      }
    | {
        refreshToken: string;
      },
): Promise<Session> {
  let body = {};
  if ("code" in exchangeMethod) {
    body = {
      grant_type: "authorization_code",
      code: exchangeMethod.code,
      redirect_uri: env.DISCORD_OAUTH2_REDIRECT_URI,
    };
  } else {
    body = {
      grant_type: "refresh_token",
      refresh_token: exchangeMethod.refreshToken,
    };
  }

  const tokenExchangeResponse = await fetch(OAuth2Routes.tokenURL, {
    method: "post",
    headers: {
      Authorization: basicAuth(
        env.DISCORD_CLIENT_ID,
        env.DISCORD_CLIENT_SECRET,
      ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  })
    .then((res) => res.json())
    .then((res) => DiscordOAuth2TokenExchangeResponseSchema.parse(res));

  if ("error" in tokenExchangeResponse) {
    throw new Error(tokenExchangeResponse.error);
  }

  if (tokenExchangeResponse.tokenType !== "Bearer")
    throw new Error("Unknown access token type");

  if (!requiredScopes.every((s) => tokenExchangeResponse.scope.includes(s)))
    throw new Error("Insufficient scope");

  const rest = new REST({ authPrefix: "Bearer" }).setToken(
    tokenExchangeResponse.accessToken,
  );
  const identifiedUser = (await rest.get(Routes.user())) as APIUser;

  return {
    userId: identifiedUser.id,
    ...tokenExchangeResponse,
  };
}

/**
 * Refresh the session if it's expired.
 * Returns the refreshed session or null if refresh fails.
 */
export async function refreshTokenIfNeeded(
  session: Session | null,
): Promise<Session | null> {
  if (!session) return null;

  if (session.expiresAt < Date.now()) {
    try {
      return await exchangeTokens({
        refreshToken: session.refreshToken,
      });
    } catch (err) {
      logger.error("Failed to refresh session", err);
      return null;
    }
  }

  return session;
}
