#!/bin/bash

# Require arg
if [  $# -eq 0 ]; then
    echo "Must run script w/ one arg, either 'qa' or 'prod'"
    exit 1
fi

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

# Client
cd client; 

nvm use;
npm i;

pm2 stop 'elab-web-client'; 

if [ "$1" == "prod" ]; then
    npm run build;
else
    npm run build:qa;
fi

npm i -g pm2;
pm2 start 'elab-web-client';

# API
cd ../api;
nvm use;
npm i;
npm i -g pm2;
pm2 restart 'elab-web-api';