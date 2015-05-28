#!/bin/sh
export METEOR_OFFLINE_CATALOG=1
echo "Fast start...to avoid multiple servers trying to update the meteor versions db."
servers=$*
if [ -z "$servers" ] ; then
    servers=*-test-server
fi
for x in $servers ; do
    echo $x ...
    ( cd $x; ./bgrun.sh )
    sleep 1
done
