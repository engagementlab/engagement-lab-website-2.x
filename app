#!/usr/bin/env bash
# Script for launching dev, CMS, or static/prod builds

DEV=false

if [ "$1" == "" ]; then
    echo "No argument provided, defaulting to '--dev'";
    DEV=true;
fi

export NVM_DIR=~/.nvm;
source ~/.nvm/nvm.sh;

cd client;
nvm use;

if [ "$1" == "--static" ]; then

    echo "Running static build, then starting localhost...";
    npm run serve:static;

fi

if [ "$1" == "--cms" ]; then

    echo "Running live CMS production build, then starting localhost...";
    npm run build;
    npm-run-all -p serve:api:prod serve:http;

fi

if [ "$DEV" = true ]; then

    npm run dev;

fi