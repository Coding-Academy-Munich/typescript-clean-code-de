import { Action, ActionTag } from "../Action";
import { SelectActionWithProperty } from "./SelectActionWithProperty";

export class SelectHelpfulAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Helpful);
  }
}
