#!/bin/bash

echo "Running prerender"

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

nvm use;

# npm run prerender:express &
# SERVERPID=`echo $!` &
npm run prerender:compile;
# echo "PID of API server: ${SERVERPID}; attempting to kill." &
# kill -9 $SERVERPID;
