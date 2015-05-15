#!/bin/sh
# this script is for people (e.g. dmr) who don't like the run-in-background 
# behavior of the standard run.sh

echo "mongo will be on port 8001"
NODE_OPTIONS=--debug=8002 meteor -p 8000 run
