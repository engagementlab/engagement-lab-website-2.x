#!/bin/bash

echo "Running prerender"

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

nvm use;

npm run prerender:compile;
./node_modules/@angular/cli/bin/ng run prerender:express;