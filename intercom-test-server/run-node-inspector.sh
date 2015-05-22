#!/bin/sh
# Port to host the inspector
#    Host to listen on
#    --web-host={String} (default: "")
../node-inspector-0.7.4 --web-port=7303 --debug-port=7302 &


