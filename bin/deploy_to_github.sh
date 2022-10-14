#!/usr/bin/env bash
rm -rf dist
npm run build
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:FrankFang/react-mangosteen-1-preview.git
git push -f origin master:master
cd -
