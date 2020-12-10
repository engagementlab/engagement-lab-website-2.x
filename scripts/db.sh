#!/bin/bash

echo "Dump and commit staging database."

filter_mongodb_debug_messages() {
    # Workaround for https://jira.mongodb.org/browse/SERVER-27159
 
    grep -vE '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}[+-][0-9]{4}\s+'
}

# Create bin/db/ if needed
mkdir -p bin;
mkdir -p bin/db;

# DB_URI defined in travis config 
DB=${DB_URI}
Collections=$( mongo $DB --quiet --eval "db.getCollectionNames().join('\n')"| filter_mongodb_debug_messages )

# Export all collections to bin/db/
for collection in $Collections; do
    if [[ "$collection" != "sessions" ]]; then
        echo ">> $collection"
        mongoexport --uri $DB -c $collection -o ./bin/db/$collection.json
    else
        echo "Skip sessions"
    fi
done