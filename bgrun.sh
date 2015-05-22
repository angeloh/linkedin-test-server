#!/bin/sh
for x in *-test-server ; do
    ( cd $x; ./bgrun.sh )
done