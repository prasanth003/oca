export function getMarketTime(): Date[] {
    const startTime: Date = new Date();
    startTime.setHours(9, 15);

    const toTime: Date = new Date();
    toTime.setHours(15, 30);

    return [startTime, toTime];
} 