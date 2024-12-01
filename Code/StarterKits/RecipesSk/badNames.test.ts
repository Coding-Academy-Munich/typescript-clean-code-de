// badNames.test.ts

import { One, Many } from "./badNames.ts";
import { assertEquals, assertThrows } from "jsr:@std/assert";

// Helper fixtures
const one1: One = {
  aaa: "My Recipe",
  bbb: ["ingredient 1", "my ingredient 2"],
  ccc: "Instructions\n...",
  ddd: 4,
};

const one2: One = {
  aaa: "Your Recipe",
  bbb: ["ingredient 1", "your ingredient 2"],
  ccc: "Instructions\n...",
  ddd: 5,
};

const setupMany = () => {
  return new Many([one1, one2]);
};

// Test cases
Deno.test("Many.addThing should add a new recipe", () => {
  const many = new Many();
  many.addThing(one1);
  assertEquals(many.getThing("My Recipe"), one1);
});

Deno.test("Many.getThing should return the correct recipe by aaa", () => {
  const many = setupMany();

  assertEquals(many.getThing("My Recipe"), one1);
  assertEquals(many.getThing("Your Recipe"), one2);

  assertThrows(
    () => {
      many.getThing("nonexistent");
    },
    Error,
    "recipe nonexistent not found!"
  );
});

Deno.test("Many.getThings1 should return recipes with specific bbb", () => {
  const many = setupMany();

  assertEquals(many.getThings1("ingredient 1"), [one1, one2]);
  assertEquals(many.getThings1("my ingredient 2"), [one1]);
  assertEquals(many.getThings1("nonexistent"), []);
});

Deno.test("Many.getThings2 should return recipes with specific ddd", () => {
  const many = setupMany();

  assertEquals(many.getThings2(4), [one1]);
  assertEquals(many.getThings2(5), [one2]);
  assertEquals(many.getThings2(3), []);
});

Deno.test("Many.getThings3 should return recipes with ddd >= provided value or undefined ddd", () => {
  const many = setupMany();

  assertEquals(many.getThings3(3), [one1, one2]);
  assertEquals(many.getThings3(4), [one1, one2]);
  assertEquals(many.getThings3(5), [one2]);
  assertEquals(many.getThings3(6), []);
});
