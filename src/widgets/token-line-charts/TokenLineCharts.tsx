import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ProductTokensBySymbol } from '../../constants/tokens';
import {
  fetchMarketData,
  TokenMarketDataValues,
} from '../../providers/MarketData';

import TokenPrice from './token-price/TokenPrice';

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
    <Box w='100%' maxWidth={1150} padding={['inherit', '45px']}>
      <Flex alignItems='center' paddingBottom={['5px', '10px']}>
        <Image
          borderRadius='full'
          boxSize='30px'
          src={token.image}
          alt={token.name}
          marginRight='10px'
        />
        <Text fontWeight='500'>{token.name}</Text>
      </Flex>
      <TokenPrice
        marketData={marketData}
        options={{ lineColor: token.color }}
      />
    </Box>
  );
};

export default TokenLineCharts;
