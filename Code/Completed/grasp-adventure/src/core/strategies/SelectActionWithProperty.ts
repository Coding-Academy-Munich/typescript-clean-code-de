import { Action } from "../Action";
import { SkipTurnAction } from "../actions/SkipTurnAction";
import { Player } from "../Player";
import { Strategy } from "../Strategy";
import { getRandomElement } from "../utils";

export abstract class SelectActionWithProperty implements Strategy {
  constructor() {
    this.actionPredicate = this.actionPredicate.bind(this);
  }

  get isInteractive(): boolean {
    return false;
  }

  selectAction(_player: Player, actions: Action[]): Promise<Action> {
    if (actions.length === 0) {
      return Promise.resolve(new SkipTurnAction());
    }
    let aggressiveActions = actions.filter(this.actionPredicate);

    return Promise.resolve(
      getRandomElement(aggressiveActions?.length ? aggressiveActions : actions),
    );
  }

  abstract actionPredicate(a: Action): boolean;
}
