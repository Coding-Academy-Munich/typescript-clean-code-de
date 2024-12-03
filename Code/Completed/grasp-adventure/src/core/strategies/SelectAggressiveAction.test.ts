import { describe, expect, test } from 'vitest';
import { SkipTurnAction } from "../actions/SkipTurnAction";
import { createPlayer } from "../../data/testObjects";
import { SelectAggressiveAction } from "./SelectAggressiveAction";
import { MoveAction } from "../actions/MoveAction";
import { InvestigateAction } from "../actions/InvestigateAction";
import { ActionTag } from "../Action";

describe("SelectAggressiveAction", () => {
  test("is not interactive", () => {
    expect(new SelectAggressiveAction().isInteractive).toBe(false);
  });

  test("selectAction() returns SkipTurnAction if no actions", async () => {
    const player = createPlayer();
    const action = await new SelectAggressiveAction().selectAction(player, []);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });

  test("selectAction() returns aggressive action if available", async () => {
    const player = createPlayer();
    const actions = [
      new MoveAction("north"),
      new InvestigateAction(),
      new MoveAction("south"),
    ];
    const action = await new SelectAggressiveAction().selectAction(
      player,
      actions,
    );
    expect(action.tags).toContain(ActionTag.Aggressive);
  });

  test("selectAction() returns random action if no aggressive actions", async () => {
    const player = createPlayer();
    const actions = [new MoveAction("north"), new MoveAction("south")];
    const action = await new SelectAggressiveAction().selectAction(
      player,
      actions,
    );
    expect(action).toBeInstanceOf(MoveAction);
  });
});
