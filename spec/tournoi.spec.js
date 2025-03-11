const is_image = require('../docs/tournois/tournoi.js');

describe("Tournoi", function() {  
    it("is image", function() {
      expect(is_image("file.jpeg")).toBe(true);
      expect(is_image("file.jpg")).toBe(true);
      expect(is_image("file.gif")).toBe(true);
      expect(is_image("file.png")).toBe(true);

      expect(is_image("file.txt")).toBe(false);
      expect(is_image("file.json")).toBe(false);
      expect(is_image("file.html")).toBe(false);
      expect(is_image("file.pdf")).toBe(false);
    }
    );
  }
);