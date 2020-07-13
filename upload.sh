#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games

# Have to re-assign vars from shell env
export AZURE_STORAGE_ACCOUNT=$AZURE_STORAGE_ACCOUNT
export AZURE_STORAGE_ACCESS_KEY=$AZURE_STORAGE_ACCESS_KEY

export AZURE_USER=$AZURE_USER
export AZURE_PASS=$AZURE_PASS
export AZURE_TENANT=$AZURE_TENANT

# Upload app build to Azure
az login --service-principal -u $AZURE_USER -p $AZURE_PASS --tenant $AZURE_TENANT > /dev/null
az storage blob upload-batch -d '$web' -s ./bin/app --auth-mode login