import { Eisbecher } from './Eisbecher';

export class Kunde {
    private name: string;
    private stimmung: number;
    private bestellung: Eisbecher;

    constructor(name: string) {
        this.name = name;
        this.stimmung = 100; // Maximalstimmung
    }

    warten() {
        this.stimmung -= 1;
    }

    bestellen(eisbecher: Eisbecher) {
        this.bestellung = eisbecher;
    }

    essen() {
        this.stimmung += 10;
    }

    bezahlen() {
        // Logik zum Bezahlen
    }
}
