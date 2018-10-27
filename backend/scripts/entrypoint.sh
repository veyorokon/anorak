#!/usr/bin/env bash

set -eo pipefail
shopt -s nullglob

if [ $# -eq 0 ]; then

  echo "Running migrations..."
  python ./manage.py migrate

  echo "Starting gunicorn..."
  exec gunicorn backend.wsgi:application \
    --bind=0.0.0.0:8000 \
    --workers=3
else
  exec "$@"
fi
