FROM node:20.3.0-slim AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml ./server/package.json ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Stage 2: Build server
FROM base as build
COPY --link ./server ./server
RUN corepack enable pnpm && pnpm build --filter backend

# Stage 3: Run server
FROM base as run
COPY --link ./server ./server
RUN corepack enable
EXPOSE 8000
CMD [ "pnpm", "--prefix=server", "serve" ]
