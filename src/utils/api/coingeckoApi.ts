import { TokenMarketDataValues } from '../../providers/MarketData';
import { IndexApi } from '../../utils/api/indexApi';

const baseURL = '/coingecko';
const indexApi = new IndexApi();

/**
 * Get token historic market data
 * https://www.coingecko.com/en/api/documentation
 * @param id Token['coingeckoId']
 * @param baseCurrency
 * @returns
 */
export const fetchHistoricalTokenMarketData = async (
  id: string,
  baseCurrency = 'usd'
): Promise<TokenMarketDataValues> => {
  // const coingeckoMaxTokenDataUrl =
  //   baseURL +
  //   `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=max&interval=daily`;
  const coingeckoHourlyTokenDataUrl =
    baseURL + `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=90`;
  return Promise.all([
    indexApi.get(coingeckoHourlyTokenDataUrl),
    // indexApi.get(coingeckoMaxTokenDataUrl),
  ])
    .then((data) => {
      const hourlyPrices = data[0].prices;
      // marketcaps = data[1].market_caps,
      // volumes = data[1].total_volumes;

      return { hourlyPrices };
    })
    .catch((error) => {
      console.error('Error fetching historical token market data', error);
      return { hourly: [], marketcaps: [], volumes: [] };
    });
};
