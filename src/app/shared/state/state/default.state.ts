import { Defaults } from "../../configuration/defaults.config";
import { iState } from "../../interface/state.interface";

const currentDate: Date = new Date();
const fromTime: Date = new Date(currentDate.setHours(9, 15));
const toTime: Date = new Date(currentDate.setHours(15, 30));

const theme: string = localStorage.getItem('theme');

export const DefaultState: iState = {
    theme: {
        name: (theme ? theme: Defaults.Theme) as any
    },
    option: {
        currentDate: new Date(),
        interval: Defaults.Interval as any,
        range: [fromTime, toTime],
        index: Defaults.Index as any
    }
}