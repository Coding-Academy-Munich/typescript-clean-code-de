// -*- coding: utf-8 -*-
// %%
// %% [markdown]
//
// <div style="text-align:center; font-size:200%;">
//   <b>Geleitetes Kata: Primfaktorzerlegung</b>
// </div>
// <br/>
// <div style="text-align:center; font-size:120%;">Dr. Matthias Hölzl</div>
// <br/>
// <div style="text-align:center;">Coding-Akademie München</div>
// <br/>

// %% [markdown]
//
// ## Geleitetes Kata: Primfaktorzerlegung
//
// - Eine Übung zu TDD, die zeigt, wie man durch Tests auf eine einfache
//   Implementierung eines Algorithmus geführt werden kann
// - Wichtig ist die Vorgehensweise: Tests sollen das Design treiben
// - Ziel: Lernen inkrementell und iterativ zu arbeiten!

// %% [markdown]
//
// ## Geleitetes Kata: Primfaktorzerlegung
//
// Schreiben Sie eine Funktion
//
// ```typescript
// function computeAndWritePrimes(n: number): void;
// ```
// die die Primfaktoren von n in aufsteigender Reihenfolge auf dem Bildschirm
// ausgibt.
//
// Mehrfach vorkommende Primfaktoren sind in der Ausgabe mehrmals enthalten.
//
// Die Primfaktoren sind durch Kommas getrennt.

// %% [markdown]
//
// Tests:

// %% [markdown]
// ```typescript
// import { assertEquals } from "jsr:@std/assert";
//
// Deno.test("Test prime factors of 1", () => {
//     assertEquals(primeFactors(1), []);
// });
// ```

// %% [markdown]
//
// Funktion `primeFactors()`

// %%
function primeFactors(n: number): number[] {
    return [];
}

// %%
import { assertEquals } from "jsr:@std/assert";

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

// %%
// Deno.test("Test prime factors of 2", () => {
//     assertEquals(primeFactors(2), [2]);
// });

// %%
function primeFactors(n: number): number[] {
    if (n === 2) {
        return [2];
    }
    return [];
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

// %%
// Deno.test("Test prime factors of 3", () => {
//     assertEquals(primeFactors(3), [3]);
// });

// %%
function primeFactors(n: number): number[] {
    if (n === 2) {
        return [2];
    }
    if (n === 3) {
        return [3];
    }
    return [];
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    if (n === 2) {
        result.push(2);
    }
    if (n === 3) {
        result.push(3);
    }
    return result;
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    if (n % 2 === 0) {
        result.push(2);
    }
    if (n % 3 === 0) {
        result.push(3);
    }
    return result;
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});


// %%
// Deno.test("Test prime factors of 4", () => {
//     assertEquals(primeFactors(4), [2, 2]);
// });

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    if (n % 2 === 0) {
        result.push(2);
    }
    if (n % 3 === 0) {
        result.push(3);
    }
    if (n % 4 === 0) {
        result.push(2);
    }
    return result;
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});

Deno.test("Test prime factors of 4", () => {
    assertEquals(primeFactors(4), [2, 2]);
});

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    if (n % 2 === 0) {
        result.push(2);
        if (n % 4 === 0)
            result.push(2);
    }
    if (n % 3 === 0)
        result.push(3);
    return result;
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});

Deno.test("Test prime factors of 4", () => {
    assertEquals(primeFactors(4), [2, 2]);
});

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    if (n % 2 === 0) {
        result.push(2);
        n /= 2;
        if (n % 2 === 0)
            result.push(2);
    }
    if (n % 3 === 0)
        result.push(3);
    return result;
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});

Deno.test("Test prime factors of 4", () => {
    assertEquals(primeFactors(4), [2, 2]);
});

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    while (n % 2 === 0) {
        result.push(2);
        n /= 2;
    }
    if (n % 3 === 0)
        result.push(3);
    return result;
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});

Deno.test("Test prime factors of 4", () => {
    assertEquals(primeFactors(4), [2, 2]);
});

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    while (n % 2 === 0) {
        result.push(2);
        n /= 2;
    }
    while (n % 3 === 0) {
        result.push(3);
        n /= 3;
    }
    return result;
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});

Deno.test("Test prime factors of 4", () => {
    assertEquals(primeFactors(4), [2, 2]);
});

// %%
// Deno.test("Test prime factors of 5", () => {
//     assertEquals(primeFactors(5), [5]);
// });

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    while (n % 2 === 0) {
        result.push(2);
        n /= 2;
    }
    while (n % 3 === 0) {
        result.push(3);
        n /= 3;
    }
    while (n % 5 === 0) {
        result.push(5);
        n /= 5;
    }
    return result;
}

// %%
Deno.test("Test prime factors of 1", () => {
    assertEquals(primeFactors(1), []);
});

Deno.test("Test prime factors of 2", () => {
    assertEquals(primeFactors(2), [2]);
});

Deno.test("Test prime factors of 3", () => {
    assertEquals(primeFactors(3), [3]);
});

Deno.test("Test prime factors of 4", () => {
    assertEquals(primeFactors(4), [2, 2]);
});

Deno.test("Test prime factors of 5", () => {
    assertEquals(primeFactors(5), [5]);
});

// %%
function primeFactors(n: number): number[] {
    let result: number[] = [];
    for (let factor = 2; factor <= n; factor++) {
        while (n % factor === 0) {
            result.push(factor);
            n /= factor;
        }
    }
    return result;
}

