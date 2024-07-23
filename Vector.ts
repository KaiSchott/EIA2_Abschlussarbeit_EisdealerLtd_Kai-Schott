namespace Eisdealer {
    export class Vector {
        public x: number;
        public y: number;

        constructor(x: number, y: number) {
            this.set(x, y);
        }

        set(x: number, y: number): void {
            this.x = x;
            this.y = y;
        }

        add(vector: Vector): void {
            this.x += vector.x;
            this.y += vector.y;
        }

        scale(factor: number): void {
            this.x *= factor;
            this.y *= factor;
        }
    }
}
