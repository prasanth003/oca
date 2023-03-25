import { iOptions } from "../../interface/state.interface";
import { OptionAction, OptionActionType } from "../action/option.action";
import { DefaultState } from "../state/default.state";

export function optionReducer(state = DefaultState.option, action: OptionAction): iOptions {
    switch(action.type) {
        case OptionActionType.UpdateOptions:
            return { 
                ...state, 
                currentDate: action.option.currentDate,
                interval: action.option.interval,
                range: action.option.range
            };
        default:
            return state;
    }
}