#!/bin/sh
set -e

# Load secrets into memory without exposing in environment
if [ -f /run/secrets/NEW_RELIC_APP_NAME ] && [ -f /run/secrets/NEW_RELIC_LICENSE_KEY ]; then
  NR_NAME=$(cat /run/secrets/NEW_RELIC_APP_NAME)
  NR_KEY=$(cat /run/secrets/NEW_RELIC_LICENSE_KEY)

  exec NEW_RELIC_APP_NAME="$NR_NAME" NEW_RELIC_LICENSE_KEY="$NR_KEY"
fi
