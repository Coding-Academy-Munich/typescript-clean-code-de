// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Clean Code: Funktionen (Teil 1)</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// [Fasse Operationen, die logisch zusammengehören, als sorgfältig benannte
// Funktionen zusammen (CG,
// F.1)](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rf-package)
//
// - Besser lesbar
// - Einfacher zu testen
// - Fehler sind weniger wahrscheinlich
// - Wird eher wiederverwendet

// %% [markdown]
//
// ## Die 1. Clean Code Regel für Funktionen
//
// - Funktionen sollten kurz sein
// - Kürzer als man meint!
// - Maximal 4 Zeilen!

// %% [markdown]
//
// ## C++ Core Guidelines
//
// - Eine etwas entspanntere Variante dieser Regel ist in vielen anderen Coding Guidelines zu finden
// - Ich finde die Version in den C++ Core-Guidelines sehr gut
// - Auch für andere Sprachen, wie TypeScript
// - [Halte Funktionen kurz und einfach (CG
//   F.3)](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f3-keep-functions-short-and-simple)
//   - Funktionen sollten auf einen Bildschirm passen
//   - Große Funktionen sollten in kleinere, zusammenhängende und benannte
//     Funktionen aufgeteilt werden
//   - Funktionen mit einer bis fünf Zeilen sollten als normal angesehen werden

// %% [markdown]
//
// ## Konzentration auf eine Aufgabe
//
// - Funktionen sollten eine Aufgabe erfüllen ("do one thing")
// - Sie sollten diese Aufgabe gut erfüllen
// - Sie sollten nur diese Aufgabe erfüllen

// %%
function doStuff(a: number, b: number, results: number[]): number {
    // Get measurement from sensors based on config data...
    const measurement = a + b;
    // ... and perform a complex computation
    const newResult = measurement + 1;
    // ... save the result to the list of results
    if (newResult > 0) {
        results.push(newResult);
    }
    // ... print all results
    for (const result of results) {
        console.log(result);
    }
    // ... and return the result
    return newResult;
}

// %%
const allResults: number[] = [12, 43];

// %%
const newResult = doStuff(2, 4, allResults);

// %%
console.log(newResult);

// %%
console.log(allResults);

// %% [markdown]
//
// - Messung, Auswertung und Validierung der Ergebnisse

// %%
function getMeasurement(a: number, b: number): number {
    return a + b;
}

// %%
function computeDataForNextTimestep(measurement: number): number {
    return measurement + 1;
}

// %%
function isValidResult(result: number): boolean {
    return result > 0;
}

// %% [markdown]
//
// - Speichern und Drucken der Ergebnisse:

// %%
function saveResult(newResult: number, results: number[]): void {
    results.push(newResult);
}

// %%
function printResults(results: number[]): void {
    for (const result of results) {
        console.log(result);
    }
}

// %% [markdown]
//
// - Zusammenführung der Funktionen:

// %%
function performMeasurementAndProcessResult(a: number, b: number, results: number[]): number {
    const measurement = getMeasurement(a, b);
    const newResult = computeDataForNextTimestep(measurement);
    if (isValidResult(newResult)) {
        saveResult(newResult, results);
    }
    printResults(results);
    return newResult;
}
// %%
const allResults: number[] = [12, 43];

// %%
const newResult = performMeasurementAndProcessResult(2, 4, allResults);

// %%
console.log(newResult);

// %%
console.log(allResults);

// %% [markdown]
//
// ### Fragen
//
// - Macht `performMeasurementAndProcessResult()` das Gleiche wie `doStuff()`?
// - Ist die Funktion `performMeasurementAndProcessResult()` wirklich besser?
// - Konzentriert sie sich auf eine Aufgabe?
// - Unterscheiden sich Ihre Aufgaben von `doStuff()`?
// - Warum (nicht)?

// %% [markdown]
//
// ## Hilfsmittel: Änderungsgründe
//
// - Welche möglichen Änderungsgründe gibt es?
// - Wie viele davon betreffen die jeweilige Funktion?

