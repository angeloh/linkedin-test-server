#!/bin/sh

echo "mongo will be on port 7101"
#export METEOR_OFFLINE_CATALOG=1
NODE_OPTIONS=--debug=7102 meteor -p 7100 run &
