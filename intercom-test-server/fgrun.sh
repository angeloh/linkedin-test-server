#!/bin/sh
# this script is for people (e.g. dmr) who don't like the run-in-background 
# behavior of the standard run.sh

echo "mongo will be on port 7301"
(cd src; export DEBUG="*"; NODE_OPTIONS=--debug=7302 meteor -p 7300 --settings=../cfg/settings-prod.json run )