// %% [markdown]
//
// | Änderungsgrund        | `doStuff()` | `performMeasurementAndProcessResult()` |
// | --------------------- | :---------- | :------------------------------------- |
// | Messung               | ✓           | ❌ `getMeasurement()`                 |
// | Berechnung            | ✓           | ❌ `computeDataForNextTimestep()`     |
// | Validierung           | ✓           | ❌ `isValidResult()`                  |
// | Speichern             | ✓           | ❌ `saveResult()`                     |
// | Drucken               | ✓           | ❌ `printResults()`                   |
// | Neue/andere Tätigkeit | ✓           | ✓                                     |

// %% [markdown]
//
// # Abstraktionsebenen
//
// - Alles, was die Funktion in ihrem Rumpf tut, sollte eine (und nur eine)
//   Abstraktionsebene unterhalb der Funktion selbst sein.
// - Beispiel: `performMeasurementAndProcessResult()`
// - Gegenbeispiel: `createAndDistributeExam()`:

// %% [markdown]
//
// ```typescript
// function createAndDistributeExam(subject: string): void {
//     // high level abstraction
//     const exam = createExamUsingChatGPT(subject);
//
//     // low level abstractions
//     const fileName = `${subject}_exam.pdf`;
//     const encoder = new TextEncoder();
//     const fileData: Uint8Array[] = [];
//
//     fileData.push(encoder.encode(writePdfHeader()));
//     for (const question of exam.getQuestions()) {
//         const pdfQuestion = convertQuestionToPdf(question);
//         fileData.push(encoder.encode(pdfQuestion + "\n"));
//     }
//
//     saveToFile(fileName, fileData);
//
//     // higher level abstraction
//     distributeExamToStudents(fileName);
// }
// ```
// %% [markdown]
//
// ## Kontrolle der Abstraktionsebenen: "Um-Zu"-Absätze
//
// `performMeasurementAndProcessResult()`:
//
// Um eine Messung durchzuführen und das Ergebnis zu verarbeiten:
// - Hole ein Messergebnis
// - Berechne die Daten für den nächsten Zeitschritt
// - Speichere das Ergebnis, falls es gültig ist
// - Drucke alle Ergebnisse, unabhängig davon, ob das neue Ergebnis gültig ist

// %% [markdown]
//
// ## Kommentare als "Um-Zu"-Absätze
//
// - Beim Schreiben von Code können wir das "Um-Zu"-Muster verwenden, um die
//   Abstraktionsebenen zu kontrollieren
// - Wir können die "Um-Zu"-Absätze als Kommentare schreiben bevor wir den Code
//   schreiben
// - Meistens wird jeder Kommentar zu einer Funktion

// %%
class OrderProcessor {
    processOrder(orderId: string): void {
        // Hole die Bestelldetails anhand der `orderId`
        // Validiere die Lagerverfügbarkeit für jeden Artikel in der Bestellung
        // Aktualisiere den Lagerbestand bei erfolgreicher Validierung
        // Erzeuge eine Lieferung für die Bestellung
        // Benachrichtige den Kunden mit den Lieferdetails
    }
}

// %% [markdown]
//
// ## Funktionen als "Um-Zu"-Absätze
//
// Wir können die "Um-Zu"-Absätze auch gleich als Funktionsaufrufe schreiben:

// %%
class OrderProcessor {
    processOrder(orderId: string): void {
        // Hole die Bestelldetails anhand der `orderId`
        this.fetchOrderDetails(orderId);
        // Validiere die Lagerverfügbarkeit für jeden Artikel in der Bestellung
        this.validateStockAvailability(orderId);
        // Aktualisiere den Lagerbestand bei erfolgreicher Validierung
        this.updateInventory(orderId);
        // Erzeuge eine Lieferung für die Bestellung
        this.generateShipment(orderId);
        // Benachrichtige den Kunden mit den Lieferdetails
        this.notifyCustomer(orderId);
    }

    private fetchOrderDetails(orderId: string): void {}
    private validateStockAvailability(orderId: string): void {}
    private updateInventory(orderId: string): void {}
    private generateShipment(orderId: string): void {}
    private notifyCustomer(orderId: string): void {}
}

// %% [markdown]
//
// ## Die Step-Down-Regel
//
// - Wir wollen, dass sich der Code wie eine Erzählung von oben nach unten liest
// - Auf jede Funktion sollten die Funktionen eine Abstraktionsebene darunter
//   folgen

