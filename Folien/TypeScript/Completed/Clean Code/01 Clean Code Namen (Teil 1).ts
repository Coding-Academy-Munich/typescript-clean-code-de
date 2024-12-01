// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Clean Code: Namen (Teil 1)</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// Namen sind ein mächtiges Kommunikationsmittel.
//
// - Sie sind überall im Programm zu finden
// - Sie verbinden den Code mit Domänen-Konzepten.

// %%
function foo(a: number, b: number): number {
    if (b > 40.0) {
        throw new Error("Not allowed!");
    }
    return 40.0 * a + 60.0 * b;
}

// %%
console.log(foo(40.0, 3.5));

// %%
const regularPayPerHour = 40.0;
const overtimePayPerHour = 60.0;
const maxAllowedOvertime = 40.0;

// %%
function computeTotalSalary(regularHoursWorked: number, overtimeHoursWorked: number): number {
    if (overtimeHoursWorked > maxAllowedOvertime) {
        throw new Error("Not allowed!");
    }
    const regularPay = regularHoursWorked * regularPayPerHour;
    const overtimePay = overtimeHoursWorked * overtimePayPerHour;
    return regularPay + overtimePay;
}

// %%
console.log(computeTotalSalary(40.0, 3.5));

// %%
let severity = 30; // Is this high or low?

// %%
console.log(severity);

// %% [markdown]
//
// ### Konstanten
//
// - Namen für besondere Werte
// - Klarer, als die Werte direkt zu verwenden
// - Direkter Bezug zwischen Name und Wert
// - Wenig Information über alle möglichen Werte
// - Wenig Bezug zum Typsystem

// %%
const severityHigh = 30;

// %%
let severity = severityHigh; // This is important!

// %% [markdown]
//
// ### Enumerationen
//
// - Alternative zu Konstanten
// - Dokumentieren, welche Werte erwartet werden
// - Bessere Typsicherheit
// - Weniger Flexibilität

// %%
enum Severity {
    High,
    Medium,
    Low
}

// %%
let severity: Severity = Severity.High;

// %% [markdown]
//
// ### Klassen und Structs

// %%
function analyzeReview(text: string): [number, string] {
    return [5, "Generally positive"];
}

// %%
console.log(analyzeReview("Some review text"));

// %%
type ReviewResult = {
    rating: number;
    summary: string;
};

// %%
function analyzeReview(text: string): ReviewResult {
    return { rating: 5, summary: "Generally positive" };
}
// %%
const result = analyzeReview("Some review text");

// %%
console.log(result);

// %%
enum Rating {
    Unknown = 0,
    Low,
    ModeratelyLow,
    Medium,
    ModeratelyHigh,
    High,
};

// %%
type ReviewResult = {
    rating: Rating;
    summary: string;
};

// %%
function analyzeReview(text: string): ReviewResult {
    return {rating: Rating.ModeratelyHigh, summary: "Overall positive"};
}

// %%
console.log(analyzeReview("Some review text"));

// %% [markdown]
//
// ## Was ist ein guter Name?
//
// - Präzise (sagt was er meint, meint was er sagt)
// - Beantwortet
//   - Warum gibt es diese Variable (Funktion, Klasse, Modul, Objekt...)?
//   - Was macht sie?
//   - Wie wird sie verwendet?
//
// Gute Namen sind schwer zu finden!

// %% [markdown]
//
// ## Was ist ein schlechter Name?
//
// - Braucht einen Kommentar
// - Verbreitet Disinformation
// - Entspricht nicht den Namensregeln

// %% [markdown]
//
// ## Workshop: Rezepte
//
// In `Code/StarterKits/RecipesSk` ist ein Programm, mit dem sich ein
// Kochbuch verwalten lässt. Leider hat der Programmierer sehr schlechte Namen
// verwendet, dadurch ist das Programm schwer zu verstehen.
//
// Ändern Sie die Namen so, dass das Programm leichter verständlich wird.
//
// ### Hinweis
//
// Verwenden Sie die Refactoring-Tools Ihrer Entwicklungsumgebung!
