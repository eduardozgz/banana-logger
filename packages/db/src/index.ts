import { Prisma, PrismaClient } from "../prisma/generated/client";
import { env } from "./env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

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
