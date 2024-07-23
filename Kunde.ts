namespace Eisdealer {
    export class Kunde {
        public name: string;
        public stimmung: number;
        public bestellung: Map<string, number>;
        private bestellzeit: number;
        private position: Vector;
        private farbe: string;
        public eis: string[] = [];
        private stimmungsInterval: number | undefined;
        public bereitZuBezahlen: boolean = false;
        private stimmungVerbessert: boolean = false;

        constructor(name: string, position: Vector, farbe: string) {
            this.name = name;
            this.stimmung = 100;
            this.bestellung = new Map();
            this.bestellzeit = Date.now();
            this.position = position;
            this.farbe = farbe;
        }

        getPosition(): Vector {
            return this.position;
        }

        setPosition(newPosition: Vector): void {
            this.position = newPosition;
        }

        setzeBestellung(sorte: string, anzahl: number): void {
            this.bestellung.set(sorte, anzahl);
        }

        aktualisiereStimmung(delta: number): void {
            this.stimmung = Math.max(0, Math.min(100, this.stimmung + delta));
        }

        verbesserStimmung(): void {
            if (!this.stimmungVerbessert) {
                if (this.stimmung <= 70) {
                    this.aktualisiereStimmung(30);
                } else if (this.stimmung > 70) {
                    this.stimmung = 100;
                }
                this.stimmungVerbessert = true;
            }
        }

        erhalteBestellzeit(): number {
            return this.bestellzeit;
        }

        zeichne(crc2: CanvasRenderingContext2D): void {
            crc2.fillStyle = this.farbe;
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
            crc2.fill();

            let xOffset = this.position.x + 30;
            for (let kugel of this.eis) {
                crc2.fillStyle = kugel;
                crc2.beginPath();
                crc2.arc(xOffset, this.position.y, 10, 0, 2 * Math.PI);
                crc2.fill();
                xOffset += 20;
            }

            crc2.strokeStyle = "black";
            crc2.lineWidth = 2;
            if (this.stimmung > 70) {
                crc2.beginPath();
                crc2.arc(this.position.x, this.position.y + 5, 5, 0, Math.PI, false);
                crc2.stroke();
                if (this.stimmung === 100) {
                    crc2.fillStyle = "yellow";
                    crc2.beginPath();
                    crc2.moveTo(this.position.x - 8, this.position.y - 5);
                    crc2.lineTo(this.position.x - 4, this.position.y - 1);
                    crc2.lineTo(this.position.x, this.position.y - 5);
                    crc2.lineTo(this.position.x - 4, this.position.y - 9);
                    crc2.closePath();
                    crc2.fill();

                    crc2.beginPath();
                    crc2.moveTo(this.position.x + 4, this.position.y - 5);
                    crc2.lineTo(this.position.x + 8, this.position.y - 1);
                    crc2.lineTo(this.position.x + 12, this.position.y - 5);
                    crc2.lineTo(this.position.x + 8, this.position.y - 9);
                    crc2.closePath();
                    crc2.fill();
                } else {
                    crc2.beginPath();
                    crc2.arc(this.position.x - 5, this.position.y - 5, 2, 0, 2 * Math.PI);
                    crc2.stroke();
                    crc2.beginPath();
                    crc2.arc(this.position.x + 5, this.position.y - 5, 2, 0, 2 * Math.PI);
                    crc2.stroke();
                }
            } else if (this.stimmung > 40) {
                crc2.beginPath();
                crc2.moveTo(this.position.x - 5, this.position.y + 5);
                crc2.lineTo(this.position.x + 5, this.position.y + 5);
                crc2.stroke();
                crc2.beginPath();
                crc2.arc(this.position.x - 5, this.position.y - 5, 2, 0, 2 * Math.PI);
                crc2.stroke();
                crc2.beginPath();
                crc2.arc(this.position.x + 5, this.position.y - 5, 2, 0, 2 * Math.PI);
                crc2.stroke();
            } else {
                crc2.beginPath();
                crc2.arc(this.position.x, this.position.y + 10, 5, 0, Math.PI, true);
                crc2.stroke();
                crc2.beginPath();
                crc2.arc(this.position.x - 5, this.position.y - 5, 2, 0, 2 * Math.PI);
                crc2.stroke();
                crc2.beginPath();
                crc2.arc(this.position.x + 5, this.position.y - 5, 2, 0, 2 * Math.PI);
                crc2.stroke();
            }

            if (this.bereitZuBezahlen) {
                crc2.fillStyle = "green";
                crc2.fillText("$", this.position.x - 5, this.position.y + 35);
            }
        }

        istBedient(): boolean {
            return this.bestellung.size === 0;
        }

        startStimmungsverlust(): void {
            this.stopStimmungsverlust();
            this.stimmungsInterval = window.setInterval(() => {
                this.aktualisiereStimmung(-1);
            }, 1000);
        }

        stopStimmungsverlust(): void {
            if (this.stimmungsInterval !== undefined) {
                clearInterval(this.stimmungsInterval);
                this.stimmungsInterval = undefined;
            }
        }
    }
}
