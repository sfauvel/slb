# Transform CSV to json

import csv
import json
from datetime import datetime
import os

CATEGORIES = [
    "Seniors M", 
    "Seniors F", 
    "Loisir", 
    "U21M", 
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


def get_resources(row):
    repertoire = row["repertoire"]
    resources = []
    if repertoire != "":
        if os.path.exists(repertoire):
            for file in [file for file in os.listdir(repertoire) if file != 'tournoi.json']:
                resources.append(os.path.join(repertoire, file))
    return resources

def add_resources(row):
    repertoire = row["Repertoire"]
    row["resources"] = []
    if repertoire != "":
        repertoire = "details/" + repertoire
        if os.path.exists(repertoire):
            for file in os.listdir(repertoire):
                row["resources"].append(os.path.join(repertoire, file))
    

def csv_to_json(csv_file, json_file):
    tournois = []
    with open(csv_file) as f:
        csv_reader = csv.DictReader(f)
        for row in csv_reader:
            group_category(row)
            add_resources(row)
            tournois.append(row)

    now_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    data = {
        "tournois": tournois,
        "last_update": now_string,
    }
    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
        

def create_json(detail_path, output_json_file):
    """
    A tournament is a directory with a 'tournoi.json' file that describe it and some files that are resources.
    Browse directories to create a file containing all tournaments.
    On each, we add, the path to the directory and the list of resources.
    """
    paths = []
    if os.path.exists(detail_path):
        paths = [os.path.join(detail_path, path) for path in os.listdir(detail_path)]
        paths = [path for path in paths if os.path.isdir(path)]
    else: 
        print(f"Le répertoire '{detail_path}' n'existe pas")

    tournois = []
    for path in paths:
        tournoi_path = os.path.join(path, 'tournoi.json')
        if os.path.exists(tournoi_path):
            with open(tournoi_path) as json_file:
                tournoi = json.load(json_file)
                tournoi['repertoire'] = path
                tournoi['ressources'] = get_resources(tournoi)
                tournois.append(tournoi)
    
    print(f"Nombre de tournois: {len(tournois)}")
    now_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    data = {
        "tournois": tournois,
        "last_update": now_string,
    }
    with open(output_json_file, 'w') as output_file:
        json.dump(data, output_file, indent=4)

#csv_to_json('tournois.csv', 'docs/tournois/tournois.json')
# Run it from the folder that contains the 'index.html' file
create_json('data', 'tournois.json')