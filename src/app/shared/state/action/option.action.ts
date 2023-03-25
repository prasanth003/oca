import { Action } from "@ngrx/store";
import { iOptions } from "../../interface/state.interface";

export enum OptionActionType {
    UpdateOptions = '[Option] Update Options'
}

export class Options implements Action {
    readonly type = OptionActionType.UpdateOptions; 

    constructor(public option: iOptions) {}
}

export type OptionAction = Options;