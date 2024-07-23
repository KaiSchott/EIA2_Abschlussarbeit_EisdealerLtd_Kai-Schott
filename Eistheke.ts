namespace Eisdealer {
    export class Eistheke {
        private position: Vector;
        private eissorten: { name: string; farbe: string; }[];

        constructor() {
            this.position = new Vector(50, 50);
            this.eissorten = angebot.eissorten;
        }

        zeichne(crc2: CanvasRenderingContext2D): void {
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
}
