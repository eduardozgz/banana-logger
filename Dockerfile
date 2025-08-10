FROM node:22-alpine3.21 AS base
ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk update && apk add --no-cache libc6-compat
 
FROM base AS app-deps
WORKDIR /app
RUN apk update && apk add --no-cache make gcc g++ python3 git curl
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM app-deps AS full
WORKDIR /app
RUN pnpm install -g turbo@2
WORKDIR /app
COPY . .
