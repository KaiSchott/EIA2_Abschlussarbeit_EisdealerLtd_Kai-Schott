import { Kunde } from './Kunde';
import { Bestellung } from './Bestellung';
import { Eisbecher } from './Eisbecher';
import { Eissorte } from './Eissorte';
import { Topping } from './Topping';
import { Sauce } from './Sauce';

export class Eisdiele {
    private kundenListe: Kunde[] = [];
    private bestellListe: Bestellung[] = [];
    private einnahmen: number = 0;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    start() {
        this.loop();
    }

    private loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    private update() {
        // Update logic here
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Drawing logic here
    }
}
