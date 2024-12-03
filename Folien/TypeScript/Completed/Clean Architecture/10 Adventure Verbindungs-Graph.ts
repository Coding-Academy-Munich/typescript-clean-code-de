// -*- coding: utf-8 -*-
// %% [markdown]
// <!--
// -->
//
// <div style="text-align:center; font-size:200%;">
//   <b>Adventure: Verbindungs-Graph</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Implementierung der Verbindungen
//

// %%
import { LocationData, loadLocationData } from "./jsonLoader.ts";

// %%
const simpleLocationsData = loadLocationData("simple-locations.json");

// %%
class Location {
    constructor(
        public name: string,
        public description: string,
        public connectedLocations: Map<string, Location> = new Map<string, Location>(),
    ) { }

    static fromData(data: LocationData): Location {
        const name = data["name"]?.toString() ?? "<missing name>";
        const description = data["description"]?.toString() ?? "";
        return new Location(name, description);
    }

    getConnectedLocation(name: string): Location {
        let loc = this.connectedLocations.get(name);
        if (!loc) {
            throw new Error(`Exit '${name}' does not exist.`);
        }
        return loc;
    }
}

// %%
class World {
    constructor(
        public locations: Map<string, Location>,
        public initialLocationName: string
    ) { }

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

    getLocationByName(name: string): Location | undefined {
        return this.locations.get(name);
    }

    toString(): string {
        const locationCount = Object.keys(this.locations).length;
        return `World(Initial location = '${this.initialLocationName}', ${locationCount} locations)`;
    }
}

// %%
class World {
    constructor(
        public locations: Map<string, Location>,
        public initialLocationName: string
    ) { }

    static fromLocationData(locationData: LocationData[]): World {
        const locations = new Map(
            locationData
                .map(Location.fromData)
                .map(location => [location.name, location])
        );
        this.updateConnectedLocations(locations, locationData);
        const initialLocationName = locationData[0]["name"] as string;
        return new World(locations, initialLocationName);
    }

    static fromJsonFile(fileName: string): World {
        const locationData = loadLocationData(fileName);
        return World.fromLocationData(locationData);
    }

    getLocationByName(name: string): Location | undefined {
        return this.locations.get(name);
    }

    private static updateConnectedLocations(
        locations: Map<string, Location>,
        locationData: LocationData[],
    ) {
        for (let ld of locationData) {
            let location = locations.get(ld.name);
            if (!location) {
                throw new Error(`Location ${ld.name} not found`);
            }
            for (let [direction, destination] of Object.entries(ld["connections"])) {
                let destLoc = locations.get(destination);
                if (!destLoc) {
                    throw new Error(`Destination location ${destination} not found`);
                }
                location.connectedLocations.set(direction, destLoc);
            }
        }
    }

    toString(): string {
        const locationCount = Object.keys(this.locations).length;
        return `World(Initial location = '${this.initialLocationName}', ${locationCount} locations)`;
    }
}

// %%
const world = World.fromJsonFile("dungeon-locations.json");

// %%
console.log(world);

// %%
console.log(world.getLocationByName("Vestibule").getConnectedLocation("north"));

// %% [markdown]
//
// <img src="img/adventure-v3b-overview.png"
//      style="display:block;margin:auto;width:30%"/>

// %% [markdown]
//
// - Wie ist diese Implementierung zu bewerten?
//   - Was ist gut?
//   - Was sollten wir noch verbessern?

// %% [markdown]
//
// - Generell ist die Struktur gut
// - Ein potentielles Problem ist, dass wir sehr viel Arbeit in die
//   `World`-Klasse verlagern
// - Das ist typisch, wenn wir "Information Expert" anwenden
// - Wir brauchen einen "Gegenspieler" für dieses Pattern
