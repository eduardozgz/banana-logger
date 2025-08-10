FROM node:22-alpine3.21 AS base
ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk update && apk add --no-cache libc6-compat
 
FROM base AS repo
WORKDIR /app
RUN pnpm add -g turbo@2
COPY . .
RUN turbo prune @/db --docker

FROM base AS deps
COPY --from=ghcr.io/eduardozgz/banana-logger-ci:latest $PNPM_HOME/store $PNPM_HOME/store
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=repo /app/out/json/ .
COPY --from=repo /app/out/full/packages/db/prisma ./packages/db/prisma
RUN pnpm install --prefer-offline

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=repo /app/out/full/ .
CMD ["tail", "-f", "/dev/null"]