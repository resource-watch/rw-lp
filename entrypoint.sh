#!/bin/bash
set -e

case "$1" in
    start)
        echo "Running Start"
        exec pm2 start server.js --no-daemon -i 2
        ;;
    *)
        exec "$@"
esac
