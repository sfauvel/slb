FOLDER=docs/tournois/data/$1

if [ -z "$FOLDER" ]; then
    echo "Usage: $0 <folder>"
    exit 1
fi

if [ -d "$FOLDER" ]; then
    echo -e "\e[31mError: Directory '$FOLDER' already exists.\e[0m"
    exit 1
fi

if ! [[ "$1" =~ ^[0-9]{4}_[0-9]{2}_[0-9]{2}_.*$ ]]; then
    echo -e "\e[31mError: Folder name must match the format YYYY_MM_JJ_VILLE\e[0m"
    exit 1
fi

echo -e "\e[32mCreating directory '$FOLDER'...\e[0m"
mkdir "$FOLDER"
touch "$FOLDER/mail.html"
touch "$FOLDER/tournoi.json"
