import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environment/environment";
import { iState } from "../../interface/state.interface";
import { optionReducer } from "./options.reducer";
import { themeReducer } from "./theme.reducer";

export const reducers: ActionReducerMap<iState> = {
    theme: themeReducer,
    option: optionReducer
};
