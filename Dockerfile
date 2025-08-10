FROM node:22-alpine3.21 AS base
ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk update && apk add --no-cache libc6-compat
 
FROM base AS app-deps
RUN apk update && apk add --no-cache make gcc g++ python3 git curl
WORKDIR /app-deps
COPY pnpm-lock.yaml .
RUN pnpm fetch

FROM app-deps AS full
RUN pnpm install -g turbo@2
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
