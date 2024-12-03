import { describe, expect, test } from 'vitest';
import { QuitAction, QuitGameException } from "./QuitAction";
import { ActionTag } from "../Action";
import { createPlayer } from "../../data/testObjects";

describe("QuitAction", () => {
  test("has correct description", () => {
    expect(new QuitAction().description).toBe("Quit the game.");
  });

  test("has correct tags", () => {
    expect(new QuitAction().tags).toEqual(
      new Set([ActionTag.Quit, ActionTag.InteractiveOnly]),
    );
  });

  test("perform() raises QuitGameException", async () => {
    const player = createPlayer();
    const action: QuitAction = new QuitAction();
    await expect(action.perform(player)).rejects.toBeInstanceOf(QuitGameException);
  });
});
