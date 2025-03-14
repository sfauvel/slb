#!/bin/bash

pushd "${BASH_SOURCE%/*}"

pushd docs/tournois;
python3 ../../tournois.py;
popd

node validate_against_schema.js
if [ $? -ne 0 ]; then
    RED='\e[31m'
    NC='\e[32m' # No Color
    echo -n -e "${RED}"
    echo "ERROR !!!"
    echo "   Invalid JSON file"
    echo "   Update aborted"
    echo -n -e "${NC}"
    exit 1
fi

git add docs/tournois/data
# git add tournois.csv
git add docs/tournois/tournois.json
git commit -m "Mise à jour des tournois"
git push

popd