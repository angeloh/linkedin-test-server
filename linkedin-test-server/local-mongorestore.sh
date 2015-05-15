#!/bin/sh
if [ -d ./productiondb/whalepath ]; then
    for x in productiondb/whalepath/*; do mongorestore --drop --dbpath .meteor/local/db --db meteor $x; done
    exit 0;
fi
echo "productiondb directory is not found. Run remote-mongodump.sh script on whalepath-server project and copy the directory in the linkedin-test-server project root"
