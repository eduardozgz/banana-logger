import { z } from "zod/v4";

export interface Session {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const SessionSchema = z.object({
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.number(),
});
