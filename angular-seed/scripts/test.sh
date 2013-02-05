#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"
export NODE_ENV='test';
testacular start $BASE_DIR/../config/testacular.conf.js
