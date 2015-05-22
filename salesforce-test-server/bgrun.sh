#!/bin/sh

echo "mongo will be on port 7201"
#export METEOR_OFFLINE_CATALOG=1
(cd src; NODE_OPTIONS=--debug=7202 meteor -p 7200 run )&
