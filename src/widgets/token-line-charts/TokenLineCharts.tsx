import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ProductTokensBySymbol } from '../../constants/tokens';
import { MaxWidgetWidth } from '../../constants/widget';
import {
  fetchMarketData,
  TokenMarketDataValues,
} from '../../providers/MarketData';

import TokenPrice from './token-price/TokenPrice';

export const MaxPanelWidth = 1100;

const TokenLineCharts = ({
  tokenSymbol,
}: {
  tokenSymbol: keyof typeof ProductTokensBySymbol;
}) => {
  const [marketData, setMarketData] = useState<TokenMarketDataValues>({});
  const token = ProductTokensBySymbol[tokenSymbol];

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMarketData(token.coingeckoId);
      setMarketData(data);
    };
    fetchData();
  }, []);

  return (
    <Box w='100%' maxWidth={MaxWidgetWidth} padding={['5px', '10px', '45px']}>
      <Flex
        w='100%'
        maxWidth={MaxPanelWidth}
        paddingBottom={['5px', '10px']}
        margin='auto'
      >
        <Image
          borderRadius='full'
          boxSize='20px'
          src={token.image}
          alt={token.name}
          marginRight='10px'
        />
        <Text fontWeight='500' fontSize='sm' margin='0'>
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
