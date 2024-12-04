// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>GRASP: Informations-Experte</b>
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
//   - `World` und `Location` Klassen
//   - `World` erzeugt alle `Location` Objekte
// - Nächster Schritt:
//   - Speichern von Information über die Verbindung zwischen den `Location`
//     Objekten
//   - Hilfreich dazu: Finden von Locations anhand ihres Namens
// - Frage:
//   - Wer findet `Location` Objekte anhand ihres Namens?

// %% [markdown]
//
// ## Kandidaten

// %% [markdown]
// <div style="float:left;margin:auto;padding:80px 0;width:25%">
// <ul>
// <li> <code>Player</code></li>
// <li> <code>Game</code></li>
// <li> <code>Pawn</code></li>
// <li> <code>Location</code></li>
// <li> <code>World</code></li>
// </ul>
// </div>
// <img src="img/adv-domain-03-small.png"
//      style="float:right;margin:auto;width:70%"/>

// %% [markdown]
//
// ## Informations-Experte (engl. "Information Expert", GRASP)
//
// ### Frage
//
// An welche Klasse sollen wir eine Verantwortung delegieren?
//
// ### Antwort
//
// An die Klasse, die die meisten Informationen hat, die für die Erfüllung der
// Verantwortung notwendig sind.
// %% [markdown]
//
// ## Wer ist der Informationsexperte?

// %% [markdown]
// <div style="float:left;margin:auto;padding:80px 0;width:25%">
// <ul>
// <li> <strike><code>Player</code></strike></li>
// <li> <strike><code>Game</code></strike></li>
// <li> <strike><code>Pawn</code></strike></li>
// <li> <strike><code>Location</code></strike></li>
// <li> <b><code>World</code></b></li>
// </ul>
// </div>
// <img src="img/adv-domain-03-small.png"
//      style="float:right;margin:auto;width:70%"/>

// %%
import { LocationData, loadLocationData } from "./jsonLoader.ts";

// %%
const simpleLocationsData = loadLocationData("simple-locations.json");

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

    getLocationByName(name: string): Location {
        return this.locations.get(name);
    }

    toString(): string {
        const locationCount = Object.keys(this.locations).length;
        return `World(Initial location = '${this.initialLocationName}', ${locationCount} locations)`;
    }
}

// %%
const world = World.fromJsonFile("simple-locations.json");

// %%
console.log(world);

// %%
console.log(world.getLocationByName("Room 1"));

// %%
console.log(world.getLocationByName("Room 2"));

// %% [markdown]
//
// - `Code\Completed\GraspAdventure\AdventureV2` entspricht
//   unserem aktuellen Stand
