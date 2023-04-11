import React from 'react';
import { Box } from '@chakra-ui/react';

import { MaxPanelWidth } from '../../../constants/widget';
import {
  TokenMarketDataValues,
  selectLatestMarketData,
} from '../../../providers/MarketData';
import { ChartOption } from '../../../utils/chart';

import TokenPriceChart from './TokenPriceChart';
import {
  getFormattedChartPriceChanges,
  getChartDataForDurations,
  getPricesChanges,
} from './TokenPriceUtils';

const TokenPrice = ({
  marketData,
  options,
}: {
  marketData: TokenMarketDataValues;
  options?: ChartOption;
}) => {
  const priceChartData = getChartDataForDurations([marketData]);

  const price = selectLatestMarketData(marketData.hourlyPrices).toLocaleString(
    'en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  const priceChanges = getPricesChanges(marketData.hourlyPrices ?? []);
  const priceChangesFormatted = getFormattedChartPriceChanges(priceChanges);

  return (
    <TokenPriceChart
      marketData={priceChartData}
      currentPrice={price}
      priceChanges={priceChangesFormatted}
      options={options}
    />
  );
};

export default TokenPrice;