// %%
Deno.test("Test prime factors", () => {
    assertEquals(primeFactors(1), []);
    assertEquals(primeFactors(2), [2]);
    assertEquals(primeFactors(3), [3]);
    assertEquals(primeFactors(4), [2, 2]);
    assertEquals(primeFactors(5), [5]);
    assertEquals(primeFactors(6), [2, 3]);
    assertEquals(primeFactors(2 * 2 * 3 * 5 * 7 * 11 * 13 * 17), [2, 2, 3, 5, 7, 11, 13, 17]);
    assertEquals(primeFactors(2027 * 2029), [2027, 2029]);
    assertEquals(primeFactors(7907 * 7919), [7907, 7919]);
});

// %% [markdown]
//
// Test für `computeAndFormatPrimes()`

// %%
// Deno.test("TestComputeAndFormatPrimes", () => {
//     assertEquals(computeAndFormatPrimes(1), "");
//     assertEquals(computeAndFormatPrimes(2), "2");
//     assertEquals(computeAndFormatPrimes(3), "3");
//     assertEquals(computeAndFormatPrimes(4), "2,2");
//     assertEquals(computeAndFormatPrimes(5), "5");
//     assertEquals(computeAndFormatPrimes(6), "2,3");
//     assertEquals(computeAndFormatPrimes(60), "2,2,3,5");
// });

// %% [markdown]
//
// Funktion `computeAndFormatPrimes()`

// %%
function computeAndFormatPrimes(n: number): string {
    const factors = primeFactors(n);
    return factors.join(",");
}


// %%
Deno.test("TestComputeAndFormatPrimes", () => {
    assertEquals(computeAndFormatPrimes(1), "");
    assertEquals(computeAndFormatPrimes(2), "2");
    assertEquals(computeAndFormatPrimes(3), "3");
    assertEquals(computeAndFormatPrimes(4), "2,2");
    assertEquals(computeAndFormatPrimes(5), "5");
    assertEquals(computeAndFormatPrimes(6), "2,3");
    assertEquals(computeAndFormatPrimes(60), "2,2,3,5");
});


// %% [markdown]
//
// Funktion `computeAndWritePrimes()`

// %%
function computeAndWritePrimes(n: number): void {
    console.log(computeAndFormatPrimes(n));
}

// %% [markdown]
//
// ## Kata: FizzBuzz
//
// Schreiben Sie eine Funktion
// ```typescript
// function printFizzBuzz(n: number): void;
// ```
// die die Zahlen von 1 bis `n` auf dem Bildschirm ausgibt aber dabei
//
// - jede Zahl, die durch 3 teilbar ist, durch `Fizz` ersetzt
// - jede Zahl, die durch 5 teilbar ist, durch `Buzz` ersetzt
// - jede Zahl, die durch 3 und 5 teilbar ist, durch `FizzBuzz` ersetzt
//

// %% [markdown]
//
// Zum Beispiel soll `printFizzBuzz(16)` die folgende Ausgabe erzeugen:
//
// ```plaintext
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
// 16
// ```

// %% [markdown]
//
// Eine direkte Implementierung ist sehr schwer zu testen:

// %%
function printFizzBuzz(n: number): void {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// %%
printFizzBuzz(16);

// %%
function fizzBuzzNumber(n: number): string {
    if (n % 3 === 0 && n % 5 === 0) {
        return "FizzBuzz";
    } else if (n % 3 === 0) {
        return "Fizz";
    } else if (n % 5 === 0) {
        return "Buzz";
    } else {
        return n.toString();
    }
}

// %%
Deno.test("TestFizzBuzzNumber", () => {
    assertEquals(fizzBuzzNumber(1), "1");
    assertEquals(fizzBuzzNumber(2), "2");
    assertEquals(fizzBuzzNumber(3), "Fizz");
    assertEquals(fizzBuzzNumber(4), "4");
    assertEquals(fizzBuzzNumber(5), "Buzz");
    assertEquals(fizzBuzzNumber(6), "Fizz");
    assertEquals(fizzBuzzNumber(7), "7");
    assertEquals(fizzBuzzNumber(8), "8");
    assertEquals(fizzBuzzNumber(9), "Fizz");
    assertEquals(fizzBuzzNumber(10), "Buzz");
    assertEquals(fizzBuzzNumber(11), "11");
    assertEquals(fizzBuzzNumber(12), "Fizz");
    assertEquals(fizzBuzzNumber(13), "13");
    assertEquals(fizzBuzzNumber(14), "14");
    assertEquals(fizzBuzzNumber(15), "FizzBuzz");
});

// %%
function fizzBuzzNumbers(n: number): string[] {
    const result: string[] = [];
    for (let i = 1; i <= n; i++) {
        result.push(fizzBuzzNumber(i));
    }
    return result;
}

// %%
Deno.test("TestFizzBuzzNumbers", () => {
    assertEquals(fizzBuzzNumbers(1), ["1"]);
    assertEquals(fizzBuzzNumbers(3), ["1", "2", "Fizz"]);
    assertEquals(fizzBuzzNumbers(4), ["1", "2", "Fizz", "4"]);
    assertEquals(fizzBuzzNumbers(5), ["1", "2", "Fizz", "4", "Buzz"]);
    assertEquals(fizzBuzzNumbers(6), ["1", "2", "Fizz", "4", "Buzz", "Fizz"]);
    assertEquals(fizzBuzzNumbers(15), [
        "1",    "2",    "Fizz", "4",    "Buzz",
        "Fizz", "7",    "8",    "Fizz", "Buzz",
        "11",   "Fizz", "13",   "14",   "FizzBuzz"]);
});

// %%
function printFizzBuzz(n: number, output: TextEncoder): void {
    const fizzBuzzList = fizzBuzzNumbers(n);
    for (const item of fizzBuzzList) {
        console.log(item);
    }
}

// %%
printFizzBuzz(16);

// %%
