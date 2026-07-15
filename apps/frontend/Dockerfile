FROM node:22-alpine3.20 AS base
ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS repo
WORKDIR /app
RUN pnpm add -g turbo@2
COPY . .
RUN turbo prune @bl/frontend --docker

FROM base AS build_deps
# COPY --from=ghcr.io/banana-logger/pnpm-store-cache:latest $PNPM_HOME/store $PNPM_HOME/store
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=repo /app/out/json/ .
RUN pnpm install --prefer-offline

FROM build_deps AS builder
WORKDIR /app
COPY --from=repo /app/out/full/ .
ENV SKIP_ENV_VALIDATION=true
ENV NODE_ENV='production'
ARG VITE_SUPPORT_URL
ENV VITE_SUPPORT_URL=${VITE_SUPPORT_URL}
ARG VITE_BOT_REPO_URL
ENV VITE_BOT_REPO_URL=${VITE_BOT_REPO_URL}
# Vite inlines this at build time; without it the OAuth "Invite bot" links ship
# with an empty client_id. Must be passed as a build-arg (see the CI workflow).
ARG VITE_DISCORD_CLIENT_ID
ENV VITE_DISCORD_CLIENT_ID=${VITE_DISCORD_CLIENT_ID}
RUN pnpm turbo run build --filter=@bl/frontend

FROM nginx:alpine AS runner
COPY --from=builder /app/apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
