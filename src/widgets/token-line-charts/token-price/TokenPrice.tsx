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
  getPriceChartData,
  getPricesChanges,
} from './TokenPriceUtils';

export enum Durations {
  DAILY = 0,
  WEEKLY = 1,
  MONTHLY = 2,
  QUARTERLY = 3,
}

export enum PriceChartRangeOption {
  DAILY_PRICE_RANGE = 1,
  WEEKLY_PRICE_RANGE = 7,
  MONTHLY_PRICE_RANGE = 30,
  QUARTERLY_PRICE_RANGE = 90,
}

const TokenPrice = ({
  marketData,
  options,
}: {
  marketData: TokenMarketDataValues;
  options?: ChartOption;
}) => {
  const priceChartData = getPriceChartData([marketData]);

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
    <Box
      w='100%'
      maxWidth={MaxPanelWidth}
      padding={['5px', '10px']}
      margin='auto'
      boxShadow='lg'
    >
      <TokenPriceChart
        marketData={priceChartData}
        currentPrice={price}
        priceChanges={priceChangesFormatted}
        options={options}
      />
    </Box>
  );
};

export default TokenPrice;
