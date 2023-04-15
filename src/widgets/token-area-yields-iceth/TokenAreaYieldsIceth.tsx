import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ProductTokensBySymbol } from '../../constants/tokens';
import { MaxPanelWidth, MaxWidgetWidth } from '../../constants/widget';
import { useIcEthYields } from '../../hooks/useIcEthYields';

import TokenYieldChart from './TokenYieldChart';
import {
  currentNetYield,
  dataChangeForDurations,
  formatDataChangeForDurations,
  parseChartDataForDurations,
  mapYieldsToChartData,
} from './TokenYieldUtils';

const TokenAreaYieldsIceth = ({
  tokenSymbol,
}: {
  tokenSymbol: keyof typeof ProductTokensBySymbol;
}) => {
  const token = ProductTokensBySymbol[tokenSymbol];
  const { yields } = useIcEthYields();

  if (yields.length === 0) {
    return <></>;
  }

  const chartDatas = mapYieldsToChartData(yields);

  const chartDatasForDurations = parseChartDataForDurations(chartDatas);

  const initialNetYield = currentNetYield(chartDatas);

  const dataChanges = dataChangeForDurations(chartDatas);
  const netYieldChanges = formatDataChangeForDurations(dataChanges);

  return (
    <Box w='100%' maxWidth={MaxWidgetWidth} paddingTop={['10px', '20px']}>
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
      <TokenYieldChart
        chartDatas={chartDatasForDurations}
        initialNetYield={initialNetYield}
        netYieldChanges={netYieldChanges}
      />
    </Box>
  );
};

export default TokenAreaYieldsIceth;
