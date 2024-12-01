// -*- coding: utf-8 -*-
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Das Deno Test Framework</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Tests in Deno
//
// - `Deno.test`-Funktion zum Definieren von Tests
// - Funktionen zum Schreiben von Zusicherungen (Assertions)
// - Hilfsmittel für Test-Doubles

// %%
import { assertEquals } from "jsr:@std/assert";

// %%
assertEquals(4, 2 + 2);

// %%
// assertEquals(5, 2 + 2);

// %% [markdown]
//
// - Die Argumente werden ja ausgewertet bevor die Funktion aufgerufen wird.
// - Also müssen wir verhindern, dass der Ausdruck, den wir testen wollen, zu
//   bald ausgeführt wird.
// - Stattdessen müssen wir der `assertThrows`-Methode den Code, den wir testen
//   wollen in einer Form geben, in der sie arrangieren kann, dass  der Code in
//   einem Kontext ausgeführt wird, in dem Deno überprüfen kann, ob eine
//   Exception geworfen wird.
// - Und glücklicherweise hat TypeScript dafür eine elegante Lösung: Lambda
//   Ausdrücke, die sowohl Ausdrücke als auch Anweisungen kapseln können.

// %% [markdown]
//
// ### Einschub: Lambda-Ausdrücke
//
// - Lambda-Ausdrücke sind eine Möglichkeit, Funktionen als Argumente zu
//   übergeben.
// - Sie können in Funktions-Typen konvertiert werden.

// %% [markdown]
//
// #### Ausdrucks-Lambdas

// %%
const add = (x: number, y: number): number => x + y;

// %%
// console.log(add(2, 3));

// %% [markdown]
//
// #### Anweisungs-Lambdas

// %%
const print = (s: string): void => {
    console.log("Hello, " + s);
};

// %%
// print("World!");

// %%
Deno.test("test addition", () => {
    assertEquals(4, 2 + 2);
    }
);

// %%
// Deno.test("failing test", () => {
//     assertEquals(1, 2);
//     }
// );

// %% [markdown]
// ```shell
// > deno test
// > deno test simple_tests.ts
// ```

// %% [markdown]
//
// ## Was ist Deno?
//
// - Deno ist ein modernes Runtime-und Test-Framework für TypeScript und JavaScript
// - Open-Source
// - Einfach in Projekte zu integrieren
// - Viele Features
// - Struktur ähnlich zu anderen Test-Frameworks

// %% [markdown]
//
// ## Features des Deno Test Frameworks
//
// - Verwaltung von Tests und Test-Suites
// - Assertion-Bibliothek für Testfälle
// - Ausführung von Tests (Test Runner)
// - Versetzen des SuT in einen definierten Zustand (Test Fixtures)
// - Unterstützung für parametrisierte Tests

// %% [markdown]
//
// ## Assertions in Deno
//
// - `assert`, `assertFalse` um Bedingungen zu prüfen
// - `assertEquals`, `assertNotEquals` um Werte zu prüfen
// - `assertStrictEquals`, `assertNotStrictEquals` um auf Identität zu prüfen (`Object.is`)
// - `assertNull`, `assertNotNull` um auf `null` zu prüfen
// - `assertThrows` um Exceptions zu prüfen

// %%
import {
    assert,
    assertFalse,
    assertNotEquals,
    assertAlmostEquals,
    assertStrictEquals,
    assertNotStrictEquals,
    assertThrows } from "jsr:@std/assert";

// %% [markdown]
//
// ### Boolesche Assertions

// %%
Deno.test("5 is greater than 3", () => {
    assert(5 > 3);
});

// %%
Deno.test("2 is not greater than 5", () => {
    assertFalse(2 > 5);
});

// %%
// Deno.test("1 is not greater than 4", () => {
//     assert(1 > 4);
// });

// %% [markdown]
//
// ### Gleichheits-Assertions

// %%
Deno.test("2 + 2 is equal to 4", () => {
    assertEquals(4, 2 + 2);
});

// %%
Deno.test("5 is not equal to 2 + 2", () => {
    assertNotEquals(5, 2 + 2);
});

// %%
const str1 = "Hello";
const str2 = "Hello";

// %%
Deno.test("str1 is equal to str2", () => {
    assertEquals(str1, str2);
});

// %%
Deno.test("str1 is equal to str2 using assert", () => {
    assert(str1 === str2);
});

// %%
// Deno.test("Hello is not equal to World using assert", () => {
//     assert("Hello" === "World");
// });

// %%
// Deno.test("Hello is not equal to World using assertEquals", () => {
//     assertEquals("Hello", "World");
// });

// %% [markdown]
//
// #### Vergleich von Gleitkommazahlen

// %%
// Deno.test("0.1 + 0.2 is not equal to 0.3", () => {
//     assertEquals(0.1 + 0.2, 0.3);
// });

// %%
Deno.test("0.1 + 0.2 is approximately equal to 0.3", () => {
    assertAlmostEquals(0.1 + 0.2, 0.3);
});

