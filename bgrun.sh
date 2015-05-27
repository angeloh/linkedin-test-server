#!/bin/sh
servers=$*
if [ -z "$servers" ] ; then
    servers=*-test-server
fi
for x in $servers ; do
    echo $x ...
    ( cd $x; ./bgrun.sh )
done
