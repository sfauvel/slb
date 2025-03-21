const {is_image, migrate, create_tournament_lines} = require('../docs/tournois/tournoi.js');
const { doc, verify } = require('../spec/doc_as_test.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function group_by(values, fn_key, fn_value = function(value) { return value; }) {
  return values.reduce(function(result, value) {
    const key = fn_key(value);
    (result[key] ??= []).push(fn_value(value));
    return result;
  }, {});
}

describe("Tournoi", function() {  
    let document;
    beforeEach(function(){
      document = new JSDOM(`<!DOCTYPE html><html><body></body></html>`).window.document;
    });

    doc("Is extension an image", function(title) {
      extensions = [
        'jpeg',
        'jpg',
        'gif',
        'png',
        'JPG',
        'PNG',
        'txt',
        'json',
        'html',
        'pdf',
      ];

      result = group_by(extensions, 
        fn_key = extension => is_image(`file.${extension}`),
        fn_value = extension =>  `* ${extension}`
      );

      var content = [
        `= ${title}\n`,
        ".Image extensions",
        result[true].join("\n"),
        "",
        ".Not image extensions",
        result[false].join("\n")
      ];

      verify(title, content.join('\n'));
    })

    doc ("Migrate legacy tournament", function(title) {
      const tournoi_legacy = {
        "Sujet mail": "Tournoi du SLB",
        "Club": "SLB",
        "Date": "17/05/2025",
        "Particularit\u00e9": "RAS",
        "Date limite": "09/05/2025",
        "categories": [
            {
                "categorie": "U15M",
                "niveau": "X"
            },
            {
                "categorie": "U13M",
                "niveau": "X"
            },
          ],
          "repertoire": "data/2025_05_17_slb",
          "ressources": [
              "data/2025_05_17_slb/mail.html"
          ]
      };

      let migrated = migrate(tournoi_legacy);
      content = [
        '[json]\n.json input\n----',
        JSON.stringify(tournoi_legacy, null, 4),
        "----",
        "",
        '[json]\n.json after migration\n----',
        JSON.stringify(migrated, null, 4),
        '----'
      ];
      
      let migrate_twice = migrate(migrated);
      if (JSON.stringify(migrate_twice) !== JSON.stringify(migrated)) {
        content.push(
          "",
          "[WARNING]\n--\nmigration is not idempotent.\n--",
          "",
          '[json]\n.json after a second migration\n----',
          JSON.stringify(migrate_twice, null, 4),
          '----'
        );
      } else {
        content.push(
          "",
          "[NOTE]\n--\nMigration is idempotent.\n\nWe can call it several times with the same result.\n--",
        );
      }

      verify(title, content.join('\n'));
    })

    doc ("Create tournament rows" , function(title) {
     
      const tournoi = {
        "mail": "Tournoi du SLB",
        "club": "SLB",
        "date": "17/05/2025",
        "particularite": "RAS",
        "date_limite": "09/05/2025",
        "categories": [
            {
                "categorie": "U15M",
                "niveau": "X"
            },
            {
                "categorie": "U13M",
                "niveau": "X"
            },
        ],
        "repertoire": "data/2025_05_17_paulx_cholti_re",
        "ressources": [
            "data/2025_05_17_paulx_cholti_re/mail.html"
        ]
    };
  
    const rows = create_tournament_lines(document, tournoi);
  
    var content = [`= ${title}\n`];

    content = content.concat([
      '[json]\n.json input\n----',
      JSON.stringify(tournoi, null, 4),
      '----\n'
    ]);
    
    content = content.concat([
      '.HTML code generated\n----',
      rows.map(r => r.innerHTML).join('\n'),
      '----\n'
    ]);

    content = content.concat(['.Rendering in a table\n--\n++++\n<table border="1">',
      rows.map(r => `<tr>${r.innerHTML}</tr>`).join('\n'),
      '<table>\n++++\n--'
    ]);

    verify(title, content.join('\n'));
  })
});