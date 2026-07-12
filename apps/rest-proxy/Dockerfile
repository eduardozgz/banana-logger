FROM node:24-alpine3.21 AS base
ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk update && apk add --no-cache libc6-compat

FROM base AS repo
WORKDIR /app
RUN pnpm add -g turbo@2
COPY . .
RUN turbo prune @bl/rest-proxy --docker

FROM base AS build_deps
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=repo /app/out/json/ .
RUN pnpm install --prefer-offline

FROM build_deps AS prod_deps
WORKDIR /app
RUN rm -rf node_modules
RUN pnpm install --prod --prefer-offline

FROM build_deps AS builder
WORKDIR /app
COPY --from=repo /app/out/full/ .
RUN pnpm turbo run build --filter=@bl/rest-proxy

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=prod_deps /app/node_modules ./node_modules
COPY --from=repo /app/apps/rest-proxy/package.json .
COPY --from=builder --chown=nodejs:nodejs /app/apps/rest-proxy/dist ./
EXPOSE 8765
CMD ["node", "/app/index.js"]
