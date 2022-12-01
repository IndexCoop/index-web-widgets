import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { BedIndex, DefiPulseIndex, MetaverseIndex, Token } from "../../constants/tokens";
import { fetchHistoricalTokenMarketData } from "../../utils/api/coingeckoApi";

export interface TokenMarketDataValues {
  prices?: number[][];
  hourlyPrices?: number[][];
  marketcaps?: number[][];
  volumes?: number[][];
}

export interface TokenContext {
  dpi?: TokenMarketDataValues;
  mvi?: TokenMarketDataValues;
  bed?: TokenMarketDataValues;
  selectLatestMarketData: (...args: any) => number;
  selectMarketDataByToken: (token: Token) => number[][];
}

export type TokenContextKeys = keyof TokenContext;

export const MarketDataContext = createContext<TokenContext>({
  selectLatestMarketData: () => 0,
  selectMarketDataByToken: () => [[]],
});

export const useMarketData = () => useContext(MarketDataContext);

export const MarketDataProvider = (props: { children: any }) => {
  const [dpiMarketData, setDpiMarketData] = useState<any>({});
  const [mviMarketData, setMviMarketData] = useState<any>({});
  const [bedMarketData, setBedMarketData] = useState<any>({});

  const selectLatestMarketData = (marketData?: number[][]) => marketData?.[marketData.length - 1]?.[1] || 0;

  const selectMarketDataByToken = (token: Token) => {
    switch (token) {
      case DefiPulseIndex:
        return dpiMarketData;
      case MetaverseIndex:
        return mviMarketData;
      case BedIndex:
        return bedMarketData;
      default:
        return 0;
    }
  };

  const fetchMarketData = useCallback(async () => {
    const marketData = await Promise.all([
      fetchHistoricalTokenMarketData(DefiPulseIndex.coingeckoId),
      fetchHistoricalTokenMarketData(MetaverseIndex.coingeckoId),
      fetchHistoricalTokenMarketData(BedIndex.coingeckoId),
    ]);

    setDpiMarketData(marketData[0]);
    setMviMarketData(marketData[1]);
    setBedMarketData(marketData[2]);
  }, []);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  return (
    <MarketDataContext.Provider
      value={{
        selectLatestMarketData,
        selectMarketDataByToken,
        dpi: dpiMarketData,
        mvi: mviMarketData,
        bed: bedMarketData,
      }}
    >
      {props.children}
    </MarketDataContext.Provider>
  );
};
