export interface iState {
    theme: iTheme;
    option: iOptions;
}

export interface iOptions {
    currentDate: Date;
    interval: number;
    range: Date[];
    index: string;
    depth: number;
}

export interface iTheme {
    name: 'light' | 'dark';
}