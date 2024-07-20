# syntax = docker/dockerfile:1
FROM debian:stable-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# curl and ca-certificates are needed for volta installation
RUN apt-get update \
  && apt-get install -y \
  curl \
  ca-certificates \
  --no-install-recommends

# bash will load volta() function via .bashrc 
# using $VOLTA_HOME/load.sh
SHELL ["/bin/bash", "-c"]

# since we're starting non-interactive shell, 
# we wil need to tell bash to load .bashrc manually
ENV BASH_ENV ~/.bashrc
# needed by volta() function
ENV VOLTA_HOME /root/.volta
# make sure packages managed by volta will be in PATH
ENV PATH $VOLTA_HOME/bin:$PATH

# install volta
RUN curl https://get.volta.sh | bash
RUN volta install node

# Throw-away build stage to reduce size of final image
FROM base as install 

# Install node modules
COPY --link package.json yarn.lock .yarnrc.yml tsconfig.json ./
COPY --link ./server ./server
RUN yarn workspaces focus server

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