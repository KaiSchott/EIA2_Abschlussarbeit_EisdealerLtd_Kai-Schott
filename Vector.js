"use strict";
var Eisdealer;
(function (Eisdealer) {
    class Vector {
        x;
        y;
        constructor(x, y) {
            this.set(x, y);
        }
        set(x, y) {
            this.x = x;
            this.y = y;
        }
        add(vector) {
            this.x += vector.x;
            this.y += vector.y;
        }
        scale(factor) {
            this.x *= factor;
            this.y *= factor;
        }
    }
    Eisdealer.Vector = Vector;
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=Vector.js.map