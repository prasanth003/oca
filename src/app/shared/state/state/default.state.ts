import { Defaults } from "../../configuration/defaults.config";
import { iState } from "../../interface/state.interface";

export const DefaultState: iState = {
    theme: {
        name: Defaults.Theme
    },
    option: {
        currentDate: new Date(),
        interval: Defaults.Interval as any,
        range: [new Date(), new Date()]
    }
}