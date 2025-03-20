const {is_image, migrate, create_tournament_lines} = require('../docs/tournois/tournoi.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Tournoi", function() {  
  let document;
  beforeEach(function(){
    document = new JSDOM(`<!DOCTYPE html><html><body></body></html>`).window.document;
  });

    it("is image", function() {
      expect(is_image("file.jpeg")).toBe(true);
      expect(is_image("file.jpg")).toBe(true);
      expect(is_image("file.gif")).toBe(true);
      expect(is_image("file.png")).toBe(true);
      
      expect(is_image("file.JPG")).toBe(true);
      expect(is_image("file.PNG")).toBe(true);

      expect(is_image("file.txt")).toBe(false);
      expect(is_image("file.json")).toBe(false);
      expect(is_image("file.html")).toBe(false);
      expect(is_image("file.pdf")).toBe(false);
    })

    it ("Migrate legacy tournament", function() {
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

      const tournoi = migrate(tournoi_legacy);
      expect(tournoi.mail).toEqual("Tournoi du SLB");
      expect(tournoi.date).toEqual("17/05/2025");
      expect(tournoi.date_limite).toEqual("09/05/2025");
      expect(tournoi.particularite).toEqual("RAS");
      expect(tournoi.categories).toEqual([
        {
          "categorie": "U15M",
          "niveau": "X"
        },
        {
            "categorie": "U13M",
            "niveau": "X"
        }
      ]);
      expect(tournoi.repertoire).toEqual("data/2025_05_17_slb");
      expect(tournoi.ressources).toEqual([
        "data/2025_05_17_slb/mail.html"
      ]);
    })

    it ("Create tournament rows" , function() {
     
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
    expect(rows.length).toBe(2);
    {
      const cells = rows[0].getElementsByTagName('td');
      expect(cells[0].innerHTML).toBe("SLB");
      expect(cells[1].innerHTML).toBe("17/05/2025");
      expect(cells[2].innerHTML).toBe("09/05/2025");
      expect(cells[3].innerHTML).toBe("U15M");
      expect(cells[4].innerHTML).toBe("X");
    }
    {
      const cells = rows[1].getElementsByTagName('td');
      expect(cells[0].innerHTML).toBe("SLB");
      expect(cells[1].innerHTML).toBe("17/05/2025");
      expect(cells[2].innerHTML).toBe("09/05/2025");
      expect(cells[3].innerHTML).toBe("U13M");
      expect(cells[4].innerHTML).toBe("X");
    }
  })
});