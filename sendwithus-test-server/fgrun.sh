#!/bin/sh
# this script is for people (e.g. dmr) who don't like the run-in-background 
# behavior of the standard run.sh

echo "mongo will be on port 7001"
(cd src ; `NODE_OPTIONS=--debug=7002 meteor -p 7000 run )
