FROM node:20.3.0-slim AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY --link package.json yarn.lock .yarnrc.yml tsconfig.json ./server/tsconfig.json ./server/package.json ./
RUN corepack enable yarn && yarn
RUN yarn workspaces focus server

# Stage 2: Build server
FROM base as build
COPY --link ./server ./server
RUN corepack enable yarn && yarn workspace server build

# Stage 3: Run server
FROM base as run
COPY --link ./server ./server
RUN corepack enable yarn
EXPOSE 8000
CMD [ "yarn", "workspace", "server", "serve" ]
