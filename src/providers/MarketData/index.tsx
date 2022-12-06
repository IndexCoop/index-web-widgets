import { Token } from '../../constants/tokens';
import { fetchHistoricalTokenMarketData } from '../../utils/api/coingeckoApi';

export interface TokenMarketDataValues {
  hourlyPrices?: number[][];
  marketcaps?: number[][];
  volumes?: number[][];
}

export const fetchMarketData = (
  tokenCoingeckoId: Token['coingeckoId']
): Promise<TokenMarketDataValues> =>
  fetchHistoricalTokenMarketData(tokenCoingeckoId);

export const selectLatestMarketData = (marketData?: number[][]) =>
  marketData?.[marketData.length - 1]?.[1] || 0;
