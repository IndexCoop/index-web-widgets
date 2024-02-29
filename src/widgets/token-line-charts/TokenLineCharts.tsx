import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ProductTokensBySymbol } from '../../constants/tokens';
import { MaxPanelWidth, MaxWidgetWidth } from '../../constants/widget';
import {
  fetchMarketData,
  TokenMarketDataValues,
} from '../../providers/MarketData';

import TokenPrice from './token-price/TokenPrice';
import { IndexApi } from '../../utils/api/indexApi';
import { CdetiNavRow, Index2xNavRow } from './types';

const TokenLineCharts = ({
  tokenSymbol,
}: {
  tokenSymbol: keyof typeof ProductTokensBySymbol;
}) => {
  const [marketData, setMarketData] = useState<TokenMarketDataValues>({});
  const token = ProductTokensBySymbol[tokenSymbol];

  useEffect(() => {
    const fetchData = async () => {
      if (tokenSymbol === 'CDETI') {
        const indexApi = new IndexApi();
        const nav: CdetiNavRow[] = await indexApi.get('/cdeti/navs');
        const data: number[][] = nav.map((navItem) => [
          new Date(navItem.hour).getTime(),
          navItem.NAV,
        ]);
        setMarketData({ hourlyPrices: data.sort((a, b) => a[0] - b[0]) });
      } else if (tokenSymbol === 'BTC2X' || tokenSymbol === 'ETH2X') {
        const indexApi = new IndexApi();
        const nav: Index2xNavRow[] = await indexApi.get('/2x/navs');
        const data: number[][] = nav.map((navItem) => [
          new Date(navItem.hour).getTime(),
          tokenSymbol === 'BTC2X' ? navItem.btc2x_price : navItem.eth2x_price,
        ]);
        setMarketData({ hourlyPrices: data.sort((a, b) => a[0] - b[0]) });
      } else {
        const data = await fetchMarketData(token.coingeckoId);
        setMarketData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <Box w='100%' maxWidth={MaxWidgetWidth}>
      <Flex w='100%' maxWidth={MaxPanelWidth} paddingBottom={['5px', '10px']}>
        <Image
          borderRadius='full'
          boxSize='20px'
          src={token.image}
          alt={token.name}
          margin={['5px 5px 5px 0px', '5px 10px']}
        />
        <Text fontWeight='500' fontSize='sm' margin='auto 0'>
          {token.name}
        </Text>
      </Flex>
      <TokenPrice
        marketData={marketData}
        options={{ lineColor: token.color }}
      />
    </Box>
  );
};

export default TokenLineCharts;
