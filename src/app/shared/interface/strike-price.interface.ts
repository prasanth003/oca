export interface iStrikePriceSentimentResponse {
    advance: string;
    decline: string;
    unchanged: string;
    sentiment: iQuantityBreakup;
    strikePriceInfoResponses: iStrikePrice[];
    marketSentiments: iSentiment[];
}

export interface iSentiment {
    createdAt: string;
    current: number;
    timestamp: number;
}

export interface iStrikePrice {
    strikePrice: number;
    isCurrentPrice: boolean;
    createdAt: string;
    openInterest: iQuantityBreakup;
    buy: iQuantityBreakup;
    sell: iQuantityBreakup;
    sentiment: iQuantityBreakup;
    callBuy: number;
    callIV: number;
    callSell: number;
    putBuy: number;
    putIV: number;
    putSell: number;
    callOI: number;
    putOI: number;
}

export interface iQuantityBreakup {
    max: number
    min: number
    current: number
}

export interface iADRatio {
    advance: number;
    decline: number;
    unchanged: number;
}