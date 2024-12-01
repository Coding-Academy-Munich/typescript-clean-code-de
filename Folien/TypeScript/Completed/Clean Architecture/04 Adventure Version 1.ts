// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Adventure: Version 1</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// Wie fangen wir an?

// %% [markdown]
//
// ## Niedrige Repräsentationslücke (Low Representational Gap)
//
// - Idee: Konzepte aus der Domäne in Code übertragen
// - Implementieren Sie ein Szenario aus einem Use Case
// - Nehmen Sie die Domänen-Konzepte als Kandidaten für die ersten Klassen her

// %% [markdown]
//
// - Use Case: "Spiel initialisieren"
// - Haupterfolgsszenario ohne Laden eines Spiels

// %% [markdown]
//
// ## Domänenmodell
//
// Hier ist noch einmal der relevante Teil des Domänenmodells:

// %% [markdown]
// <img src="img/adv-domain-03-small.png"
//   style="display:block;margin:auto;width:80%"/>

// %% [markdown]
//
// ## Statisches Designmodell

// %% [markdown]
// <img src="img/adv-world-cd-01.png"
//      style="display:block;margin:auto;width:50%"/>

// %% [markdown]
//
// ## Implementierung
//
// - Implementierung: `Code/Completed/GraspAdventure/AdventureV1`
// - Starter-Kit: `Code/StarterKits/GraspAdventureSk/AdventureSk`

// %%
class Location {
    constructor(readonly name: string, readonly description: string) {}
}

// %%
const location = new Location("Here", "Where I am");

// %% [markdown]
//
// ## Konstruktion von Location Instanzen
//
// - [Einfache Orte](./simple-locations.json)
// - [Dungeon](./dungeon-locations.json)

// %%
import { readdirSync, existsSync } from "node:fs";
import { join, resolve, basename } from "node:path";

// %%
function findFile(name: string, dir: string = "."): string {
    const files = readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        if (file.isDirectory()) {
            const result = findFile(name, join(dir, file.name));
            if (result) return result;
        } else if (file.name === name) {
            return join(dir, file.name);
        }
    }

    return "";
}

// %%
function findFileOrThrow(name: string, dir: string = "."): string {
    const file = findFile(name, dir);
    if (file === "") {
        throw Error(`File ${name} not found`)
    }
    return file;
}

// %%
const simpleLocationsPath = findFileOrThrow("simple-locations.json");

// %%
console.log(basename(simpleLocationsPath));

// %%
console.log(resolve(simpleLocationsPath));

// %%
import { readFileSync } from "node:fs";

// %%
function loadLocationData(fileName: string): Record<string, any>[] {
    try {
        const json = readFileSync(findFileOrThrow(fileName), 'utf-8');
        return JSON.parse(json);
    } catch (e) {
        console.error((e as Error).message);
        return [];
    }
}

// %%
const simpleLocationsData = loadLocationData("simple-locations.json");

// %%
for (const room of simpleLocationsData) {
    console.log(Object.entries(room).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(", "));
}

// %% [markdown]
//
// ### Erzeugen von Location Instanzen aus JSON Daten
//
// - Wir können eine statische Methode in der `Location` Klasse implementieren, die eine `Location` Instanz aus einer Map erzeugt
// - Eine solche Methode nennt man eine Fabrikmethode oder Factory-Methode oder genauer eine statische Factory-Methode
// - Fügen wir also eine statische Methode `fromData()` zur `Location` Klasse hinzu

// %%
class Location {
    constructor(readonly name: string, readonly description: string) {}

    static fromData(data: Record<string, any>): Location {
        const name = data.name?.toString() || "<missing name>";
        const description = (data.description && data.description.toString()) || "";
        return new Location(name, description);
    }
}

// %%
console.log(Location.fromData(simpleLocationsData[0]));

// %%
const locations: Location[] = simpleLocationsData.map(Location.fromData);

// %%
console.log(locations);
// %%
const locationMap = new Map<string, Record<string, object>>(
    simpleLocationsData
        .map(location => [location.name, location])
);

// %%
console.log(locationMap);

// %%
function loadData(fileName: string): Map<string, object> {
    return new Map<string, Location>(
        loadLocations(fileName)
            .map(location => [location.name, location])
    )
}

// %% [markdown]
//
// ## Implementierung der World Klasse
//
// - Beliebige Anzahl von `Location`-Instanzen
// - Zugriff auf `Location`-Instanzen über Namen
// - Speicherung des initialen Ortsnamens

// %%
class World {
    constructor(
        readonly locations: Map<string, Location>,
        readonly initialLocationName: string
    ) {}

    toString(): string {
        return `World: initial locationName = '${this.initialLocationName}', #locations = ${this.locations.size}`;
    }
}

// %%
const myWorld = new World(locationMap, "Room 1");

// %%
console.log(myWorld);
