import { Action } from "@ngrx/store";

export enum ThemeActionTypes {
    UpdateTheme = '[Theme] Update Theme'
}

export class Theme implements Action {
    readonly type = ThemeActionTypes.UpdateTheme; 

    constructor(public theme: string) {}
}

export type ThemeAction = Theme;