export interface iStrikePriceBuySellResponse {
    strikePrice: number;
    isCurrentPrice: boolean;
    buy: iStrikeQuantity;
    sell: iStrikeQuantity;
    openInterest: iStrikeQuantity;
  }

  export interface iStrikeQuantity {
    current: iPEQuantity;
    max: iPEQuantity;
    min: iPEQuantity;
    recentMax: iPEQuantity;
    recentMin: iPEQuantity;
  }
  
  export interface iPEQuantity {
    call: {
      timestamp: string;
      closePrice: number;
      value: number;
      iv: number;
      ltp: number;
      max: {
        qty: number;
        timestamp: string;
          }
      };
    put: {
      timestamp: string;
      closePrice: number;
      value: number;
      iv: number;
      ltp: number;
      max: {
        qty: number;
        timestamp: string;
      }
      };
  }
