#!/bin/sh

echo "mongo will be on port 7001"
NODE_OPTIONS=--debug=7002 mrt -p 7000 run
