

function is_image(url) {
    return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function migrate_all(data) {
    return { 
        "tournois": data.tournois.map(tournoi => migrate(tournoi)),
        "last_update": data.last_update
    };
}


function migrate(tournoi) {
    var t = {};
    t.mail = tournoi.mail || tournoi["Sujet mail"],
    t.club = tournoi.club || tournoi["Club"],
    t.date = tournoi.date || tournoi["Date"],
    t.particularite = tournoi.particularite || tournoi["Particularit\u00e9"],
    t.date_limite = tournoi.date_limite || tournoi["Date limite"]
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

function create_tournament_details(tournoi, telechargements) {
    const categories = tournoi.categories === undefined
                ? ['Non spécifiée']
                : tournoi.categories.map(categorie => `<li>${categorie.categorie}: ${categorie.niveau}</li>`);

    return `
    <div class="infos_tournoi subcontent">
        <p><span class="title">Club:</span> ${tournoi.club}</p>
        <p><span class="title">Date:</span> ${tournoi.date}</p>
        <p><span class="title">Date limite:</span> ${tournoi.date_limite}</p>
        <p><span class="title">Catégories:</span><ul>
${categories.map(categorie => `            ${categorie}`).join('\n')}
        </ul></p>
        <p><span class="title">Documents:</span>
        <ul>${telechargements.join('\n')}</ul>
        </p>
    </div>`
}

if (typeof module !== 'undefined') {
    module.exports = {
        is_image,
        migrate,
        migrate_all,
        create_tournament_lines,
        create_tournament_details
    };
}
