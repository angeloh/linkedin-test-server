#!/bin/sh
# Port to host the inspector
#    Host to listen on
#    --web-host={String} (default: "")
node-inspector --web-port=7103 --debug-port=7102 &
