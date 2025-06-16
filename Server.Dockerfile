FROM node:20.3.0-slim AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY --link package.json yarn.lock .yarnrc.yml tsconfig.json ./server/tsconfig.json ./server/package.json ./
RUN corepack install yarn@4.1.1 && yarn workspaces focus server

# Stage 2: Build server
FROM base as build
COPY --link ./server ./server
RUN corepack install yarn@4.1.1 && yarn workspace server build

# Stage 3: Run server
FROM base as run
COPY --link ./server ./server
RUN corepack install yarn@4.1.1
EXPOSE 8000
CMD [ "yarn", "workspace", "server", "serve" ]
