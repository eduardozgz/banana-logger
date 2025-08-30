import type { DefaultUserAvatarAssets } from "discord-api-types/v10";
import { calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import { CDNRoutes, ImageFormat, RouteBases } from "discord-api-types/v10";

interface DisplayableAvatarUser {
  id: string;
  discriminator?: string;
  avatarHash?: string | null;
}

function defaultAvatarUrl(user: DisplayableAvatarUser) {
  const { id, discriminator } = user;
  const index =
    discriminator === "0"
      ? calculateUserDefaultAvatarIndex(id)
      : Number(discriminator) % 5;

  return `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(index as DefaultUserAvatarAssets)}`;
}

export function displayAvatarUrl(user: DisplayableAvatarUser) {
  const { id, avatarHash } = user;

  if (avatarHash) {
    return `${RouteBases.cdn}${CDNRoutes.userAvatar(id, avatarHash, ImageFormat.PNG)}`;
  }

  return defaultAvatarUrl(user);
}
