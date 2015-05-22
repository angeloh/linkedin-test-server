#!/bin/sh

echo "mongo will be on port 9001"
#export METEOR_OFFLINE_CATALOG=1
NODE_OPTIONS=--debug=9002 meteor -p 9000 run &
