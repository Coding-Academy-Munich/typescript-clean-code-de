// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Clean Code: Namen (Teil 2)</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Namensregeln für TypeScript
//
// - Namen entsprechen Code-Konventionen, z.B.
//   - [Google TypeScript Coding Conventions](https://google.github.io/styleguide/tsguide.html)

// %% [markdown]
//
// ## Clean Code Namensregeln
//
// Gute Namen
//
// - sind selbsterklärend
// - kommunizieren die Intention
// - sind aussprechbar und durchsuchbar
// - beschreiben das Problem, nicht die Implementierung
// - vermeiden Kodierungen (ungarische Notation) und Füllwörter
// - verwenden die richtige Wortart (lexikalische Kategorie)
// - verwenden die Regeln für Umfang und Länge (Scope-Length Rules)
// - vermeiden Disinformation und benennen eine sinnvolle Unterscheidung

// %% [markdown]
//
// ## Selbsterklärende Namen

// %%
let d = 0;

// %%
let elapsedTimeInDays = 0;

// %% [markdown]
//
// ## Kommuniziere Intention
//
// Namen sollen Absicht, Verhalten, Existenzberechtigung reflektieren

// %%
let myList: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// %%
let dpmLst: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// %%
let daysPerMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


// %% [markdown]
//
// ## Aussprechbare Namen
//
// Sind oft auch besser zu suchen

// %%
let hwCrsrPxy: number[] = [0, 0];

// %%
let hardwareCursorPosition: number[] = [0, 0];


// %% [markdown]
//
// ## Beschreibe Problem, nicht Implementierung
//
// Vermeide Namen, die sich auf Implementierungsdetails beziehen:
// - Sie verraten nicht, warum der Code so geschrieben wurde, wie er geschrieben
//   ist
// - Aber die Kommunikation der Intention hinter dem Code hat höchste Priorität!

// %%
function addElements(lst: number[]): number {
    return lst.reduce((sum, value) => sum + value, 0);
}

// %%
console.log(addElements([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])); // Seems reasonable


// %%
function computeYearlySalary(monthlySalaries: number[]): number {
    return monthlySalaries.reduce((sum, value) => sum + value, 0);
}

// %%
console.log(computeYearlySalary(daysPerMonth)); // WHAT?!?


// %% [markdown]
//
// ## Vermeide Kodierungen
//
// Verwende keine ungarische Notation:

// %%
let iDays = 12;
let iMonth = 3;

// %% [markdown]
//
// ## Vermeide Kodierungen
//
// Verwende keine Präfixe für Attribute:

// %%
class Point {
    m_x: number;
    m_y: number;

    constructor(x: number, y: number) {
        this.m_x = x;
        this.m_y = y;
    }
}

// %%
console.log(new Point(1.0, 2.0));

// %%
class Point {
    constructor(public x: number, public y: number) {}
}

// %%
console.log(new Point(1.0, 2.0));

// %%
class MyClass {
    private m_days: number;
    private m_months: number;

    constructor(days: number, months: number) {
        this.m_days = days;
        this.m_months = months;
    }

    public get days(): number {
        return this.m_days;
    }

    public get months(): number {
        return this.m_months;
    }
}

// %%
let mc = new MyClass(10, 2);

// %%
console.log(mc.days);

// %%
// mc.months = 3;

// %%
class MyClass {
    private _days: number;
    private _months: number;

    constructor(days: number, months: number) {
        this._days = days;
        this._months = months;
    }

    public get days(): number {
        return this._days;
    }

    public get months(): number {
        return this._months;
    }
}

// %%
let mc = new MyClass(10, 2);

// %%
console.log(mc.days);

// %%
// mc.months = 3;

// %%
class MyClass {
    constructor(readonly days: number, readonly months: number) {}
}

// %%
let mc = new MyClass(10, 2);

// %%
console.log(mc.days);

// %%
// But...
mc.months = 3;
console.log(mc.months);

// %% [markdown]
//
// ## Vermeide Kodierungen
//
// Vermeiden Sie Präfixe wie C/I: CClass, IInterface

// %%
class CPoint {
    public x: number;
    public y: number;
}

// %%
let point: CPoint = new CPoint();

// %% [markdown]
//
// ## Verwende die richtige lexikalische Kategorie
//
// - Klassen und Variablen: Substantive oder Substantivphrasen
// - Funktionen: Verben oder Verbphrasen
// - Enums: oft Adjektive
// - Boolesche Variablen und Funktionen: oft Prädikate: `is...`, `has...`

// %%
class GoToTheServer {
    // Connect to the server
    connection(): void {
        // ...
    }

    serverAvailability(): boolean {
        return true;
    }
}

// %%
let con = new GoToTheServer()

// %%
con.connection();

// %%
if (con.serverAvailability()) {
    console.log("Working with the server...")
}

// %%
class ServerConnection {
    connect(): void {
        // ...
    }

