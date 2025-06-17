FROM node:20.3.0-slim AS base

FROM base AS runner
WORKDIR /app
# Set Node environment as production
ENV NODE_ENV=production

# Stage 1: Copy package files and install
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY --link ./server/package.json ./server/package.json
RUN corepack enable pnpm && pnpm install --filter server

# Stage 2: Copy server and build
COPY --link ./server ./server
RUN pnpm build --filter server

# Stage 3: Run
EXPOSE 8000
CMD [ "pnpm", "--prefix=server", "serve" ]
