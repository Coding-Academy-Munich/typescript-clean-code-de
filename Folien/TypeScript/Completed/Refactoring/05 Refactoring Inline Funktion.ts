// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Refactoring: Inline Funktion</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ### Inline Function
//
// - Anwendung
//   - Wenn eine Funktion nicht mehr tut als ihr Rumpf und der Name nicht mehr
//     aussagt als der Rumpf
//   - Wenn wir eine schlecht strukturierte Hilfsfunktion haben
// - Invers zu *Extrahiere Funktion*

// %%
class OrderLine {
    constructor(public product: string, public quantity: number, public price: number) {}
}

// %%
function makeOrderLines(): OrderLine[] {
    const orderLines: OrderLine[] = [];
    orderLines.push(new OrderLine("Apple", 2, 0.5));
    orderLines.push(new OrderLine("Banana", 3, 0.3));
    orderLines.push(new OrderLine("Orange", 1, 0.8));
    return orderLines;
}

// %%
class OrderLineProcessor {
    static orderLinePrice(orderLine: OrderLine): number {
        return orderLine.price;
    }

    static orderLineQuantity(orderLine: OrderLine): number {
        return orderLine.quantity;
    }

    static computeTotal(orderLines: OrderLine[]): number {
        let total = 0.0;
        for (const orderLine of orderLines) {
            total += this.orderLineQuantity(orderLine) * this.orderLinePrice(orderLine);
        }
        return total;
    }
}

// %%
console.log(OrderLineProcessor.computeTotal(makeOrderLines()));

// %%
class OrderLineProcessor {
    static computeTotal(orderLines: OrderLine[]): number {
        let total = 0.0;
        for (const orderLine of orderLines) {
            total += orderLine.quantity * orderLine.price; // <-- inline functions
        }
        return total;
    }
}

// %%
console.log(OrderLineProcessor.computeTotal(makeOrderLines()));

// %% [markdown]
//
// #### Motivation
//
// - Manchmal ist eine Funktion nicht leichter zu verstehen als ihr Rumpf
// - Manchmal sind die von einer Funktion verwendeten Hilfsfunktionen nicht gut
//   strukturiert
// - Generell: Potentiell anwendbar, wenn man aufgrund zu vieler Indirektionen
//   den Überblick verliert

// %% [markdown]
//
// #### Mechanik
//
// - Überprüfe, dass die Funktion nicht virtuell ist
//   - Eine virtuelle Funktion, die von Unterklassen überschrieben wird, können
//     wir nicht entfernen, ohne die Semantik des Programms zu ändern
// - Finde alle Aufrufe der Funktion
// - Ersetze jeden Aufruf durch den Rumpf der Funktion
// - Test nach jedem Schritt!
// - Entferne die Funktionsdefinition
// - Brich ab, falls Schwierigkeiten wegen Rekursion, mehrerer
//   `return`-Anweisungen, etc. auftreten

// %% [markdown]
//
// ## Workshop: Inline Function
//
// In der folgenden Funktion wurden Hilfsfunktionen verwendet, die die Berechnung
// nicht übersichtlicher gestalten.
//
// Entfernen Sie diese Hilfsfunktionen mit dem *Inline Function*-Refactoring.

// %%
function add(a: number, b: number): number {
    return a + b;
}

// %%
function subtract(a: number, b: number): number {
    return a - b;
}


// %%
function multiply(a: number, b: number): number {
    return a * b;
}

// %%
function calculate(x: number, y: number, z: number): number {
    let result = this.add(x, y);
    result = this.multiply(result, 2);
    result = this.subtract(result, z);
    return result;
}

// %%
console.log(this.calculate(5, 3, 4));

// %%
function calculate(x: number, y: number, z: number): number {
    let result = x + y;
    result = result * 2;
    result = result - z;
    return result;
}

// %%
console.log(calculate(5, 3, 4));

// %%
function calculate(x: number, y: number, z: number): void {
    console.log((x + y) * 2 - z);
}

// %%
calculate(5, 3, 4);
