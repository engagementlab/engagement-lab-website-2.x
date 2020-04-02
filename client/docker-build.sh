#!/bin/bash
cd content
node bin/www prod &
CMS_PID=$!

cd ..

npm run scully:build

kill $CMS_PID
