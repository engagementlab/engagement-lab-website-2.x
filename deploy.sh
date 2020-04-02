#!/bin/bash

# Require arg
if [  $# -eq 0 ]; then
    echo "Must run script w/ one arg, either 'qa' or 'prod'"
    exit 1
fi

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

# Client
bash ./toggledowntime.sh start; 
cd client; 

nvm use;
npm i;

pm2 stop 'engagement-lab-website-client'; 

if [ "$1" == "prod" ]; then
    npm run build;
else
    npm run build-qa;
fi

pm2 start 'engagement-lab-website-client';

# API
cd content;
nvm use;
npm i;
pm2 restart 'engagement-lab-website-api';

# Stop downtime page
cd ../..;
bash ./toggledowntime.sh stop