#!/bin/sh

if [ -d "node_modules" ]
then
    echo "Directory node_modules exists. Not reinstalling. Delete node_modules to reinstall."
else
  npm install
fi
yarn start
