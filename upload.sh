#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games

# TODO: set in travis env
# export AZURE_STORAGE_ACCOUNT=
# export AZURE_STORAGE_ACCESS_KEY=

# Upload static build to Azure
az login --service-principal -u $AZURE_USER -p $AZURE_PASS --tenant $AZURE_TENANT
az storage blob upload-batch -d '$web' -s ./bin/app --auth-mode login
