import { Prisma, PrismaClient } from "../prisma/generated/client";
export { Prisma };
import baseLogger from "@bl/logger";

import { env } from "./env";

const logger = baseLogger.child({ component: "db" });

const createPrismaClient = () => {
  const db = new PrismaClient({
    log: [
      { emit: "event", level: "query" },
      { emit: "event", level: "warn" },
      { emit: "event", level: "error" },
    ],
    errorFormat: "minimal",
  });

  // Only emit query logs when explicitly debugging to avoid noise in prod.
  if (env.LOG_LEVEL === "debug") {
    db.$on("query", (e) => {
      logger.debug(`${e.query} ${e.params} (${e.duration}ms)`);
    });
  }

  db.$on("warn", (e) => {
    logger.warn(e.message);
  });

  db.$on("error", (e) => {
    logger.error(e.message);
  });

  return db;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export class NotFoundError extends Error {}
export class ConflictError extends Error {}

export const handleDBError = (error: unknown) => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    throw error;
  }

  switch (error.code) {
    case "P2025":
      throw new NotFoundError();

    case "P2002":
      throw new ConflictError();

    default:
      throw error;
  }
};
