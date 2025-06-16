FROM node:20.3.0-slim AS base

# Stage 0: Install Volta
RUN apt-get update \
    && apt-get install -y \
    curl \
    ca-certificates \
    --no-install-recommends
SHELL ["/bin/bash", "-c"]
ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /root/.volta
ENV PATH $VOLTA_HOME/bin:$PATH
RUN curl https://get.volta.sh | bash
RUN volta install node
RUN volta install yarn@4.1.1

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY --link package.json yarn.lock .yarnrc.yml tsconfig.json ./server/tsconfig.json ./server/package.json ./
RUN yarn workspaces focus server

# Stage 2: Build server
FROM base as build
COPY --link ./server ./server
RUN yarn workspace server build

# Stage 3: Run server
FROM base as run
COPY --link ./server ./server
EXPOSE 8000
CMD [ "yarn", "workspace", "server", "serve" ]
