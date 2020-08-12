#!/usr/bin/env bash
# Script for installing dev environment

YELLOW='\033[1;33m'
LR='\033[1;31m'
LC='\033[1;36m'
NC='\033[0m'

printf "${YELLOW}---> Engagement Lab dev environment installer. <---\n${NC}"
if test -f api/.env; then
    echo "(.env file found.)"
else 
    printf "${LR}ABORT: Contents for the file /api/.env are missing.${NC}\nYou can roll your own env or obtain confidential contents from the Lab's google drive.\n"
    printf "Please create this file in a text editor.\n"
    exit 1
fi

printf "${LC}You may need the following installed first, in the following order:${NC}\n"
printf "> Command Line Tools (CLT) for Xcode: (run ${LC}xcode-select --install${NC})\n"
printf "> Homebrew: (run command shown at ${LC}https://brew.sh/ ${NC}) \n"
printf "> MongoDB: (run ${LC}brew install mongodb${NC} followed by ${LC}sudo chown -R `id -un` /data/db${nc}) \n"
printf "${LC}======== \n----> Lacking any of the above will cause this installer to fail. <---\n========${NC}\n"
printf "${YELLOW}----> Trying to self-install pre-reqs.${NC}\n"

printf "\n\n\n${LC}----> If you are prompted to download Command Line Tools (CLT) for Xcode, do so and then re-run this script. <---${NC}\n\n\n"
xcode-select --install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew install mongodb-community;
sudo chown -R `id -un` /data/db;
brew services start mongodb-community;

printf "${YELLOW}-> Trying to create local database from most recent dump.${NC}\n"
for filename in ./bin/db/*.json; do mongoimport -d engagement-lab-test --type json --file $filename; done

printf "${YELLOW}-> Trying to self-install nvm.${NC}\n"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

export NVM_DIR=~/.nvm;
source ~/.nvm/nvm.sh;

if nvm install; then
    printf "${LC}nvm environment installed/applied.${NC} \n"
else
    printf "${LR}** It looks like nvm did not self-install. Quitting. ** ${NC}\n "
    printf "nvm is a pre-requisite for this dev environment.\n"
    printf "Please try running this command:\n"
    printf "${LC}wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash${NC} \n"
    exit 1;
fi

printf "${YELLOW}-> Trying to setup local API.${NC}\n"
cd ./api;
npm i;

printf "${YELLOW}-> Trying to setup client app.${NC}\n"
cd ../client;
nvm use;
npm i;
npm i -g npm-run-all;
npm i -g nodemon;

printf "${YELLOW}:) This repo should be ready to go. ${NC}\n -> Please run ${LC}chmod 777 ./app.sh && ./app.sh${NC}\nAfter a little bit, the client shold be available at http://localhost:4200/\n"