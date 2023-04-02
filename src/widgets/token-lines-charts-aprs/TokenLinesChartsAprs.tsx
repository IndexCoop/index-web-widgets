import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ProductTokensBySymbol } from '../../constants/tokens';
import { MaxPanelWidth, MaxWidgetWidth } from '../../constants/widget';
import { useGtcDsEthAprs } from '../../hooks/useGtcDsEthAprs';

import TokenAprsChart from './TokenAprsChart';
import {
  currentApr,
  dataChangeForDurations,
  formatDataChangeForDurations,
  parseChartDataForDurations,
  mapAprsToChartData,
} from './TokenAprsUtils';

const TokenLinesChartsAprs = ({
  tokenSymbol,
}: {
  tokenSymbol: keyof typeof ProductTokensBySymbol;
}) => {
  const token = ProductTokensBySymbol[tokenSymbol];
  const { aprs } = useGtcDsEthAprs(token);

  if (aprs.length === 0) {
    return <></>;
  }

  const chartDatas = mapAprsToChartData(aprs);

  const chartDatasForDurations = parseChartDataForDurations(chartDatas);

  const initialApr = currentApr(chartDatas);

  const dataChanges = dataChangeForDurations(chartDatas);
  const aprChanges = formatDataChangeForDurations(dataChanges);

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
        <Text fontWeight='300' fontSize='xs' margin='0 0.25rem'>
          (APR 7 Day Moving Average)
        </Text>
      </Flex>
      <TokenAprsChart
        chartDatas={chartDatasForDurations}
        initialApr={initialApr}
        aprChanges={aprChanges}
        token={token}
      />
    </Box>
  );
};

export default TokenLinesChartsAprs;
