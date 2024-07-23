"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Tisch {
        nummer;
        position;
        sitzplaetze;
        constructor(nummer, position, sitzplaetze) {
            this.nummer = nummer;
            this.position = position;
            this.sitzplaetze = new Array(sitzplaetze).fill(null);
        }
        setzeKunde(kunde, platz) {
            if (platz < this.sitzplaetze.length) {
                this.sitzplaetze[platz] = kunde;
            }
        }
        entferneKunde(platz) {
            if (platz < this.sitzplaetze.length) {
                this.sitzplaetze[platz] = null;
            }
        }
        zeichne(crc2) {
            crc2.fillStyle = "brown";
            crc2.fillRect(this.position.x - 20, this.position.y - 20, 40, 40);
            crc2.strokeStyle = "black";
            crc2.strokeRect(this.position.x - 20, this.position.y - 20, 40, 40);
            for (let kunde of this.sitzplaetze) {
                if (kunde) {
                    kunde.zeichne(crc2);
                }
            }
        }
    }
    Eisdealer.Tisch = Tisch;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Tisch.js.map