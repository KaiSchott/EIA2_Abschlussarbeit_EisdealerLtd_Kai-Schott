import { Eissorte } from './Eissorte';
import { Topping } from './Topping';
import { Sauce } from './Sauce';

export class Eisbecher {
    private eissorten: Eissorte[] = [];
    private toppings: Topping[] = [];
    private saucen: Sauce[] = [];

    hinzufuegenEissorte(eissorte: Eissorte) {
        this.eissorten.push(eissorte);
    }

    hinzufuegenTopping(topping: Topping) {
        this.toppings.push(topping);
    }

    hinzufuegenSauce(sauce: Sauce) {
        this.saucen.push(sauce);
    }
}
