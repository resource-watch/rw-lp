#!/bin/bash
set -e

case "$1" in
    start)
        echo "Running Start"
        exec node server.js
        ;;
    test)
        echo "Running Test"
        exec yarn test
        ;;
    *)
        exec "$@"
esac
