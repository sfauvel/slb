#!/bin/bash

pushd "${BASH_SOURCE%/*}"

pushd docs/tournois;python3 ../../tournois.py;popd
git add docs/tournois/data
# git add tournois.csv
git add docs/tournois/tournois.json
git commit -m "Mise à jour des tournois"
git push

popd