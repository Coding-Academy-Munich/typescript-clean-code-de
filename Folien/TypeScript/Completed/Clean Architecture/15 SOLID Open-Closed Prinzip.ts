// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>SOLID: Open-Closed Prinzip</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// # Open-Closed Prinzip (SOLID)
//
// Klassen sollen
//
// - Offen für Erweiterung
// - Geschlossen für Modifikation
//
// sein.

// %%
enum MovieKindV0 {
    Regular,
    Children
}

// %%
class MovieV0 {
    constructor(public title: string, public kind: MovieKindV0) {}

    computePrice(): number {
        switch (this.kind) {
            case MovieKindV0.Regular:
                return 4.99;
            case MovieKindV0.Children:
                return 5.99;
            default:
                return 0.0;
        }
    }

    printInfo(): void {
        console.log(`${this.title} costs ${this.computePrice()}`);
    }
}

// %%
const m1 = new MovieV0("Casablanca", MovieKindV0.Regular);
const m2 = new MovieV0("Shrek", MovieKindV0.Children);

// %%
m1.printInfo();
m2.printInfo();

// %% [markdown]
//
// <img src="img/movie_v0.png" alt="MovieV0"
//      style="display:block;margin:auto;width:50%"/>


// %% [markdown]
//
// Was passiert, wenn wir eine neue Filmart hinzufügen wollen?

// %%
enum MovieKind {
    Regular,
    Children,
    NewRelease
}

// %%
class MovieV1 {
    constructor(public title: string, public kind: MovieKind) {}

    computePrice(): number {
        switch (this.kind) {
            case MovieKind.Regular:
                return 4.99;
            case MovieKind.Children:
                return 5.99;
            case MovieKind.NewRelease:
                return 6.99;
            default:
                return 0.0;
        }
    }

    printInfo(): void {
        console.log(`${this.title} costs ${this.computePrice()}`);
    }
}

// %%
const m1 = new MovieV1("Casablanca", MovieKind.Regular);
const m2 = new MovieV1("Shrek", MovieKind.Children);
// const m3 = new MovieV1("Brand New", MovieKind.NewRelease);

// %%
m1.printInfo();
m2.printInfo();
// m3.printInfo();

// %% [markdown]
//
// <img src="img/movie_v1.png" alt="MovieV1"
//      style="display:block;margin:auto;width:50%"/>

// %% [markdown]
//
// ## OCP-Verletzung
//
// - Neue Filmarten erfordern Änderungen an `MovieV1`
// - `MovieV1` ist nicht geschlossen für Modifikation

// %% [markdown]
//
// ## Auflösung (Versuch 1: Vererbung)
//
// - Neue Filmarten werden als neue Klassen implementiert
// - `MovieV2` wird abstrakt
// - `MovieV2` ist geschlossen für Modifikation

// %%
abstract class MovieV2 {
    constructor(public title: string) {}

    abstract computePrice(): number;

    printInfo(): void {
        console.log(`${this.title} costs ${this.computePrice()}`);
    }
}

// %%
class RegularMovie extends MovieV2 {
    constructor(title: string) {
        super(title);
    }

    override computePrice(): number {
        return 4.99;
    }
}

// %%
class ChildrenMovie extends MovieV2 {
    constructor(title: string) {
        super(title);
    }

    override computePrice(): number {
        return 5.99;
    }
}

// %%
class NewReleaseMovie extends MovieV2 {
    constructor(title: string) {
        super(title);
    }

    override computePrice(): number {
        return 6.99;
    }
}
// %%
const m1 = new RegularMovie("Casablanca");
const m2 = new ChildrenMovie("Shrek");
const m3 = new NewReleaseMovie("Brand New");

// %%
m1.printInfo();
m2.printInfo();
m3.printInfo();

// %% [markdown]
//
// <img src="img/movie_v2.png" alt="MovieV0"
//      style="display:block;margin:auto;width:100%"/>

// %% [markdown]
//
// - `MovieV2` ist offen für Erweiterung
// - Neue Filmarten können hinzugefügt werden, ohne die bestehenden Klassen zu
//   ändern
// - Aber: Die Vererbungshierarchie umfasst die ganze Klasse
//   - Nur eine Art von Variabilität
// - Was ist, wenn wir für andere Zwecke eine andere Klassifikation brauchen?
//   - Z.B. DVD, BluRay, Online?
// - Mehrfachvererbung?
// - Produkt von Klassen?
//   - `ChildrenDVD`, `ChildrenBluRay`, `ChildrenOnline`, ...

