"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Eissorte {
        name;
        preis;
        farbe;
        constructor(name, preis, farbe) {
            this.name = name;
            this.preis = preis;
            this.farbe = farbe;
        }
    }
    Eisdealer.Eissorte = Eissorte;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Eissorte.js.map