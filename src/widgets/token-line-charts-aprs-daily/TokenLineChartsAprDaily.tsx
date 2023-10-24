import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ProductTokensBySymbol } from '../../constants/tokens';
import { MaxPanelWidth, MaxWidgetWidth } from '../../constants/widget';
import { useIcSmmtAprs } from '../../hooks/useIcSmmtAprs';

import TokenAprChart from './TokenAprChart';
import {
  currentApr,
  dataChangeForDurations,
  formatDataChangeForDurations,
  mapAprToChartData,
  parseChartDataForDurations,
} from './TokenAprUtils';

/**
 * APR over time, line chart
 * Supported Indices: icSMMT
 */
const TokenLineChartsAprsDaily = ({
  tokenSymbol,
}: {
  tokenSymbol: keyof typeof ProductTokensBySymbol;
}) => {
  const token = ProductTokensBySymbol[tokenSymbol];
  const { aprs } = useIcSmmtAprs();

  if (aprs.length === 0) {
    return <></>;
  }

  const chartDatas = mapAprToChartData(aprs);

  const chartDatasForDurations = parseChartDataForDurations(chartDatas);

  const initialApr = currentApr(chartDatas);

  const dataChanges = dataChangeForDurations(chartDatas);
  const aprChanges = formatDataChangeForDurations(dataChanges);

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
        <Text
          fontWeight='300'
          fontSize='xs'
          margin='auto 0.25rem'
          display={['none', 'block']}
        >
          (Weighted APR)
        </Text>
      </Flex>
      <TokenAprChart
        chartDatas={chartDatasForDurations}
        initialApr={initialApr}
        aprChanges={aprChanges}
        token={token}
      />
    </Box>
  );
};

export default TokenLineChartsAprsDaily;
