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

// %%
import { assertEquals } from "jsr:@std/assert";

// %%
assertEquals(4, 2 + 2);

// %%
Deno.test("test addition", () => {
    assertEquals(4, 2 + 2);
    }
);

// %%
import {
    assert,
    assertFalse,
    assertNotEquals,
    assertAlmostEquals,
    assertStrictEquals,
    assertNotStrictEquals,
    assertThrows } from "jsr:@std/assert";

// %%
Deno.test("5 is greater than 3", () => {
    assert(5 > 3);
});

// %%
Deno.test("2 is not greater than 5", () => {
    assertFalse(2 > 5);
});

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

// %%
Deno.test("Strings 'Hello' are the same object", () => {
    assertStrictEquals("Hello", "Hello");
});

// %%
Deno.test("Two objects are equal", () => {
    assertEquals({}, {});
});

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

// %%
const add = (x: number, y: number): number => x + y;

// %%
console.log(add(2, 3));

// // %%
// const print = (s: string): void => {
//     console.log("Hello, " + s);
// };

// // %%
// print("World!");

// // %%
// Deno.test("Throwing an exception, well..., throws an exception", () => {
//     assertThrows(() => {
//         throw new TypeError("Something went wrong.")
//     });
// });

// // %% tags=["subslide"]
// Deno.test("Throwing a TypeError", () => {
//     assertThrows(() => { throw new TypeError("Something went wrong.") }, TypeError);
// });

// // %%
// Object.getPrototypeOf(TypeError)

// // %% tags=["subslide"]
// Deno.test("Throwing a TypeError", () => {
//     assertThrows(() => { throw new TypeError("Something went wrong.") }, Error);
// });
