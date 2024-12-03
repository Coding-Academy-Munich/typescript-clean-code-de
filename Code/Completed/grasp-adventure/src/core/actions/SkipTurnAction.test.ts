import { describe, expect, test } from 'vitest';
import { SkipTurnAction } from "./SkipTurnAction";
import { ActionTag } from "../Action";
import { createPlayer } from "../../data/testObjects";

describe("SkipTurnAction", () => {
  test("has correct description", () => {
    expect(new SkipTurnAction().description).toBe(
      "Do nothing during the current turn.",
    );
  });

  test("has correct tags", () => {
    expect(new SkipTurnAction().tags).toEqual(new Set([ActionTag.SkipTurn]));
  });

  test("perform() does nothing", async () => {
    const player = createPlayer();
    const action: SkipTurnAction = new SkipTurnAction();
    await expect(action.perform(player)).resolves.toBeUndefined();
    expect(player.location.name).toBe("Room 1");
  });
});
