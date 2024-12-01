// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Was sind gute Tests?</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// <img src="img/velocity-tests-03.png"
//      alt="Velocity vs. Tests 3"
//      style="width: 75%; margin-left: auto; margin-right: auto;"/>

// %% [markdown]
//
// ## Welche Eigenschaften sollte ein Test haben?
//
// <ul>
// <li class="fragment">Zeigt viele Fehler/Regressionen im Code auf</li>
// <li class="fragment">Gibt schnelle Rückmeldung</li>
// <li class="fragment">Ist deterministisch</li>
// <li class="fragment">Ist leicht zu warten und verstehen</li>
// <li class="fragment"><b>Unempfindlich gegenüber Refactorings</b></li>
// </ul>
//
// <p class="fragment">
//   Leider stehen diese Eigenschaften oft im Konflikt zueinander!
// </p>

// %% [markdown]
//
// ## Aufzeigen von Fehlern/Regressionen
//
// ### Einflüsse
//
// <ul>
//   <li class="fragment">Menge des abgedeckten Codes</li>
//   <li class="fragment">Komplexität des abgedeckten Codes</li>
//   <li class="fragment">Interaktion mit externen Systemen</li>
//   <li class="fragment">Signifikanz des abgedeckten Codes für die Domäne/das
//   System</li>
// </ul>

// %%
class Item {
    private price: number;

    constructor(public name: string, public price: number) {
        this.name = name;
        this.price = (price < 0) ? -price : price;
    }

    get name(): string {
        return this.name;
    }

    get price(): number {
        return this.price;
    }

    set price(value: number) {
        this.price = (value < 0) ? -value : value;
    }

    toString(): string {
        return `Item(${this.name}, ${this.price.toFixed(2)})`;
    }
}
// %%
class Order {
    private items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    get items() {
        return this.items;
    }

    get total() {
        let total = 0;
        for (const item of this.items) {
            total += item.price;
        }
        return total;
    }

    toString() {
        const itemsString = this.items.map(item => item.toString()).join(", ");
        return `Order([${itemsString}]), total = ${this.total.toFixed(2)}`;
    }
}

// %%
function check(condition: boolean, message: string): void {
    if (!condition) {
        console.error(message);
    } else {
        console.log("Success.");
    }
}

// %%
function testItemName() {
    const unit = new Item("Apple", 1.0);

    check(unit.name === "Apple", "Name does not match");
}


// %%
testItemName();

// %%
function testOrderTotal() {
    const unit = new Order([
        new Item("Apple", 1.0),
        new Item("Banana", -2.0)
    ]);

    const total = unit.total;

    check(total === 3.0, "Total is not correct");
}

// %%
testOrderTotal();

// %%
function testOrderOutput() {
    const unit = new Order([
        new Item("Apple", 1.0),
        new Item("Banana", -2.0)
    ]);

    const output = unit.toString();

    check(output === "Order([Item(Apple, 1.00), Item(Banana, 2.00)]), total = 3.00", "Output is not correct");
}

// %%
testOrderOutput();

// %% [markdown]
//
// ## Schnelle Rückmeldung
//
// ### Einflüsse
//
// - Menge des abgedeckten Codes
// - Komplexität/Anzahl Iterationen des abgedeckten Codes
// - Interaktion mit externen Systemen

// %% [markdown]
//
// ## Deterministisch
//
// <ul>
//   <li class="fragment">Gleicher Code führt immer zum gleichen Ergebnis</li>
//   <li class="fragment">Gründe für Nichtdeterminismus
//     <ul>
//       <li class="fragment">Zufallszahlen</li>
//       <li class="fragment">Zeit/Datum</li>
//       <li class="fragment">Interaktion mit externen Systemen</li>
//       <li class="fragment">Nicht initialisierte Variablen</li>
//       <li class="fragment">Kommunikation zwischen Tests</li>
//     </ul>
//   </li>
//   <li class="fragment">
//      Tests, die falsche Warnungen erzeugen sind nicht
//      hilfreich sondern schädlich!
//   </li>
// <ul>

// %%
function testRandomBad() {
    const random = Math.random();
    const roll = Math.floor(random * 2) + 1;

    check(roll === 2, "Roll is not 2");
}

// %%
testRandomBad();

// %%
class SeededRandom {
    private state: number;

