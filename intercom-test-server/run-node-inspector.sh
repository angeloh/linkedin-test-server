#!/bin/sh
# Port to host the inspector
#    Host to listen on
#    --web-host={String} (default: "")
node-inspector --web-port=8003 --debug-port=8002 &


