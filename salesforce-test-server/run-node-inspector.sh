#!/bin/sh
# Port to host the inspector
#    Host to listen on
#    --web-host={String} (default: "")
node-inspector --web-port=7203 --debug-port=7202 &
