namespace Eisdealer {
    export class Eissorte {
        public name: string;
        public preis: number;
        public farbe: string;

        constructor(name: string, preis: number, farbe: string) {
            this.name = name;
            this.preis = preis;
            this.farbe = farbe;
        }
    }
}
