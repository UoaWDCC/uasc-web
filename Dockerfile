FROM node:20.3.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

FROM base AS runner
WORKDIR /app
RUN corepack enable
# Stage 1: Install prod deps
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY --link ./server/package.json ./server/package.json
COPY --link ./scripts ./scripts
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --filter server

# Stage 2: Build
COPY --link ./server ./server
RUN pnpm build --filter server

# Stage 3: Run
EXPOSE 8000 8443

COPY --link ./server/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]