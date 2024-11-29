import { assertEquals } from "jsr:@std/assert";

Deno.test("test addition", () => {
    assertEquals(4, 2 + 2);
    }
);

Deno.test("failing test", () => {
    assertEquals(1, 2);
    }
);