import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ProductTokensBySymbol } from '../../constants/tokens';
import { MaxPanelWidth, MaxWidgetWidth } from '../../constants/widget';
import { useIcEthYields } from '../../hooks/useIcEthYields';

import TokenYieldChart from './TokenYieldChart';
import { mapYieldsToChartData } from './TokenYieldUtils';

const TokenAreaYieldsIceth = ({
  tokenSymbol,
}: {
  tokenSymbol: keyof typeof ProductTokensBySymbol;
}) => {
  const token = ProductTokensBySymbol[tokenSymbol];
  const { yields } = useIcEthYields();

  const chartDatas = mapYieldsToChartData(yields);

  return (
    <Box w='100%' maxWidth={MaxWidgetWidth}>
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
          margin='5px 10px'
        />
        <Text fontWeight='500' fontSize='sm' margin='0'>
          {token.name}
        </Text>
      </Flex>
      <TokenYieldChart chartDatas={chartDatas} />
    </Box>
  );
};

export default TokenAreaYieldsIceth;
