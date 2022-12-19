import React from 'react';
import { Box } from '@chakra-ui/react';

import {
  TokenMarketDataValues,
  selectLatestMarketData,
} from '../../../providers/MarketData';

import TokenPriceChart, { MarketChartOptions } from './TokenPriceChart';
import {
  getFormattedChartPriceChanges,
  getPriceChartData,
  getPricesChanges,
} from './TokenPriceUtils';

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
  const priceFormatted = `$${price}`;

  const priceChanges = getPricesChanges(marketData.hourlyPrices ?? []);
  const priceChangesFormatted = getFormattedChartPriceChanges(priceChanges);

  const chartWidth = window.outerWidth < 400 ? window.outerWidth : 648;
  const chartHeight = window.outerWidth < 400 ? 300 : 400;

  return (
    <Box
      w='100%'
      maxWidth={900}
      padding={['5px', '10px']}
      margin={'auto'}
      boxShadow='lg'
    >
      <TokenPriceChart
        marketData={priceChartData}
        prices={[priceFormatted]}
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
