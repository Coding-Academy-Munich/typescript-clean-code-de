// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Refactoring: Extrahiere Funktion</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ### Extrahiere Funktion
//
// - Anwendung:
//   - Funktion ist zu groß
//   - Funktion ist zu komplex
//   - Funktion ist schwer zu verstehen
//   - Funktion hat zu viele Aufgaben
// - Invers zu *Inline Function*

// %%
class OrderLine {
    constructor(public product: string, public quantity: number, public price: number) { }
}

// %%
function makeOrderLines(): OrderLine[] {
    const orderLines: OrderLine[] = [];
    orderLines.push(new OrderLine("Apple", 2, 0.5));
    orderLines.push(new OrderLine("Banana", 3, 0.3));
    orderLines.push(new OrderLine("Orange", 1, 0.8));
    return orderLines;
}

// %% [markdown]
//
// ## Beispiel

// %%
class ReceiptPrinter {
    static printReceipt(orderLines: OrderLine[]): void {
        // Print order lines
        for (const orderLine of orderLines) {
            console.log(`${orderLine.product.padEnd(12)} ${orderLine.quantity.toString().padStart(4)} `
                + `x ${orderLine.price.toFixed(2).padStart(6)}€`);
        }
        // Compute total
        let total = 0.0;
        for (const orderLine of orderLines) {
            total += orderLine.quantity * orderLine.price;
        }
        // Print total
        console.log(`Total: ${total.toFixed(2)}€`);
    }
}

// %%
ReceiptPrinter.printReceipt(makeOrderLines());

// %%
class ReceiptPrinter {
    static printReceipt(orderLines: OrderLine[]): void {
        for (const orderLine of orderLines) {
            console.log(`${orderLine.product.padEnd(12)} ${orderLine.quantity.toString().padStart(4)} x ${orderLine.price.toFixed(2).padStart(6)}€`);
        }
        const total = ReceiptPrinter.computeTotal(orderLines); // <-- call new function
        console.log(`Total: ${total.toFixed(2)}€`);
    }

    private static computeTotal(orderLines: OrderLine[]): number {
        let total = 0.0;
        for (const orderLine of orderLines) {
            total += orderLine.quantity * orderLine.price;
        }
        return total;
    }
}

// %%
ReceiptPrinter.printReceipt(makeOrderLines());

// %% [markdown]
//
// #### Motivation
//
// - Jedes Code-Fragment, das man nicht unmittelbar versteht, sollte in eine
//   Funktion extrahiert werden
// - Name der Funktion spiegelt wieder, **was** die Intention des Codes ist
// - Das kann zu Funktionen führen, die nur eine Zeile Code enthalten
// - Es ist dabei besonders wichtig, dass die Funktionen **gute** Namen haben
// - Kommentare in Funktionen, die sagen, was der nächste Code-Block macht,
//   sind ein Hinweis auf eine mögliche Extraktion

// %% [markdown]
//
// #### Mechanik
//
// - Erzeuge eine neue Funktion
//   - Benenne sie nach der Intention des Codes
// - Kopiere den extrahierten Code in die neue Funktion
// - Übergebe alle Variablen, die die Funktion benötigt, als Parameter
//   - Wenn vorher deklarierte Variablen nur in der neuen Funktion verwendet
//     werden, können sie auch als lokale Variablen in der neuen Funktion
//     deklariert werden
// - Breche die Extraktion ab, falls die Funktion zu viele Parameter bekommt
//   - Wende stattdessen andere Refactorings an, die die Extraktion einfacher
//     machen (Split Variables, Replace Temp with Query, ...)

// %% [markdown]
//
// ### Beispiel für fehlgeschlagene Extraktion
//
// - Siehe `Code/Completed/Invoice/V2` für ein Beispiel einer Extraktion,
//   die abgebrochen wird
//   - IntelliJ kommt beim Refactoring dieser Funktion in eine Endlosschleife
//     und erzeugt ungültigen Code, wenn man sie abbricht
// - Siehe `Code/Completed/Invoice/V3` für eine erfolgreiche
//   Extraktion (nach etwas Refactoring)

// %% [markdown]
//
// ## Workshop: Extrahiere Funktion
//
// - Wenden Sie das "Extrahiere Funktion"-Refactoring auf die Methode `processUserData`
//   an:

// %%
class User {
    constructor(public name: string, public age: number) {}
}

// %%
class UserDataProcessor {
    static processUserData(userData: string): void {
        // Convert string data to User objects
        const userStrings = userData.split(';');
        const users: User[] = [];
        for(const userString of userStrings) {
            const parts = userString.split(',');
            users.push(new User(parts[0], parseInt(parts[1])));
        }

        // Calculate average age
        const totalAge = users.reduce((sum, user) => sum + user.age, 0);
        const averageAge = totalAge / users.length;
    
        // Print report
        console.log("User Report:");
        for(const user of users) {
            console.log(`${user.name} is ${user.age} years old`);
        }
            console.log(`Average age: ${averageAge.toFixed(1)} years`);
    }

    static run(): void {
        const userData = "Alice,30;Bob,25;Charlie,35";
        UserDataProcessor.processUserData(userData);
    }
}

// %%
UserDataProcessor.run();

// %%
class UserDataProcessor {
    static processUserData(userData: string): void {
        const users = UserDataProcessor.parseUserData(userData);
        const averageAge = UserDataProcessor.calculateAverageAge(users);
        UserDataProcessor.printReport(users, averageAge);
    }

    private static parseUserData(userData: string): User[] {
        const userStrings = userData.split(';');
        const users: User[] = [];
        for (const userString of userStrings) {
            const parts = userString.split(',');
            users.push(new User(parts[0], parseInt(parts[1])));
        }
        return users;
    }

    private static calculateAverageAge(users: User[]): number {
        const totalAge = users.reduce((sum, user) => sum + user.age, 0);
        return totalAge / users.length;
    }

    private static printReport(users: User[], averageAge: number): void {
        console.log("User Report:");
        for(const user of users) {
            console.log(`${user.name} is ${user.age} years old`);
        }
            console.log(`Average age: ${averageAge.toFixed(1)} years`);
    }

    static run(): void {
        const userData = "Alice,30;Bob,25;Charlie,35";
        UserDataProcessor.processUserData(userData);
    }
}

// %%
UserDataProcessor.run();

// %%
