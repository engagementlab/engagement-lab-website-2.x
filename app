#!/usr/bin/env bash
# Script for launching dev, CMS, or static/prod builds
WARN='\033[1;33m'
NC='\033[0m'
DEV=false

if [ "$1" == "" ]; then
    printf "${WARN}No argument provided, defaulting to '--dev'${NC}\n";
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