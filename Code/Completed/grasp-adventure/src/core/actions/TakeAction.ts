import { Action, ActionTag } from "../Action";
import { Item } from "../Item";
import { Player } from "../Player";

export class TakeAction implements Action {
  constructor(public item: Item) {}

  get description(): string {
    return `Take the ${this.item.name}.`;
  }

  get shortDescription(): string {
    return `Take ${this.item.name}`;
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Interaction]);
  }

  async perform(player: Player): Promise<void> {
    player.location.removeItem(this.item);
    player.notify(`You take the ${this.item.name}.`);
  }
}
