import { Action } from "./Action";
import { Player } from "./Player";

export interface Strategy {
  selectAction(player: Player, actions: Action[]): Promise<Action>;
  get isInteractive(): boolean;
}
