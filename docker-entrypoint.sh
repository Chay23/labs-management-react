#!/usr/bin/env sh
set -eu

envsubst '${PORT}' < /etc/nginx/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"