// %% [markdown]
//
// ## Mini-Workshop: Do one Thing
//
// Die Funktion `handleMoneyStuff()` macht mehr als eine Sache.
//
// Teilen Sie sie in mehrere Funktionen auf, so dass jede nur eine Sache tut.
// Stellen Sie sicher, dass
// - jede Funktion ihre Aufgabe gut erfüllt und sich auf einer einzigen
//   Abstraktionsebene befindet,
// - alle Namen angemessen sind, und
// - der Code leicht zu verstehen ist.
//
// Falls Sie die Aufgabe lieber in Ihrer gewohnten Entwicklungsumgebung
// bearbeiten möchten, finden Sie den Code im Verzeichnis
// `code/starter_kits/salaries_sk`.
//
// *Tipp:* Beginnen Sie damit, die Variablen gemäß den Kommentaren umzubenennen,
// um den Rest der Arbeit zu vereinfachen.

// %%
const lstDns: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// %%
function handleMoneyStuff(
    iDow: number,
    fSpd: number,
    strN: string,
    lstSlrs: number[]
): number {
    // Get the day of week from the list of days.
    // We count Sunday as 1, Monday as 2, etc. but the work week starts on Monday.
    const strDow = lstDns[iDow - 1];
    // Compute the salary so far based on the day
    let fSsf = (iDow - 1) * fSpd;
    // The tax
    let fT = 0.0;
    if (fSsf > 500.0 && fSsf <= 1000.0) {
        fT = fSsf * 0.05;
    } else if (fSsf > 1000.0 && fSsf <= 2000.0) {
        fT = fSsf * 0.1;
    } else {
        fT = fSsf * 0.15;
    }
    // Update salary based on the tax to pay
    fSsf = fSsf - fT;
    // Add the salary to the list of all salaries paid
    lstSlrs.push(fSsf);
    console.log(`${strN} worked till ${strDow} and earned $${fSsf} this week.`);
    console.log(`Their taxes were $${fT}.`);
    return fT;
}

// %%
const salaries: number[] = [2345, 1234];
const result = handleMoneyStuff(4, 200, "Joe", salaries);
console.log(result);

// %%
console.assert(JSON.stringify(salaries) === JSON.stringify([2345, 1234, 570]));
console.assert(result === 30);

// %%
const dayOfWeekNames: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// %%
function computeSalaryAndTaxesV2(
    dayOfWeekIndex: number,
    salaryPerDay: number,
    employeeName: string,
    salaries: number[]
): number {
    const baseSalary = computeBaseSalary(dayOfWeekIndex, salaryPerDay);
    const [netSalary, tax] = computeNetSalaryAndTax(baseSalary);
    storeNetSalary(netSalary, salaries);
    printEmployeeInfo(dayOfWeekIndex, employeeName, netSalary, tax);
    return tax;
}

// %%
function computeBaseSalary(dayOfWeekIndex: number, salaryPerDay: number): number {
    const daysWorkedThisWeek = dayOfWeekIndex - 1;
    return daysWorkedThisWeek * salaryPerDay;
}

// %%
function computeNetSalaryAndTax(baseSalary: number): [number, number] {
    const tax = computeTax(baseSalary);
    const netSalary = baseSalary - tax;
    return [netSalary, tax];
}

// %%
function computeTax(baseSalary: number): number {
    if (baseSalary > 500.0 && baseSalary <= 1000.0) {
        return baseSalary * 0.05;
    } else if (baseSalary > 1000.0 && baseSalary <= 2000.0) {
        return baseSalary * 0.1;
    } else {
        return baseSalary * 0.15;
    }
}

// %%
function storeNetSalary(netSalary: number, salaries: number[]): void {
    salaries.push(netSalary);
}

// %%
function printEmployeeInfo(
    dayOfWeekIndex: number,
    name: string,
    salary: number,
    tax: number
): void {
    const dayOfWeek = getDayOfWeekFromIndex(dayOfWeekIndex);
    console.log(`${name} worked till ${dayOfWeek} and earned $${salary} this week.`);
    console.log(`Their taxes were $${tax}.`);
}

// %%
function getDayOfWeekFromIndex(index: number): string {
    return dayOfWeekNames[index - 1];
}

// %%
const _salaries: number[] = [2345, 1234];
const _result = computeSalaryAndTaxesV2(4, 200, "Joe", _salaries);
console.log(_result);

// %%
console.assert(JSON.stringify(_salaries) === JSON.stringify([2345, 1234, 570]));
console.assert(_result === 30);
