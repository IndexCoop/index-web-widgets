import React from 'react';
import { Box } from '@chakra-ui/react';

import {
  TokenMarketDataValues,
  selectLatestMarketData,
} from '../../../providers/MarketData';

import { MaxPanelWidth } from '../TokenLineCharts';
import TokenPriceChart, { MaxChartWidth } from './TokenPriceChart';
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

export interface MarketChartOptions {
  width?: number;
  height?: number;
  hideYAxis?: boolean;
  lineColor?: string;
}

export interface PriceChartData {
  x: number;
  y: number;
}

const TokenPrice = ({
  marketData,
  options,
}: {
  marketData: TokenMarketDataValues;
  options?: MarketChartOptions;
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

  // FIXME
  const chartWidth =
    window.outerWidth < 400 ? window.outerWidth : MaxChartWidth;
  const chartHeight = window.outerWidth < 400 ? 300 : 400;

  return (
    <Box
      w='100%'
      maxWidth={MaxPanelWidth}
      padding={['5px', '10px']}
      margin={'auto'}
      boxShadow='lg'
    >
      <TokenPriceChart
        marketData={priceChartData}
        currentPrice={price}
        priceChanges={priceChangesFormatted}
        options={{
          width: chartWidth,
          height: chartHeight,
          hideYAxis: true,
          ...options,
        }}
      />
    </Box>
  );
};

export default TokenPrice;
