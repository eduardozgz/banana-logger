import { z } from "zod/v4";

export const LatestExchangeRatesSchema = z.object({
  timestamp: z.number(),
  base: z.string(),
  rates: z.record(z.string(), z.number()),
});
