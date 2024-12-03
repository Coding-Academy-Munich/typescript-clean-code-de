import { describe, expect, test } from 'vitest';
import { SkipTurnAction } from "../actions/SkipTurnAction";
import { createPlayer } from "../../data/testObjects";
import { SelectHelpfulAction } from "./SelectHelpfulAction";
import { MoveAction } from "../actions/MoveAction";
import { ActionTag } from "../Action";
import { HealAction } from "../actions/HealAction";

describe("SelectHelpfulAction", () => {
  test("is not interactive", () => {
    expect(new SelectHelpfulAction().isInteractive).toBe(false);
  });

  test("selectAction() returns SkipTurnAction if no actions", async () => {
    const player = createPlayer();
    const action = await new SelectHelpfulAction().selectAction(player, []);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });

  test("selectAction() returns helpful action if available", async () => {
    const player = createPlayer();
    const actions = [
      new MoveAction("north"),
      new HealAction(),
      new MoveAction("south"),
    ];
    const action = await new SelectHelpfulAction().selectAction(
      player,
      actions,
    );
    expect(action.tags).toContain(ActionTag.Helpful);
  });

  test("selectAction() returns random action if no helpful actions", async () => {
    const player = createPlayer();
    const actions = [new MoveAction("north"), new MoveAction("south")];
    const action = await new SelectHelpfulAction().selectAction(
      player,
      actions,
    );
    expect(action).toBeInstanceOf(MoveAction);
  });
});
