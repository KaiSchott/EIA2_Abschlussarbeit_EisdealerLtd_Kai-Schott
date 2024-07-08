import { Kunde } from './Kunde';
import { Eisbecher } from './Eisbecher';

export class Bestellung {
    private kunde: Kunde;
    private eisbecher: Eisbecher;
    private preis: number;

    constructor(kunde: Kunde, eisbecher: Eisbecher) {
        this.kunde = kunde;
        this.eisbecher = eisbecher;
        this.preis = this.berechnePreis();
    }

    berechnePreis(): number {
        let preis = 0;
        // Preisberechnung basierend auf den Eissorten, Toppings und Saucen
        return preis;
    }

    ausgeben() {
        // Logik zur Ausgabe der Bestellung
    }
}
