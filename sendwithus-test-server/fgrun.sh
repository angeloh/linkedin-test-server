#!/bin/sh
# this script is for people (e.g. dmr) who don't like the run-in-background 
# behavior of the standard run.sh

echo "mongo will be on port 7101"
(cd src ; NODE_OPTIONS=--debug=7102 meteor -p 7100 run )