// %% [markdown]
//
// ## Bessere Auflösung: Strategy Pattern
//
// - Das Strategy-Pattern erlaubt es uns, die Vererbung auf kleinere Teile der
//   Klasse anzuwenden
// - In fast allen Fällen ist das die bessere Lösung!
// - Vererbung ist ein sehr mächtiges Werkzeug
// - Aber je kleiner und lokaler wir unsere Vererbungshierarchien halten, desto
//   besser

// %% [markdown]
//
// ## Workshop: Smart Home Device Control System
//
// In diesem Workshop arbeiten wir mit einem Szenario, das ein Smart Home
// Gerätesteuerungssystem betrifft. Leider verletzt das vorhandene System
// das Open-Closed-Prinzip.

// %% [markdown]
//
// ### Szenario
//
// Wir haben ein Smart-Home-System. Dieses System steuert verschiedene
// Geräte: Lichter, Thermostate, Sicherheitskameras und intelligente Schlösser.
// Jeder Gerätetyp benötigt einen eigenen Steuerungsmechanismus und eigene
// Automatisierungsregeln.
//
// Nun muss das Steuerungssystem des Smart Homes diese Geräte verwalten. Das
// Problem mit dem aktuellen System ist die Verwendung eines Enums zur Bestimmung
// des Gerätetyps und basierend darauf seiner Steuermethode. Dieser Ansatz ist
// nicht skalierbar und verletzt das OCP.

// %%
enum DeviceType {
    Light,
    Thermostat,
    SecurityCamera,
    SmartLock
}

// %%
class DeviceV0 {
    constructor(private type: DeviceType) {}

    control(): string {
        switch (this.type) {
            case DeviceType.Light:
                return "Turning light on/off.";
            case DeviceType.Thermostat:
                return "Adjusting temperature.";
            case DeviceType.SecurityCamera:
                return "Activating motion detection.";
            case DeviceType.SmartLock:
                return "Locking/Unlocking door.";
            default:
                return "Unknown device control!";
        }
    }

    getStatus(): string {
        switch (this.type) {
            case DeviceType.Light:
                return "Light is on/off.";
            case DeviceType.Thermostat:
                return "Current temperature: 22°C.";
            case DeviceType.SecurityCamera:
                return "Camera is active/inactive.";
            case DeviceType.SmartLock:
                return "Door is locked/unlocked.";
            default:
                return "Unknown device status!";
        }
    }
}

// %%
const devicesOriginal: DeviceV0[] = [
    new DeviceV0(DeviceType.Light),
    new DeviceV0(DeviceType.Thermostat),
    new DeviceV0(DeviceType.SecurityCamera)
];

// %%
function manageDevices(devices: DeviceV0[]): void {
    for (const device of devices) {
        console.log(device.control() + " " + device.getStatus());
    }
}

// %%
manageDevices(devicesOriginal);

// %% [markdown]
//
// - Beseitigen Sie das Problem mit der OCP-Verletzung im vorhandenen Code
// - Sie können entweder den vorhandenen Code ändern oder eine neue Lösung von
//   Grund auf neu erstellen

// %%
interface IDevice {
    control(): string;
    getStatus(): string;
}

// %%
class Light implements IDevice {
    control(): string {
        return "Turning light on/off.";
    }

    getStatus(): string {
        return "Light is on/off.";
    }
}

// %%
class Thermostat implements IDevice {
    control(): string {
        return "Adjusting temperature.";
    }

    getStatus(): string {
        return "Current temperature: 22°C.";
    }
}

// %%
class SecurityCamera implements IDevice {
    control(): string {
        return "Activating motion detection.";
    }

    getStatus(): string {
        return "Camera is active/inactive.";
    }
}

// %%
class SmartLock implements IDevice {
    control(): string {
        return "Locking/Unlocking door.";
    }

    getStatus(): string {
        return "Door is locked/unlocked.";
    }
}

// %%
const devicesRefactored: IDevice[] = [
    new Light(),
    new Thermostat(),
    new SecurityCamera()
];

// %%
function manageDevices(devices: IDevice[]): void {
    for (const device of devices) {
        console.log(device.control() + " " + device.getStatus());
    }
}

// %%
manageDevices(devicesRefactored);
