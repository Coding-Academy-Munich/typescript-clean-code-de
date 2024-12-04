// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>SOLID: OCP (Teil 2)</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Wiederholung: OCP-Verletzung
//
// <img src="img/movie_v0.png" alt="MovieV0"
//      style="display:block;margin:auto;width:50%"/>

// %% [markdown]
//
// ## Lösungsversuch 1: Vererbung
//
// <img src="img/movie_v2.png" alt="MovieV2"
//      style="display:block;margin:auto;width:70%"/>

// %% [markdown]
//
// - OCP ist erfüllt
// - Großer Scope der Vererbung
//   - Preisberechnung ist das wichtigste an Filmen?
// - Nur eindimensionale Klassifikation
// - Keine Möglichkeit, Preisschema zu wechseln

// %% [markdown]
//
// ## Lösungsversuch 2: Strategie-Muster
//
// <img src="img/movie_v3.png" alt="MovieV3"
//      style="display:block;margin:auto;width:80%"/>

// %% [markdown]
//
// - OCP ist erfüllt
// - Vererbung ist auf die Preisberechnung beschränkt
// - Mehrdimensionale Klassifikation ist einfach
// - Preisschema kann zur Laufzeit gewechselt werden

// %% [markdown]
//
// ## Implementierung

// %%
interface IMovie
{
    price: number;
    printInfo(): void;
}

// %%
interface IPricingStrategy {
    computePrice(movie: IMovie): number;
}

// %%
class RegularPricingStrategy implements IPricingStrategy {
    computePrice(movie: IMovie): number {
        return 4.99;
    }
}

// %%
class ChildrenPricingStrategy implements IPricingStrategy {
    computePrice(movie: IMovie): number {
        return 5.99;
    }
}

// %%
class Movie implements IMovie {
    constructor(public title: string, public pricingStrategy: IPricingStrategy) {}

    get price(): number {
        return this.pricingStrategy.computePrice(this);
    }

    printInfo(): void {
        console.log(`${this.title} costs ${this.price}`);
    }
}

// %%
const movies: IMovie[] = [
    new Movie("Casablanca", new RegularPricingStrategy()),
    new Movie("Shrek", new ChildrenPricingStrategy()),
];

// %%
movies.forEach(m => m.printInfo());

// %%
class NewReleasePricingStrategy implements IPricingStrategy {
    computePrice(movie: IMovie): number {
        return 6.99;
    }
}

// %%
const godfather = new Movie("The Godfather", new NewReleasePricingStrategy());

// %%
movies.push(godfather);
console.log(movies);

// %%
movies.forEach(m => m.printInfo());

// %%
godfather.pricingStrategy = new RegularPricingStrategy();

movies.forEach(m => m.printInfo());

// %% [markdown]
//
// ## Workshop: Berechnung von ÖPNV-Fahrpreisen
//
// In einer modernen Stadt stehen verschiedene öffentliche Verkehrsmittel zur
// Verfügung – Busse, U-Bahnen, Züge, Boote, etc. Jedes dieser Verkehrsmittel
// hat seine eigene Methode zur Fahrpreisberechnung. Zum Beispiel können
// Bustarife auf Pauschalpreisen basieren, U-Bahnen können auf
// Entfernungstarifen basieren und Boote können Premiumtarife für
// landschaftlich reizvolle Strecken haben.

// %% [markdown]
//
// Sie haben ein rudimentäres Fahrpreisberechnungssystem, das den Fahrpreis
// basierend auf dem Verkehrsmittel bestimmt. Leider verstößt dieses System
// gegen das OCP, da es ohne Modifikation nicht für die Erweiterung geöffnet
// ist. Jedes Mal, wenn ein neues Verkehrsmittel hinzugefügt werden muss, muss
// das Kernsystem geändert werden.
//
// Ihre Aufgabe ist es, das System so zu refaktorisieren, dass es dem OCP
// entspricht. Genauer gesagt, werden Sie die `switch`-Anweisung aus der
// Fahrpreisberechnungslogik entfernen. Das Ziel ist es, das System leicht
// erweiterbar zu machen, so dass neue Verkehrsmittel hinzugefügt werden können,
// ohne den vorhandenen Code zu ändern.

// %%
enum TransportType {
    Bus,
    Subway,
    Train,
    Boat
}

// %%
class Transport
{
    constructor(private type: TransportType) {}

