import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type LocationData = {name: string, description: string, connections: {[key: string]: string}};

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

function findFileOrThrow(name: string, dir: string = "."): string {
    const file = findFile(name, dir);
    if (file === "") {
        throw Error(`File ${name} not found`)
    }
    return file;
}

export function loadLocationData(fileName: string): LocationData[] {
    try {
        const json = readFileSync(findFileOrThrow(fileName), 'utf-8');
        return JSON.parse(json);
    } catch (e) {
        console.error((e as Error).message);
        return [];
    }
}
