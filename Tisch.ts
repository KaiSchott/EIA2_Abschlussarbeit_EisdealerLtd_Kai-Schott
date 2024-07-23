namespace Eisdealer {
    export class Tisch {
        public nummer: number;
        public position: Vector;
        public sitzplaetze: (Kunde | null)[];

        constructor(nummer: number, position: Vector, sitzplaetze: number) {
            this.nummer = nummer;
            this.position = position;
            this.sitzplaetze = new Array(sitzplaetze).fill(null);
        }

        setzeKunde(kunde: Kunde, platz: number): void {
            if (platz < this.sitzplaetze.length) {
                this.sitzplaetze[platz] = kunde;
            }
        }

        entferneKunde(platz: number): void {
            if (platz < this.sitzplaetze.length) {
                this.sitzplaetze[platz] = null;
            }
        }

        zeichne(crc2: CanvasRenderingContext2D): void {
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
}