    calculateFare(distance: number): number {
        switch (this.type) {
            case TransportType.Bus:
                return 2.50; // flat rate
            case TransportType.Subway:
                return 1.50 + (distance * 0.20); // base rate + per km
            case TransportType.Train:
                return 5.00 + (distance * 0.15); // base rate + per km
            case TransportType.Boat:
                return 10.00; // premium rate
            default:
                return 0.0;
    }
    }
}

// %%
const bus = new Transport(TransportType.Bus);
console.log(`Bus fare: ${bus.calculateFare(10)}`);

// %%
const subway = new Transport(TransportType.Subway);
console.log(`Subway fare: ${subway.calculateFare(10)}`);

// %%
const train = new Transport(TransportType.Train);
console.log(`Train fare: ${train.calculateFare(10)}`);

// %%
const boat = new Transport(TransportType.Boat);
console.log(`Boat fare: ${boat.calculateFare(10)}`);

// %%
interface IFareCalculationStrategy {
    calculateFare(distance: number): number;
}

// %%
class BusFare implements IFareCalculationStrategy {
    calculateFare(distance: number): number {
        return 2.50; // flat rate
    }
}

// %%
class SubwayFare implements IFareCalculationStrategy {
    calculateFare(distance: number): number {
        return 1.50 + (distance * 0.20); // base rate + per km
    }
}

// %%
class TrainFare implements IFareCalculationStrategy {
    calculateFare(distance: number): number {
        return 5.00 + (distance * 0.15); // base rate + per km
    }
}

// %%
class BoatFare implements IFareCalculationStrategy {
    calculateFare(distance: number): number {
        return 10.00; // premium rate
    }
}

// %%
class Transport {
    private fareStrategy: IFareCalculationStrategy;

    constructor(fareStrategy: IFareCalculationStrategy) {
        this.fareStrategy = fareStrategy;
    }

    calculateFare(distance: number): number {
        return this.fareStrategy.calculateFare(distance);
    }
}

// %%
const bus = new Transport(new BusFare());
console.log(`Bus fare: ${bus.calculateFare(10)}`);

// %%
const subway = new Transport(new SubwayFare());
console.log(`Subway fare: ${subway.calculateFare(10)}`);

// %%
const train = new Transport(new TrainFare());
console.log(`Train fare: ${train.calculateFare(10)}`);

// %%
const boat = new Transport(new BoatFare());
console.log(`Boat fare: ${boat.calculateFare(10)}`);

// %% [markdown]
//
// ## Extra-Workshop: Smart Home Device Control System mit Strategy
//
// In einem früheren Workshop haben wir ein System zur Kontrolle von Smart Home
// Devices implementiert.
//
// Lösen Sie das OCP-Problem für dieses System mit dem Strategy-Muster.

// %%
interface IDeviceStrategy {
    control(): void;
    getStatus(): void;
}

// %%
class LightStrategy implements IDeviceStrategy {
    control(): void {
        console.log("Light control");
    }

    getStatus(): void {
        console.log("Light status");
    }
}

// %%
class ThermostatStrategy implements IDeviceStrategy {
    control(): void {
        console.log("Thermostat control");
    }

    getStatus(): void {
        console.log("Thermostat status");
    }
}

// %%
class SecurityCameraStrategy implements IDeviceStrategy {
    control(): void {
        console.log("Security camera control");
    }

    getStatus(): void {
        console.log("Security camera status");
    }
}

// %%
class SmartLockStrategy implements IDeviceStrategy {
    control(): void {
        console.log("Smart lock control");
    }

    getStatus(): void {
        console.log("Smart lock status");
    }
}

// %%
class SmartHomeDevice {
    private strategy: IDeviceStrategy;

    constructor(strategy: IDeviceStrategy) {
        this.strategy = strategy;
    }

    public control(): void {
        this.strategy.control();
    }

    public getStatus(): void {
        this.strategy.getStatus();
    }
}

// %%
const devices: SmartHomeDevice[] = [];

// %%
devices.push(new SmartHomeDevice(new LightStrategy()));
devices.push(new SmartHomeDevice(new ThermostatStrategy()));
devices.push(new SmartHomeDevice(new SecurityCameraStrategy()));
devices.push(new SmartHomeDevice(new SmartLockStrategy()));
console.log(devices);

// %%
devices.forEach(device => {
    device.control();
    device.getStatus();
});
