// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Clean Code: Namen (Teil 3)</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Disinformation und sinnvolle Unterscheidungen
//
// - Namen bedeuten etwas
// - Disinformation:
//   - Die Bedeutung des Namens impliziert etwas anderes als der Programmcode:

// %%
let verifyConfiguration = false;

// %%
if (verifyConfiguration) {
    console.log("Deleting configuration files...");
}

// %%
class Pair {
    constructor(
        public first: number,
        public second: number,
        public third: number
    ) {}
}

// %%
class Triple {
    constructor(
        public first: number,
        public second: number,
        public third: number
    ) {}
}

// %% [markdown]
//
// ## Regeln zur Vermeidung von Disinformation
//
// - Nimm keinen Typ in einen Variablennamen auf, wenn die Variable nicht von
//   diesem Typ ist
//   - Meistens: Gib überhaupt keinen Typ in einem Variablennamen an

// %%
let vectorOfCards = 0;

// %%
let numCards = 0;

// %%
let cardArray: number[] = [];

// %%
let cardDeck: number[] = [];

// %% [markdown]
//
// ## Regeln zur Vermeidung von Disinformation
//
// - Sei vorsichtig mit Namen, die sich nur geringfügig unterscheiden

// %%
let isMeleeDefenceAvailable = true;
let isMeleeDefenseAvailable = false;

// %%
// Ooops...
console.log(isMeleeDefenceAvailable === isMeleeDefenseAvailable);

// %% [markdown]
//
// ## Regeln zur Vermeidung von Disinformation
//
// - Benutze Namen, die etwas bedeuten

// %%
let foobar = 0;
let bar = 1;

// %%
let numberOfVisitors = 0;
let daysSinceRelease = 1;

// %% [markdown]
//
// ## Regeln zur Vermeidung von Disinformation
//
// - Sei bei der Namensgebung konsistent

// %%
let numberOfObjects = 10;
let numBuyers = 12;
let nTransactions = 2;

// %%
let numObjects = 10;
let numBuyers = 12;
let numTransactions = 2;

// %%
let nObjects = 10;
let nBuyers = 12;
let nTransactions = 2;

// %% [markdown]
//
// ## Sinnvolle Unterscheidungen
//
// - Verwende Namen, die die Bedeutung der Konzepte so klar wie möglich ausdrücken

// %%
let a1 = "Fluffy";
let a2 = "Garfield";

// %%
let myDog = "Fluffy";
let jonsCat = "Garfield";

// %%
const includeNone = 0;
const includeFirst = 1;
const includeSecond = 2;
const includeBoth = 3;

// %%
const includeNoDate = 0;
const includeStartDate = 1;
const includeEndDate = 2;
const includeStartAndEndDate = 3;

// %%
enum DatesToInclude {
    None = 0,
    Start = 1,
    End = 2,
    StartAndEnd = 3
}

// %%
console.log(DatesToInclude.None);

// %%
console.log(DatesToInclude.StartAndEnd);

// %%
console.log(DatesToInclude.Start | DatesToInclude.End);

// %% [markdown]
//
// ## Sinnvolle Unterscheidungen
//
// - Verwende denselben Namen für dasselbe Konzept

// %%
let myPath = "my-data";
let yourDir = "your-data";
let fileLoc = "file-loc";
console.log(fileLoc);

// %%
let myPath = "my-data";
let yourPath = "your-data";
let filePath = "file-loc";
console.log(filePath);

// %%
let database = `${Deno.env.get("HOME")}/my-db.sqlite`;
console.log(database);

// %% [markdown]
//
// ## Workshop: Namen in existierendem Code
//
// - Analysieren Sie ein Programm, an dem Sie arbeiten ob die Namen gut sind
// - Verbessern Sie die Namen, falls das möglich ist
//   - Achten Sie aber darauf, dass Sie nicht gegen die Coding-Standards
//     des Projekts verstoßen
// - Verbessert sich die Lesbarkeit des Codes?
// - Diskutieren Sie Ihre Ergebnisse mit Ihren Kollegen
