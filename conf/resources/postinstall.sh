#!/bin/sh

PROJECT_NAME=$1

realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}


CWD=$(realpath $(dirname $0))

if [ "$PROJECT_NAME" = "" ] ; then
    echo "Provide project name"
    exit 1
fi

if [ ! -e "$(pwd)/package.json" ] ; then
    echo "$(pwd)/package.json not found in current directory"
    exit 1
fi

cp -f $CWD/git-hooks/* .git/hooks

# [ -L "node_modules/$PROJECT_NAME" ] || ln -s ../src node_modules/$PROJECT_NAME
