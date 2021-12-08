#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games

# Have to re-assign vars from shell env
export AZURE_STORAGE_ACCOUNT=$AZURE_STORAGE_ACCOUNT
export AZURE_STORAGE_CONNECTION_STRING=$AZURE_STORAGE_CONNECTION_STRING
export AZURE_SUBSCRIPTION=$AZURE_SUBSCRIPTION

# Set default subscription
az account set -s $AZURE_SUBSCRIPTION

# Upload app build to Azure
az storage blob upload-batch -d '$web' -s ./bin/app

# Clear CDN cache
az cache purge