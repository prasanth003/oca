import { iTheme } from "../../interface/state.interface";
import { ThemeAction, ThemeActionTypes } from "../action/theme.action";
import { DefaultState } from "../state/default.state";

export function themeReducer(state = DefaultState.theme, action: ThemeAction): iTheme {
    switch(action.type) {
        case ThemeActionTypes.UpdateTheme:
            return { ...state, name: action.theme as any };
        default:
            return state;
    }
}