    constructor(seed: number) {
        this.state = seed;
    }

    next(): number {
        this.state = (this.state * 9301 + 49297) % 233280;
        return this.state / 233280;
    }
}

// %%
const rng1 = new SeededRandom(42);
const rng2 = new SeededRandom(42);

// %%
for (let i = 0; i < 10; i++) {
    const x1 = rng1.next();
    const x2 = rng2.next();
    console.log(`${x1.toFixed(3)} ${x1 === x2 ? '==' : '!='} ${x2.toFixed(3)}`);
}

// %%
function testRandomBetter() {
    const rng = new SeededRandom(42);
    const roll = Math.floor(rng.next() * 2) + 1;

    check(roll === 2, "Roll is not 2");
}

// %%
testRandomBetter();

// %%
function testDateBad() {
    const now = new Date();

    check(now.getFullYear() === 2024, "Year is not 2024");
    check(now.getSeconds() % 2 === 0, "Second is not even");
}

// %%
testDateBad();

// %%
function testDateBetter() {
    const fixedDate = new Date(2024, 0, 1, 0, 0, 0); // Note: Months are 0-indexed in JavaScript

    check(fixedDate.getFullYear() === 2024, "Year is not 2024");
    check(fixedDate.getSeconds() % 2 === 0, "Second is not even");
}

// %%
testDateBetter();

// %% [markdown]
//
// ## Leicht zu warten
//
// <ul>
//   <li>Einfache, standardisierte Struktur<br>&nbsp;<br>
//     <table style="display:inline;margin:20px 20px;">
//     <tr><td style="text-align:left;width:60px;padding-left:15px;">Arrange</td>
//         <td style="text-align:left;width:60px;padding-left:15px;border-left:1px solid black;">Given</td>
//         <td style="text-align:left;width:600px;padding-left:15px;border-left:1px solid black;">
//           Bereite das Test-Environment vor</td></tr>
//     <tr><td style="text-align:left;padding-left:15px;">Act</td>
//         <td style="text-align:left;width:60px;padding-left:15px;border-left:1px solid black;">
//            When</td>
//         <td style="text-align:left;width:600px;padding-left:15px;border-left:1px solid black;">
//            Führe die getestete Aktion aus (falls vorhanden)</td></tr>
//     <tr><td style="text-align:left;padding-left:15px;">Assert</td>
//         <td style="text-align:left;width:60px;padding-left:15px;border-left:1px solid black;">
//            Then</td>
//         <td style="text-align:left;width:600px;padding-left:15px;border-left:1px solid black;">
//            Überprüfe die Ergebnisse</td></tr>
//     </table>
//     <br>&nbsp;<br>
//   </li>
//   <li>Wenig Code
//     <ul>
//       <li>Wenig Boilerplate</li>
//       <li>Factories, etc. für Tests</li>
//     </ul>
//   </li>
// </ul>

// %% [markdown]
//
// ## Unempfindlich gegenüber Refactorings
//
// - Möglichst wenige falsche Positive!
// - Typischerweise vorhanden oder nicht, wenig Zwischenstufen
//
// ### Einflüsse
//
// - Bezug zu Domäne/System
// - Zugriff auf interne Strukturen

// %%
class VeryPrivate {
    private secret: number = 42;
}

// %%
function testVeryPrivate() {
    const unit = new VeryPrivate();

    const secretValue = (unit as any).secret;

    check(secretValue === 42, "Secret is not 42");
}

// %%
testVeryPrivate();

// %% [markdown]
//
// Die folgenden Einflüsse stehen im Konflikt zueinander:
//
// - Erkennen von Fehlern/Regressionen
// - Schnelle Rückmeldung
// - Unempfindlich gegenüber Refactorings
//
// Die Qualität eines Tests hängt vom *Produkt* dieser Faktoren ab!

// %% [markdown]
//
// ## Wie finden wir den Trade-Off?
//
// - Unempfindlich gegenüber Refactorings kann *nie* geopfert werden
// - Wir müssen also einen Kompromiss finden zwischen
//   - Erkennen von Fehlern/Regressionen
//   - Schnelle Rückmeldung
//
// ### Typischerweise
//
// - Schnelles Feedback für die meisten Tests (Unit-Tests)
// - Gründliche Fehlererkennung für wenige Tests (Integrationstests)
