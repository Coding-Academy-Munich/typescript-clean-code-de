// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>GRASP: Creator</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// - Use Case "Spiel initialisieren"
// - Bisher:
//   - `World`- und `Location`-Klassen
//   - Attribute und Getter
// - Frage:
//   - Wer erzeugt die `Location`-Instanzen?

// %% [markdown]
//
// ## Kandidaten
//
// <div style="float:left;margin:auto;padding:80px 0;width:25%">
// <ul>
// <li> <code>Player</code></li>
// <li> <code>Game</code></li>
// <li> <code>Pawn</code></li>
// <li> <code>Location</code></li>
// <li> <code>World</code></li>
// <li> Eine andere Klasse?</li>
// </ul>
// </div>
// <img src="img/adv-domain-03-small.png"
//      style="float:right;margin:auto;width:70%"/>

// %% [markdown]
//
// ## Das Creator Pattern (GRASP)
//
// ### Frage
//
// - Wer ist verantwortlich für die Erzeugung eines Objekts?
//
// ### Antwort
//
// Klasse `A` bekommt die Verantwortung, ein Objekt der Klasse `B` zu erzeugen,
// wenn eine oder mehrere der folgenden Bedingungen zutreffen:
//
// - `A` enthält `B` (oder ist Eigentümer von `B`)
// - `A` verwaltet `B` (registriert, zeichnet auf)
// - `A` verwendet `B` intensiv
// - `A` hat die initialisierenden Daten, die `B` benötigt

// %% [markdown]
//
// ### Bemerkung
//
// - Factory ist oft eine Alternative zu Creator

// %% [markdown]
//
// ## Creator
//
// <div style="float:left;margin:auto;padding:80px 0;width:25%">
// <ul>
// <li> <strike><code>Player</code></strike></li>
// <li> <strike><code>Game</code></strike></li>
// <li> <code>Pawn</code></li>
// <li> <code>Location</code></li>
// <li> <b><code>World</code></b></li>
// <li> <strike>Eine andere Klasse?</strike></li>
// </ul>
// </div>
// <img src="img/adv-domain-03-small.png"
//      style="float:right;margin:auto;width:70%"/>

// %%
import { LocationData, loadLocationData } from "./jsonLoader.ts";

// %%
const simpleLocationsData = loadLocationData("simple-locations.json");

// %%
console.log(simpleLocationsData);

// %%
class Location {
    constructor(
        public name: string,
        public description: string
    ) {}

    static fromData(data: LocationData): Location {
        const name = data["name"]?.toString() ?? "<missing name>";
        const description = data["description"]?.toString() ?? "";
        return new Location(name, description);
    }
}

// %%
class World {
    constructor(
        public locations: Map<string, Location>,
        public initialLocationName: string
    ) {}

    static fromLocationData(locationData: LocationData[]): World {
        const locations = new Map(
            locationData
                .map(Location.fromData)
                .map(location => [location.name, location])
        );
        const initialLocationName = locationData[0]["name"] as string;
        return new World(locations, initialLocationName);
    }

    static fromJsonFile(fileName: string): World {
        const locationData = loadLocationData(fileName);
        return World.fromLocationData(locationData);
    }

    toString(): string {
        const locationCount = Object.keys(this.locations).length;
        return `World(Initial location = '${this.initialLocationName}', ${locationCount} locations)`;
    }
}

// %% [markdown]
//
// - Wir können die `World`-Klasse jetzt verwenden.

// %%
let world = World.fromJsonFile("simple-locations.json");

// %%
console.log(world);

// %%
let dungeon = World.fromJsonFile("dungeon-locations.json");

// %%
console.log(dungeon);
