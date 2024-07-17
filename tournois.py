# Transform CSV to json

import csv
import json

CATEGORIES = [
    "Seniors M", 
    "Seniors F", 
    "Loisir", 
    "U20M", 
    "U18M", 
    "U18F", 
    "U17M", 
    "U17F", 
    "U15M", 
    "U15F", 
    "U13M", 
    "U13F", 
    "U11M", 
    "U11F", 
    "U9M", 
    "U9F", 
    "U7",]

def group_category(row):
    row["categories"] = [{"categorie":categorie, "niveau": row[categorie]} for categorie in CATEGORIES if row[categorie] != ""]
    for categorie in CATEGORIES:
        del row[categorie]

def csv_to_json(csv_file, json_file):
    data = []
    with open(csv_file) as f:
        csv_reader = csv.DictReader(f)
        for row in csv_reader:
            group_category(row)
            data.append(row)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
        
csv_to_json('tournois.csv', 'docs/tournois.json')