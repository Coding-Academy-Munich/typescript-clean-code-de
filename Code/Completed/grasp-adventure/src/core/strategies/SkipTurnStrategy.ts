import { Strategy } from "../Strategy";
import { Player } from "../Player";
import { Action } from "../Action";
import { SkipTurnAction } from "../actions/SkipTurnAction";

export class SkipTurnStrategy implements Strategy {
  get isInteractive(): boolean {
    return false;
  }

  selectAction(_player: Player, _actions: Action[]): Promise<Action> {
    return Promise.resolve(new SkipTurnAction());
  }
}
