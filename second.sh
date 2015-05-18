#!/bin/bash
for x in $(ls -d *-test-server/src) ; do
    (cd $x ; mrt update)
done
