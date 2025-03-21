

function is_image(url) {
    return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function migrate_all(data) {
    return { "tournois": data.tournois.map(tournoi => migrate(tournoi)) };
}


function migrate(tournoi) {
    var t = {};
    t.mail = tournoi["Sujet mail"],
    t.club = tournoi["Club"],
    t.date = tournoi["Date"],
    t.particularite = tournoi["Particularit\u00e9"],
    t.date_limite = tournoi["Date limite"]
    t.categories = tournoi.categories
    t.repertoire = tournoi.repertoire
    t.ressources = tournoi.ressources
    return t;
  }

function creer_cellule_texte(document, texte) {
    const cellule = document.createElement('td');
    cellule.textContent = texte;
    return cellule;
}

function create_tournament_lines(document, tournoi) {
     //console.log(tournoi.club)
     const categories = tournoi.categories === undefined ? ['Non spécifiée'] : tournoi.categories;
     const dateLimite = tournoi.date_limite === undefined ? '' : tournoi.date_limite;

     rows_content = Array.from(categories, (categorie) => {
        return  [
           tournoi.club, 
           tournoi.date, 
           dateLimite, 
           categorie.categorie, 
           categorie.niveau
        ];
     });

     return Array.from(rows_content, (content) => {
        const row = document.createElement('tr');
        content.forEach(function(text) {
            row.appendChild(creer_cellule_texte(document, text));
        });
        return row; 
    });
}


if (typeof module !== 'undefined') {
    module.exports = {
        is_image,
        migrate,
        migrate_all,
        create_tournament_lines
    };
}