// %%
Deno.test("0.1 + 0.2 is approximately equal to 0.3", () => {
    assertAlmostEquals(0.1 + 0.2, 0.3, 1e-7);
});

// %%
Deno.test("0.1 is almost equal to 0.11", () => {
    assertAlmostEquals(0.1, 0.11, 0.02);
});
// %%
Deno.test("0.1 and 0.11 match to 1 decimal place", () => {
    assertAlmostEquals(0.1, 0.11, 0.02);
});

// %% [markdown]
//
// ### Identitäts-Assertions

// %%
Deno.test("Strings 'Hello' are the same object", () => {
    assertStrictEquals("Hello", "Hello");
});

// %%
Deno.test("Two objects are equal", () => {
    assertEquals({}, {});
});

// %%
// Deno.test("Two objects are not the same object (fails)", () => {
//     assertStrictEquals({}, {});
// });

// %%
const obj = {}

// %%
Deno.test("str1 is the same object as itself", () => {
    assertStrictEquals(obj, obj);
});

// %%
Deno.test("str1 is not the same object as itself", () => {
    assertNotStrictEquals({}, {});
});

// %% [markdown]
//
// ### Exception-Assertions

// %%
Deno.test("Throwing an exception, well..., throws an exception", () => {
    assertThrows(() => {
        throw new TypeError("Something went wrong.")
    });
});

// %%
// Deno.test("assertThrows throws if argument does not", () => assertThrows(() => 123));

// %%
Deno.test("Throwing a TypeError", () => {
    assertThrows(() => { throw new TypeError("Something went wrong.") }, TypeError);
});

// %%
console.log(Object.getPrototypeOf(TypeError));

// %%
Deno.test("Throwing a TypeError", () => {
    assertThrows(() => { throw new TypeError("Something went wrong.") }, Error);
});

// %%
// Deno.test("Throwing a TypeError", () => {
//     assertThrows(() => { throw new TypeError("Something went wrong.") }, RangeError);
// });

// %% [markdown]
//
// ## Workshop: Deno Test Basics im Notebook
//
// In diesem Workshop sollen Sie ein paar einfache Tests mit Deno schreiben.
//
// Hier ist der Code, den Sie testen sollen:

// %%
function mult(a: number, b: number): number {
    return a * b;
}

// %%
function circleArea(radius: number): number {
    if (radius < 0) {
        throw new Error("Radius must be positive");
    }
    return Math.PI * radius ** 2;
}

// %%
type Person = { name: string, age: number };

// %%
function makePerson(name: string, age: number): Person {
    return { name, age };
}

// %%
type Address = { street: { name: string, number: number }, city: { name: string, zip: string} };

// %%
function makeAddress(streetName: string, streetNumber: number, cityName: string, cityZip: string): Address {
    return { street: { name: streetName, number: streetNumber }, city: { name: cityName, zip: cityZip } };
}

// %%
function maybeCopy(o: object, copy: boolean): object {
    if (copy) {
        return { ...o };
    } else {
        return o;
    }
}

// %%
Deno.test("mult returns correct value", () => {
     assertEquals(6, mult(2, 3));
    });

// %%
Deno.test("circleArea returns correct value for positive radius", () => {
    assertAlmostEquals(Math.PI * 4 ** 2, circleArea(4));
    });

// %%
Deno.test("circleArea throws error for negative radius", () => {
    assertThrows(() => circleArea(-1), Error, "Radius must be positive");
    });

// %% [markdown]
//
// Ein Test mit `assert` und `===` funktioniert nicht, da wir die Gleichheit
// der Werte prüfen wollen.

// %%
// Deno.test("test makePerson", () => {
//     assert({ name: "John", age: 42 } === makePerson("John", 42));
//     });

// %% [markdown]
//
// `assertEquals()` vergleicht die Werte der beiden Objekte.

// %%
Deno.test("test makePerson", () => {
    assertEquals({ name: "John", age: 42 }, makePerson("John", 42));
    });

// %% [markdown]
//
// Das funktioniert auch für verschachtelte Objekte.

// %%
Deno.test("test makeAddress", () => {
    assertEquals(
        { street: { name: "Main", number: 42 }, city: { name: "Springfield", zip: "12345" } },
        makeAddress("Main", 42, "Springfield", "12345"));
    });

// %% [markdown]
//
// - Bei `maybeCopy()` müssen wir überprüfen, ob das Objekt kopiert wurde und wenn
//   ja, ob die Kopie den richtigen Wert hat.
// - Dazu können wir `assertNotStrictEquals()` verwenden.

// %%
Deno.test("maybeCopy copies first arg when second arg is true", () => {
    const john = { name: "John", age: 42 };
    assertNotStrictEquals(john, maybeCopy(john, true));
    assertEquals(john, maybeCopy(john, true));
    });

// %%
Deno.test("maybeCopy does not copy first arg when second arg is false", () => {
    const john = { name: "John", age: 42 };
    assertStrictEquals(john, maybeCopy(john, false));
    });
