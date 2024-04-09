import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ProductTokensBySymbol } from '../../constants/tokens';
import { MaxPanelWidth, MaxWidgetWidth } from '../../constants/widget';
import { TokenMarketDataValues } from '../../providers/MarketData';

import TokenPrice from './token-price/TokenPrice';
import { IndexApi } from '../../utils/api/indexApi';
import { NavRow } from './types';

const TokenLineCharts = ({
  tokenSymbol,
}: {
  tokenSymbol: keyof typeof ProductTokensBySymbol;
}) => {
  const [marketData, setMarketData] = useState<TokenMarketDataValues>({});
  const token = ProductTokensBySymbol[tokenSymbol];

  useEffect(() => {
    const fetchData = async () => {
      const indexApi = new IndexApi();
      const nav: NavRow[] = await indexApi.get(
        `/historical-navs/${tokenSymbol.toLowerCase()}`
      );
      const data: number[][] = nav.map(({ time, nav }) => [time, nav]);
      setMarketData({ hourlyPrices: data.sort((a, b) => a[0] - b[0]) });
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