    isServerAvailable(): boolean {
        return true;
    }
}

// %%
let con = new ServerConnection()

// %%
con.connect();

// %%
if (con.isServerAvailable()) {
    console.log("Working with the server...")
}

// %% [markdown]
//
// ## Vermeide Füllwörter
//
// Vermeide Wörter, die keine Bedeutung haben, wie Manager, Processor, Data,
// Info

// %%
class ObjectManager {
}

// %% [markdown]
//
// ## TypeScript-Spezifisch
//
// - Verwende Attribute statt Getter/Setter.
// - Verwende Properties (`get foo()`) für Zugriff auf Attribute statt Getter/Setter (`getFoo()`):

// %%
class MyBox {
    private x: number;

    constructor(x: number) {
        this.x = x;
    }

    getX(): number {
        return this.x;
    }

    setX(newX: number): number {
        this.x = newX;
    }
}

// %%
let b = new MyBox(10);

// %%
console.log(b.getX());

// %%
b.setX(11);
console.log(b.getX());

// %%
class MyBox {
    public x: number;

    constructor(x: number) {
        this.x = x;
    }
}

// %%
let b = new MyBox(10);

// %%
console.log(b.x);

// %%
b.x = 11;
console.log(b.x);

// %% [markdown]
//
// Mit Properties kann kontrollierter oder berechneter Zugriff
// auf Attribute implementiert werden:

// %%
class ControlledBox {
    private _x: number;

    public get x(): number {
        return this._x ** 2;
    }

    public set x(value: number) {
        this._x = Math.abs(value);
    }

    constructor(x: number) {
        this.x = x; // Uses the setter for initialization
    }
}

// %%
let yourBox = new ControlledBox(-2);
console.log(yourBox.x);

// %%
yourBox.x = -200;
console.log(yourBox.x);

// %% [markdown]
//
// ## Regeln für Umfang und Länge (Scope-Length Rules)
//
// - Variablen:
//   - Langer Geltungsbereich = langer Name
//   - Kurzer Geltungsbereich = kurzer Name
// - Klassen und Methoden
//   - Langer Geltungsbereich = kurzer Name (wenn häufig verwendet?)
//   - Kurzer Geltungsbereich = langer Name (wenn selten verwendet?)
//
// **Oder:** Verwende lange Namen für lange Geltungsbereiche

// %%
class FixedSizeOrderedCollectionIndexedByInts {
}

// %%
class MyArray {
}

// %% [markdown]
//
// ## Workshop: Namen
//
// In diesem Workshop wenden Sie die Clean Code Namensregeln an, die wir gerade
// gelernt haben. Sie werden mit mehreren Code-Schnipseln konfrontiert, die
// gegen eine oder mehrere dieser Regeln verstoßen.
//
// Ihre Aufgabe:
// 1. Identifizieren Sie, welche Namensregeln in jedem Beispiel verletzt werden.
// 2. Schreiben Sie den Code mit verbesserten Namen um, die den
//    Clean Code-Prinzipien folgen.
// 3. Seien Sie bereit, Ihre Änderungen zu erklären und zu begründen, warum sie
//    die Lesbarkeit und Wartbarkeit des Codes verbessern.
//
// Denken Sie an die Schlüsselprinzipien:
// - Namen sollten selbsterklärend und die Absicht offenbaren
// - Verwenden Sie aussprechbare und durchsuchbare Namen
// - Vermeiden Sie Kodierungen und Füllwörter
// - Verwenden Sie die richtige Wortart
// - Wenden Sie die Umfangs-Längen-Regeln angemessen an

// %%
let secondsInADay = 86400;

// %%
let theList: string[] = ["Apple", "Banana", "Cherry"];

// %%
const fruits: string[] = ["Apple", "Banana", "Cherry"];

// %%
let flag = false;  // Indicates if the user is logged in

// %%
let isUserLoggedIn = false;

// %%
function StuffManager(s: string) {
    // Process the input string
}

// %%
function processInput(input: string) {
    // Process the input string
}

// %%
class DataInfoManager {
    private strName: string;
    private iAge: number;
}

// %%
class PersonalInfo {
    private name: string;
    private age: number;
}

// %%
function chkandvldtinpt(s: string): boolean {
    // Check if input is valid
    return !s.trim().length;
}

// %%
function isInputValid(input: string): boolean {
    return !input.trim().length;
}

// %%
let x = 0;  // index into array

// %%
let index = 0;

// %%
class MakeAndManageEmployees {
    // Methods for employee management
}

// %%
class EmployeeManager {
    // Methods for employee management
}

// %%
function setvalue(NV: number) {
    // Set the value of an internal variable
}

// %%
function SetValue(newValue: number) {
    // Set the value of an internal variable
}

// %%
let processSuccessful = false; // Was the process successful?

// %%
let wasProcessSuccessful = false;
