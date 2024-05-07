export interface iSummary {
    indexName: string;
    close: number;
    timestamp: string;
    createdAt: string;
    atmStrikePrice: number;
    callOptions: iOptionSummary[];
    putOptions: iOptionSummary[];
}

export interface iStrikePrice {
    price: number;
    callOption: iOptionSummary;
    putOption: iOptionSummary;
}

export interface iSummaryByStrikePrice {
    indexName: string;
    close: number;
    createdAt: string;
    atmStrikePrice: number;
    strikePrice: iStrikePrice[];
}

export interface iOptionSummary {
    strikePrice: number;
    lastPrice: number;
    intrinsicValue: number;
    extrinsicValue: number;
    tradedQty: iQuantity;
    iv: iQuantity;
}

export interface iQuantity {
    min: number;
    current: number;
    max: number;
    percentageChange: number;
}