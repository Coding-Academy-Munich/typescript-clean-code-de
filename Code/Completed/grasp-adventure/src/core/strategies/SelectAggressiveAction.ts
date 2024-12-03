import { Action, ActionTag } from "../Action";
import { SelectActionWithProperty } from "./SelectActionWithProperty";

export class SelectAggressiveAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Aggressive);
  }
}
