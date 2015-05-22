#!/bin/sh
for x in *-test-server ; do
    echo $x ...
    ( cd $x; ./bgrun.sh )
done
