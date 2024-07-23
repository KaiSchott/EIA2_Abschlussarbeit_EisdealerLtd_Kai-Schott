namespace Eisdealer {
    export interface Angebot {
        eissorten: { name: string; farbe: string; }[];
    }

    export const angebot: Angebot = {
        eissorten: [
            { name: "Schokolade", farbe: "#8B4513" },
            { name: "Vanille", farbe: "#F3E5AB" },
            { name: "Erdbeere", farbe: "#FF6347" },
            { name: "Zitrone", farbe: "#FFFF00" },
            { name: "Minze", farbe: "#98FB98" }
        ]
    };
}
