#!/bin/bash

pushd "${BASH_SOURCE%/*}"

python3 tournois.py
git add tournois.csv
git add docs/tournois/tournois.json
git commit -m "Mise à jour des tournois"
git push

popd