"use strict";
/// <reference path="angebot.ts" />
/// <reference path="Eistheke.ts" />
/// <reference path="Kunde.ts" />
/// <reference path="Tisch.ts" />
var Eisdealer;
(function (Eisdealer) {
    let crc2;
    let theke;
    let tische = [];
    let kunden = [];
    let wartendeKunden = [];
    let currentKunde = null;
    let kundennummer = 1; // Start bei 1
    let einnahmen = 0;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        theke = new Eisdealer.Eistheke();
        let tisch1 = new Eisdealer.Tisch(1, new Eisdealer.Vector(200, 200), 1);
        let tisch2 = new Eisdealer.Tisch(2, new Eisdealer.Vector(400, 200), 1);
        let tisch3 = new Eisdealer.Tisch(3, new Eisdealer.Vector(600, 200), 1);
        let tisch4 = new Eisdealer.Tisch(4, new Eisdealer.Vector(200, 400), 1);
        let tisch5 = new Eisdealer.Tisch(5, new Eisdealer.Vector(400, 400), 1);
        let tisch6 = new Eisdealer.Tisch(6, new Eisdealer.Vector(600, 400), 1);
        tische.push(tisch1, tisch2, tisch3, tisch4, tisch5, tisch6);
        canvas.addEventListener("click", handleClick);
        // SetInterval für das regelmäßige Erscheinen von Kunden
        window.setInterval(createKunde, 5000);
        window.setInterval(update, 20);
    }
    function createKunde() {
        let freieTische = tische.filter(tisch => tisch.sitzplaetze[0] === null);
        if (freieTische.length > 0) {
            let tisch = freieTische[Math.floor(Math.random() * freieTische.length)];
            let position = new Eisdealer.Vector(tisch.position.x, tisch.position.y);
            let farben = ["blue", "green", "orange", "purple", "pink"];
            let kunde = new Eisdealer.Kunde("Kunde " + kundennummer++, position, farben[Math.floor(Math.random() * farben.length)]);
            let bestellungen = generiereBestellungen();
            bestellungen.forEach((anzahl, sorte) => kunde.setzeBestellung(sorte, anzahl));
            if (tisch.sitzplaetze[0] !== null) {
                let alterKunde = tisch.sitzplaetze[0];
                alterKunde.stopStimmungsverlust();
            }
            tisch.setzeKunde(kunde, 0);
            kunden.push(kunde);
            kunde.startStimmungsverlust(); // Stimmungsverlust starten, sobald der Kunde sitzt
        }
        else {
            let wartendePosition = new Eisdealer.Vector(700 + (wartendeKunden.length * 30), 500);
            let farben = ["blue", "green", "orange", "purple", "pink"];
            let kunde = new Eisdealer.Kunde("Kunde " + kundennummer++, wartendePosition, farben[Math.floor(Math.random() * farben.length)]);
            let bestellungen = generiereBestellungen();
            bestellungen.forEach((anzahl, sorte) => kunde.setzeBestellung(sorte, anzahl));
            wartendeKunden.push(kunde);
            kunde.startStimmungsverlust(); // Stimmungsverlust starten, sobald der Kunde wartet
        }
    }
    function generiereBestellungen() {
        let bestellungen = new Map();
        let verbleibendeKugeln = Math.floor(Math.random() * 3) + 1; // Zufällig 1 bis 3 Kugeln
        while (verbleibendeKugeln > 0) {
            let sorte = Eisdealer.angebot.eissorten[Math.floor(Math.random() * Eisdealer.angebot.eissorten.length)].name;
            let anzahl = Math.floor(Math.random() * verbleibendeKugeln) + 1;
            if (bestellungen.has(sorte)) {
                anzahl = Math.min(anzahl, verbleibendeKugeln);
                bestellungen.set(sorte, bestellungen.get(sorte) + anzahl);
            }
            else {
                bestellungen.set(sorte, anzahl);
            }
            verbleibendeKugeln -= anzahl;
        }
        return bestellungen;
    }
    function handleClick(_event) {
        let x = _event.clientX - crc2.canvas.offsetLeft;
        let y = _event.clientY - crc2.canvas.offsetTop;
        // Überprüfen, ob auf einen Kunden geklickt wurde
        for (let tisch of tische) {
            for (let kunde of tisch.sitzplaetze) {
                if (kunde && Math.hypot(kunde.getPosition().x - x, kunde.getPosition().y - y) < 20) {
                    if (kunde.bereitZuBezahlen) {
                        // Kunde bezahlen lassen und entfernen
                        let betrag = Array.from(kunde.bestellung.values()).reduce((summe, anzahl) => summe + anzahl * 1.8, 0); // Beispielpreis für jede Kugel
                        einnahmen += betrag;
                        kunde.stopStimmungsverlust(); // Stimmungsverlust stoppen, wenn der Kunde den Tisch verlässt
                        let tisch = tische.find(t => t.sitzplaetze.includes(kunde));
                        if (tisch) {
                            tisch.entferneKunde(0);
                        }
                        // Überprüfen, ob wartende Kunden existieren und setzen sie an einen freien Tisch
                        if (wartendeKunden.length > 0) {
                            let neuerKunde = wartendeKunden.shift();
                            let freierTisch = tische.find(t => t.sitzplaetze[0] === null);
                            if (freierTisch) {
                                neuerKunde.setPosition(new Eisdealer.Vector(freierTisch.position.x, freierTisch.position.y));
                                freierTisch.setzeKunde(neuerKunde, 0);
                                kunden.push(neuerKunde);
                                neuerKunde.startStimmungsverlust(); // Stimmungsverlust starten, sobald der Kunde vom Warten zum Tisch wechselt
                            }
                        }
                        createKunde();
                    }
                    else {
                        currentKunde = kunde;
                        showOrderPopup(kunde);
                    }
                    return;
                }
            }
        }
        // Überprüfen, ob auf eine Eissorte geklickt wurde
        let thekeX = 50;
        let thekeY = 50;
        let iceHeight = 30;
        for (let eis of Eisdealer.angebot.eissorten) {
            if (x > thekeX && x < thekeX + 80 && y > thekeY && y < thekeY + iceHeight) {
                if (currentKunde) {
                    currentKunde.eis.push(eis.farbe);
                    currentKunde.setzeBestellung(eis.name, (currentKunde.bestellung.get(eis.name) || 0) + 1);
                    currentKunde.verbesserStimmung(); // Verbesserung der Stimmung um eine Stufe
                    currentKunde.stopStimmungsverlust(); // Stoppe den Stimmungsverlust, sobald der Kunde sein Eis hat
                }
            }
            thekeY += 40;
        }
    }
    function showOrderPopup(kunde) {
        let bestellungen = "";
        kunde.bestellung.forEach((anzahl, sorte) => {
            bestellungen += `${sorte}: ${anzahl}, `;
        });
        alert(`Kunde ${kunde.name} bestellt: ${bestellungen}`);
        startEatingTimer(kunde);
    }
    function startEatingTimer(kunde) {
        let totalTime = Array.from(kunde.bestellung.values()).reduce((a, b) => a + b, 0) * 20 * 1000; // 20 Sekunden pro Kugel
        kunde.stopStimmungsverlust(); // Stimmungsverlust stoppen, wenn der Kunde anfängt zu essen
        setTimeout(() => {
            kunde.bereitZuBezahlen = true; // Kunde ist bereit zu bezahlen
        }, totalTime);
    }
    function update() {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        for (let tisch of tische) {
            tisch.zeichne(crc2);
        }
        for (let kunde of wartendeKunden) {
            kunde.zeichne(crc2);
        }
        for (let tisch of tische) {
            for (let kunde of tisch.sitzplaetze) {
                if (kunde) {
                    kunde.zeichne(crc2);
                }
            }
        }
        theke.zeichne(crc2);
        // Zeichne die Einnahmen
        crc2.fillStyle = "black";
        crc2.fillText(`Einnahmen: ${einnahmen.toFixed(2)}€`, 10, 10);
    }
})(Eisdealer || (Eisdealer = {}));
//# sourceMappingURL=main.js.map