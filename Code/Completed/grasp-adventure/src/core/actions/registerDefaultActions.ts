import { ActionType, registerDefaultAction } from "../Action";
import { ErrorAction } from "./ErrorAction";
import { InvestigateAction } from "./InvestigateAction";
import { QuitAction } from "./QuitAction";
import { SkipTurnAction } from "./SkipTurnAction";

const allDefaultActionTypes: ActionType[] = [
  InvestigateAction,
  QuitAction,
  SkipTurnAction,
  ErrorAction,
];

let defaultActionsRegistered: boolean = false;

export function registerAllDefaultActions() {
  if (defaultActionsRegistered) {
    return;
  }

  for (const actionType of allDefaultActionTypes) {
    registerDefaultAction(new actionType());
  }
  defaultActionsRegistered = true;
}
