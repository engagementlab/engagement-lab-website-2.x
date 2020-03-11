#!/bin/bash
cd content
node bin/www &
CMS_PID=$!

cd ..

npm run scully:build

kill $CMS_PID
