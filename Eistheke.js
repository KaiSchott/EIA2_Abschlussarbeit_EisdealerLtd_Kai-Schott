"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Eistheke {
        position;
        eissorten;
        constructor() {
            this.position = new Eisdealer.Vector(50, 50);
            this.eissorten = Eisdealer.angebot.eissorten;
        }
        zeichne(crc2) {
            let x = this.position.x;
            let y = this.position.y;
            let width = 80;
            let height = 30;
            crc2.fillStyle = "white";
            crc2.fillRect(x, y, width + 20, height * this.eissorten.length + 20);
            crc2.fillStyle = "black";
            crc2.strokeRect(x, y, width + 20, height * this.eissorten.length + 20);
            y += 10;
            for (let eis of this.eissorten) {
                crc2.fillStyle = eis.farbe;
                crc2.fillRect(x + 10, y, width, height);
                crc2.fillStyle = "black";
                crc2.strokeRect(x + 10, y, width, height);
                crc2.fillText(eis.name, x + 15, y + 20);
                y += height + 10;
            }
        }
    }
    Eisdealer.Eistheke = Eistheke;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Eistheke.js.map