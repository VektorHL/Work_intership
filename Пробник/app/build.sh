#!/bin/sh


case "$BRANCH_NAME" in
  dev ) echo "build dev" && yarn build:dev;;
  feature/* ) echo "build dev" && yarn build:dev;;
  PR-* ) echo "build PR" && yarn lint && yarn build:dev;;
  release/* ) echo "build test" && yarn build:master;;
  * ) echo "unknown branch" && exit 1;;
esac  