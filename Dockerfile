FROM node:24-alpine AS base
ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable \
    && corepack prepare pnpm@10.28.0 --activate
RUN apk update && apk add --no-cache libc6-compat
 
FROM base AS app-deps
RUN apk update && apk add --no-cache make gcc g++ python3 git curl cargo rustfmt
WORKDIR /app-deps
COPY pnpm-lock.yaml .
RUN pnpm fetch

FROM app-deps AS full
RUN pnpm install -g turbo@2
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
