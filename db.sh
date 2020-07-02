#!/bin/bash

echo "Dump and commit staging database."

filter_mongodb_debug_messages() {
    # Workaround for https://jira.mongodb.org/browse/SERVER-27159
 
    grep -vE '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}[+-][0-9]{4}\s+'
}

# DB_URI defined in travis config 
DB=${DB_URI}
Collections=$( mongo $DB --quiet --eval "db.getCollectionNames().join('\n')"| filter_mongodb_debug_messages )

for collection in $Collections; do
    echo ">> $collection"
    mongoexport --uri $DB -c $collection -o ./_db/$collection.json
done
