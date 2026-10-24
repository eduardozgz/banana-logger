FROM node:24-alpine AS base
ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable \
    && corepack prepare pnpm@10.28.0 --activate
RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS repo
WORKDIR /app
RUN pnpm add -g turbo@2
COPY . .
RUN turbo prune @bl/backend --docker

FROM base AS deps-base
# COPY --from=ghcr.io/banana-logger/pnpm-store-cache:latest $PNPM_HOME/store $PNPM_HOME/store
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=repo /app/out/json/ .

FROM deps-base AS build_deps
RUN pnpm install --prefer-offline

FROM deps-base AS prod_deps
RUN pnpm install --prod --prefer-offline

FROM build_deps AS builder
WORKDIR /app
COPY --from=repo /app/out/full/ .
RUN pnpm turbo run build --filter=@bl/backend

FROM base AS runner
RUN apk update
RUN apk add --no-cache jq
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
# Seed the SQLite storage dir owned by the run user (see packages/db/Dockerfile).
RUN mkdir -p /app/storage && chown nodejs:nodejs /app/storage
USER nodejs
COPY --from=prod_deps /app/node_modules ./node_modules
COPY --from=repo /app/apps/backend/package.json .
COPY --from=builder --chown=nodejs:nodejs /app/apps/backend/dist ./
CMD node /app/index.js
