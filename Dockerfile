# syntax = docker/dockerfile:1
# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
RUN corepack enable

# Throw-away build stage to reduce size of final image
FROM base as install 

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package.json yarn.lock .yarnrc.yml tsconfig.json ./
COPY --link ./server ./server
RUN yarn install --production

# Copy application code

FROM base as build

COPY --from=install /app /app

RUN yarn workspace server build 

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 8000
CMD [ "yarn", "workspace", "server", "serve" ]