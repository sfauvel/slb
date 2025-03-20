

function is_image(url) {
    return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function migrate_all(data) {
    data.tournois.forEach(tournoi => {
        migrate(tournoi)
    })
    return data
}

function migrate(tournoi) {
    tournoi.mail = tournoi["Sujet mail"];
    tournoi.club = tournoi["Club"];
    tournoi.date = tournoi["Date"];
    tournoi.particularite = tournoi["Particularit\u00e9"];
    tournoi.date_limite = tournoi["Date limite"];
    return tournoi;
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
